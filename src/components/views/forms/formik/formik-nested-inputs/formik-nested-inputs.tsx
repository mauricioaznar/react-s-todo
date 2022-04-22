import React from "react";
import { Button } from "@mui/material";
import * as yup from "yup";
import {Form, Formik, useFormikContext} from "formik";
import NestedEmailInput from "./inputs/nested-email-input";
import IFormikNestedInputs from "./i-formik-nested-inputs";
import { SchemaOf } from "yup";
import NestedNameInput from "./inputs/nested-name-input";

export default function FormikNestedInputs() {
  const initialValues: IFormikNestedInputs = {
    name: "",
    email: "",
  };

  const validationSchema: SchemaOf<IFormikNestedInputs> = yup.object({
    name: yup.string(),
    email: yup.string().required("Email is required").email(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <NestedNameInput />
        <NestedEmailInput />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Form>
    </Formik>
  );
}
