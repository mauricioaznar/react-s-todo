import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  Query,
  useUploadCatPhotosMutation,
} from "../../../../../services/schema";
import ApolloSnackbar from "../../../../smart/apollo-snackbar/apollo-snackbar";
import { ApolloError } from "@apollo/client";
import { Form, Formik } from "formik";
import FormikFile from "../../../../dum/inputs/formik/formik-file";
import * as yup from "yup";
import { nameof } from "../../../../../helpers/nameof";
import { useState } from "react";

interface CatPhotosDialogProps {
  handleClose: () => void;
  open: boolean;
  id: string;
}

// interface CatPhotosForm {
//   files: File[] | null | undefined;
// }

export default function CatPhotosDialog(props: CatPhotosDialogProps) {
  const { handleClose, open, id } = props;
  const [message, setMessage] = useState("");

  const [uploadCatPhotos, { error }] = useUploadCatPhotosMutation({
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: nameof<Query>("cats"),
      });
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <Formik
        initialValues={{
          files: null as null | [],
        }}
        validationSchema={yup.object({
          files: yup.mixed().nullable().required("Please provide a file"),
        })}
        onSubmit={async (values) => {
          const { files } = values;

          try {
            if (files && files.length > 0) {
              await uploadCatPhotos({
                variables: {
                  files,
                  id,
                },
              });
            }
            handleClose();
          } catch (e: unknown) {
            if (e instanceof ApolloError) {
              setMessage(e.message);
            }
          }
        }}
      >
        <Form>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent sx={{ minWidth: "30rem" }}>
            <FormikFile name={"files"} label={"Upload files"} multiple={true} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Form>
      </Formik>

      <ApolloSnackbar message={error?.message || message || ""} />
    </Dialog>
  );
}
