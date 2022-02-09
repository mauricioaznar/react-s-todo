import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useUploadCatPhotosMutation } from "../../../../services/schema";
import MauSnackbar from "../../../../components/MauSnackbar";
import { ApolloError } from "@apollo/client";
import { Form, Formik, FormikValues } from "formik";
import FormikFile from "../../../../components/inputs/formik/FormikFile";
import * as yup from "yup";

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

  const [uploadCatPhotos, { error }] = useUploadCatPhotosMutation();

  const validationSchema = yup.object({
    files: yup.mixed().nullable().required("Please provide a file"),
  });

  const submit = async (data: FormikValues) => {
    const { files } = data;

    try {
      if (files && files.length > 0) {
        await uploadCatPhotos({
          variables: {
            files,
            id,
          },
        });
      }
      //
    } catch (e: unknown) {
      if (e instanceof ApolloError) {
        // setMessage(e.message)
      }
    }
  };

  return (
    <Formik
      initialValues={{
        files: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("asdfasdfasdf");
        void submit(values);
      }}
    >
      <Form>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
          <MauSnackbar message={error?.message || ""} />
        </Dialog>
        <FormikFile name={"files"} label={"Upload files"} multiple={true} />
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
}
