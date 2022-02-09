import * as React from "react";
import { useState } from "react";
import { ApolloError, useApolloClient } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";
import {
  GetCatsQuery,
  GetUsersQuery,
  Query,
  useCreateCatMutation,
  useUpdateCatMutation,
} from "../../../services/schema";
import { nameof } from "../../../helpers/nameof";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PetsIcon from "@mui/icons-material/Pets";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { queryDerivativeIsUserOccupied } from "../../../services/schema-derivative";
import FormikTextField from "../../../components/inputs/formik/FormikTextField";
import FormikCheckbox from "../../../components/inputs/formik/FormikCheckbox";
import FormikFile from "../../../components/inputs/formik/FormikFile";
import Button from "@mui/material/Button";
import MauSnackbar from "../../../components/MauSnackbar";

interface UseCatFormLocationProps {
  cat?: GetCatsQuery["cats"][number];
}

export function CatForm() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState("");

  const history = useHistory();
  const location = useLocation<UseCatFormLocationProps>();
  const cat = location.state?.cat;

  const [createCatMutation] = useCreateCatMutation({
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: nameof<Query>("cats"),
      });
    },
  });

  const [updateCatMutation] = useUpdateCatMutation({
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: nameof<Query>("cats"),
      });
    },
  });

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
              Cat form
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Formik
                initialValues={{
                  breed: cat ? cat.breed : "",
                  color: cat ? cat.characteristics.color : "",
                  coat: cat ? cat.characteristics.coat : "",
                  lifespan: cat ? cat.characteristics.lifespan : "",
                  size: cat ? cat.characteristics.size : "",
                }}
                validationSchema={yup.object({
                  breed: yup.string().required("Breed is required"),
                  color: yup.string().required("Color is required"),
                  coat: yup.string().required("Coat is required"),
                  lifespan: yup.string().required("Lifespan is required"),
                  size: yup.string().required("Size is required"),
                })}
                onSubmit={async (data) => {
                  const { breed, color, coat, lifespan, size } = data;

                  setIsDisabled(true);

                  try {
                    const catOptions = {
                      catInput: {
                        breed: breed,
                        characteristics: {
                          color: color,
                          coat: coat,
                          size: size,
                          lifespan: lifespan,
                        },
                      },
                      files: [],
                    };

                    if (cat) {
                      await updateCatMutation({
                        variables: {
                          id: cat._id,
                          ...catOptions,
                          filenames: [],
                        },
                      });
                    } else {
                      await createCatMutation({
                        variables: {
                          ...catOptions,
                        },
                      });
                    }

                    history.push("/cats");
                  } catch (e: unknown) {
                    if (e instanceof ApolloError) {
                      setMessage(e.message);
                    }
                  }

                  setMessage("");
                  setIsDisabled(false);
                }}
              >
                <Form>
                  <FormikTextField name="breed" label="Breed" />
                  <FormikTextField name="coat" label="Coat" />
                  <FormikTextField name="size" label="Size" />
                  <FormikTextField name="lifespan" label="Lifespan" />
                  <FormikTextField name="color" label="Color" />
                  <FormikFile name={"file"} label={"Upload file"} />
                  <Button
                    disabled={isDisabled}
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
          <MauSnackbar message={message} />
        </Container>
      </Grid>
    </Grid>
  );
}
