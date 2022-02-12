import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
import { FormikDefaultProps } from "./common/formik-default-props";

interface FormikTextFieldProps extends FormikDefaultProps {
  type?: "text" | "password";
}

export const FormikTextField = ({
  name,
  label,
  type = "text",
}: FormikTextFieldProps) => {
  const [formikProps, { error, touched }] = useField(name);

  return (
    <TextField
      fullWidth
      type={type}
      margin="normal"
      label={label}
      error={touched && Boolean(error)}
      helperText={touched && error}
      {...formikProps}
    />
  );
};

export default FormikTextField;
