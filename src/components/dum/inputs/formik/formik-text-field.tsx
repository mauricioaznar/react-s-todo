import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import { FormikDefaultProps } from "./common/formik-default-props";

interface FormikTextFieldProps extends FormikDefaultProps {
  type?: "text" | "password";
}

export function FormikTextField({
  name,
  label,
  type = "text",
  ...rest
}: FormikTextFieldProps & TextFieldProps) {
  const [formikInputProps, formikMetaProps, formikHelperProps] = useField(name);

  return (
    <TextField
      {...rest}
      {...formikInputProps}
      fullWidth
      margin={"normal"}
      label={label}
      type={type}
      error={Boolean(formikMetaProps.error && formikMetaProps.touched)}
      helperText={formikMetaProps.touched ? formikMetaProps.error : ""}
      name={formikInputProps.name}
      value={formikInputProps.value}
      onInput={(e) => {
        formikHelperProps.setTouched(true);
        formikInputProps.onChange(e);
      }}
    />
  );
}

export default FormikTextField;
