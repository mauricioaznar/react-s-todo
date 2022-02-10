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
} from "../../../../services/schema";
import { nameof } from "../../../../helpers/nameof";
import { Badge, Grid, IconButton } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PetsIcon from "@mui/icons-material/Pets";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { queryDerivativeIsUserOccupied } from "../../../../services/schema-derivative";
import FormikTextField from "../../../dum/inputs/formik/FormikTextField";
import FormikCheckbox from "../../../dum/inputs/formik/FormikCheckbox";
import FormikFile from "../../../dum/inputs/formik/FormikFile";
import Button from "@mui/material/Button";
import ApolloSnackbar from "../../../smart/apollo-snackbar/apollo-snackbar";
import CloseIcon from "@mui/icons-material/Close";

interface UseCatFormLocationProps {
  cat?: GetCatsQuery["cats"][number];
}

export function CatForm() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState("");

  const history = useHistory();
  const location = useLocation<UseCatFormLocationProps>();
  const cat = location.state?.cat;

  const [filenames, setFilenames] = useState(cat?.filenames || []);

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

  const removeFilename = (filename: string) => {
    setFilenames(
      filenames.filter((f) => {
        return f !== filename;
      }),
    );
  };

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
                  files: null,
                }}
                validationSchema={yup.object({
                  breed: yup.string().required("Breed is required"),
                  color: yup.string().required("Color is required"),
                  coat: yup.string().required("Coat is required"),
                  lifespan: yup.string().required("Lifespan is required"),
                  files: yup
                    .mixed()
                    .nullable()
                    .required("Pleasse provide a file"),
                  size: yup.string().required("Size is required"),
                })}
                onSubmit={async (data) => {
                  const { breed, color, coat, lifespan, size, files } = data;

                  console.log(files);

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
                      files: files,
                    };

                    if (cat) {
                      await updateCatMutation({
                        variables: {
                          id: cat._id,
                          ...catOptions,
                          filenames: filenames,
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
                  <FormikFile name={"files"} label={"Upload file"} multiple />
                  <Box>
                    {cat
                      ? filenames.map((f) => (
                          <Badge
                            key={f}
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <IconButton
                                sx={{
                                  width: "30px",
                                  height: "30px",
                                }}
                                onClick={() => {
                                  removeFilename(f);
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                            }
                          >
                            <Avatar alt="Travis Howard" src={f} />
                          </Badge>
                        ))
                      : null}
                  </Box>
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
          <ApolloSnackbar message={message} />
        </Container>
      </Grid>
    </Grid>
  );
}
