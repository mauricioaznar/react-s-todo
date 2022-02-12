import * as React from "react";
import { FormikDefaultProps } from "./common/formik-default-props";
import { useField } from "formik";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

interface FormikAutocompleteProps<T> extends FormikDefaultProps {
  items: T[];
  itemText: keyof T;
  itemValue: keyof T;
  returnObject?: boolean;
}

export default function FormikAutocomplete<T>({
  name,
  label,
  items,
  itemValue,
  itemText,
  returnObject = false,
}: FormikAutocompleteProps<T>) {
  const [, formikMeta, fieldHelperProps] = useField(name);
  const [autocompleteValue, setAutocompleteValue] = useState(() => {
    return returnObject
      ? formikMeta.initialValue
      : items.find((i) => {
          return i[itemValue] === formikMeta.initialValue;
        });
  });

  const hasError = Boolean(formikMeta.touched && formikMeta.error);

  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => {
        if (returnObject) {
          return option === value;
        } else {
          return option[itemValue] === value[itemValue];
        }
      }}
      value={autocompleteValue}
      onChange={(event: any, val: any) => {
        const newValue = val ? (returnObject ? val : val[itemValue]) : null;
        fieldHelperProps.setTouched(true, false);
        fieldHelperProps.setValue(newValue, true);
        setAutocompleteValue(val);
      }}
      getOptionLabel={(option) => {
        const text = option[itemText];
        return typeof text === "string" ? text : "";
      }}
      id="controllable-states-demo"
      options={items}
      sx={{ mt: 2, mb: 3 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={hasError}
          helperText={hasError ? formikMeta.error : ""}
        />
      )}
    />
  );
}
