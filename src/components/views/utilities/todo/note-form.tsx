import React, { useState } from "react";
import { Box } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import {
  Query,
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from "../../../../services/schema";
import { nameof } from "../../../../helpers/nameof";
import { NoteNode } from "../../../../types/note";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import PetsIcon from "@mui/icons-material/Pets";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FormikTextField from "../../../dum/inputs/formik/formik-text-field";
import Button from "@mui/material/Button";
import CustomMarkdownEditor from "./components/custom-markdown-editor";

interface NoteFormLocationProps {
  note?: NoteNode;
}

export default function NoteForm() {
  const [isDisabled, setIsDisabled] = useState(false);

  const history = useHistory();

  const location = useLocation<NoteFormLocationProps>();
  const note = location.state?.note;

  const [markdownContent, setMarkdownContent] = React.useState<
    string | undefined
  >(note ? note.markdownContent : "");

  const [createNoteMutation] = useCreateNoteMutation({
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: nameof<Query>("notes"),
      });
    },
  });

  const [updateNoteMutation] = useUpdateNoteMutation({
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: nameof<Query>("notes"),
      });
    },
  });

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PetsIcon />
        </Avatar>
        <Typography variant="h4">Note</Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            initialValues={{
              title: note ? note.title : "",
            }}
            validationSchema={yup.object({
              title: yup.string().required("Title is required"),
            })}
            onSubmit={async (data) => {
              const { title } = data;

              setIsDisabled(true);

              const options = {
                noteInput: {
                  title: title,
                  markdownContent: markdownContent || "",
                },
              };

              try {
                if (note) {
                  await updateNoteMutation({
                    variables: {
                      id: note.id,
                      ...options,
                    },
                  });
                } else {
                  await createNoteMutation({
                    variables: {
                      ...options,
                    },
                  });
                }

                history.push("/notes");
              } catch (e) {
                console.error(e);
              }

              setIsDisabled(false);
            }}
          >
            <Form>
              <FormikTextField name="title" label="Title" />
              <CustomMarkdownEditor
                value={markdownContent}
                setValue={setMarkdownContent}
              />

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
    </Container>
  );
}
