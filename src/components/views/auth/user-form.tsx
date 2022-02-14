import * as React from "react";
import { useState } from "react";
import { Form, Formik } from "formik";
import { useApolloClient } from "@apollo/client";
import * as yup from "yup";

// mui
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PetsIcon from "@mui/icons-material/Pets";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// local
import {
  GetUsersQuery,
  Query,
  useSignInMutation,
  useUpdateUserMutation,
  useUploadFileMutation,
} from "../../../services/schema";
import { useHistory, useLocation } from "react-router-dom";
import { nameof } from "../../../helpers/nameof";
import { useTypedSelector } from "../../../hooks/redux-hooks/use-typed-selector";
import FormikTextField from "../../dum/inputs/formik/formik-text-field";
import FormikFile from "../../dum/inputs/formik/formik-file";
import FormikCheckbox from "../../dum/inputs/formik/formik-checkbox";
import { queryDerivativeIsUserOccupied } from "../../../services/schema-derivative";

interface UseFormLocationProps {
  user?: GetUsersQuery["users"][number];
}

export default function UserForm() {
  const { currentUser } = useTypedSelector((state) => state.auth);

  const [isDisabled, setIsDisabled] = useState(false);

  const client = useApolloClient();

  const history = useHistory();
  const location = useLocation<UseFormLocationProps>();
  const user = location.state?.user;

  const isUserCurrent = currentUser?._id === user?._id;
  const isAdmin = currentUser?.admin;
  const canAlter = isAdmin || isUserCurrent;

  const [signinMutation] = useSignInMutation({
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: nameof<Query>("users"),
      });
    },
  });

  const [updateUserMutation] = useUpdateUserMutation({
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: nameof<Query>("users"),
      });
    },
  });

  const [uploadFileMutation] = useUploadFileMutation();

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PetsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User form
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Formik
                initialValues={{
                  username: user ? user.username : "",
                  password: "changeme",
                  admin: user ? user.admin : false,
                  file: null,
                }}
                validationSchema={yup.object({
                  username: yup
                    .string()
                    .required("NestedEmailInput is required")
                    .test(
                      "unique",
                      "email must be unique",
                      async function (value) {
                        if (
                          currentUser?._id !== user?._id &&
                          !currentUser?.admin
                        ) {
                          const result = await queryDerivativeIsUserOccupied(
                            client,
                            {
                              username: value || "",
                            },
                          );
                          return !result.data.isUserOccupied;
                        } else {
                          return true;
                        }
                      },
                    ),
                  password: yup
                    .string()
                    .min(8, "Password should be of minimum 8 characters length")
                    .required("Password is required"),
                  file: yup
                    .string()
                    .nullable()
                    .test("file required", "Please provide a file", (val) => {
                      return !user || !user.avatar ? !!val : true;
                    }),
                })}
                onSubmit={async (data) => {
                  const { username, password, admin, file } = data;

                  setIsDisabled(true);

                  const options = {
                    userInput: {
                      username: username,
                      password: password,
                      admin: isAdmin ? admin : false,
                    },
                  };

                  try {
                    let userId: string | undefined;

                    if (user) {
                      const { data } = await updateUserMutation({
                        variables: {
                          id: user._id,
                          ...options,
                        },
                      });
                      userId = data?.updateUser._id;
                    } else {
                      const { data } = await signinMutation({
                        variables: {
                          ...options,
                        },
                      });
                      userId = data?.createUser._id;
                    }

                    if (file && userId) {
                      await uploadFileMutation({
                        variables: {
                          file: file,
                          userId,
                        },
                      });
                    }

                    history.push("/users");
                  } catch (e: unknown) {
                    console.error(e);
                  }

                  setIsDisabled(false);
                }}
              >
                <Form>
                  <FormikTextField name="username" label="Username" />
                  <FormikTextField
                    label="Password"
                    name="password"
                    type={"password"}
                  />
                  {isAdmin ? (
                    <FormikCheckbox name={"admin"} label={"Admin"} />
                  ) : null}
                  <FormikFile name={"file"} label={"Upload file"} />
                  <Button
                    disabled={isDisabled || !canAlter}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Form>
              </Formik>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
