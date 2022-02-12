import React from "react";
import { Button } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import NestedEmailInput from "./inputs/NestedEmailInput";
import IFormikNestedInputs from "./i-formik-nested-inputs";
import { SchemaOf } from "yup";
import NestedNameInput from "./inputs/NestedNameInput";

export default function FormikNestedInputs() {
  const initialValues: IFormikNestedInputs = {
    email: "",
    name: "",
  };

  const validationSchema: SchemaOf<IFormikNestedInputs> = yup.object({
    email: yup.string().required("Email is required").email(),
    name: yup.string(),
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
        <NestedEmailInput />
        <NestedNameInput />
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
