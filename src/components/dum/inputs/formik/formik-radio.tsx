import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormikDefaultProps } from "./common/formik-default-props";
import { useField } from "formik";
import { FormHelperText } from "@mui/material";
import { useState } from "react";

interface FormikRadioProps<T> extends FormikDefaultProps {
  items: T[];
  itemValue: keyof T;
  itemText: keyof T;
  returnObject?: boolean;
}

export default function FormikRadio<T>({
  name,
  label,
  items,
  itemValue,
  itemText,
  returnObject = false,
}: FormikRadioProps<T>) {
  const [, formikMeta, fieldHelperProps] = useField(name);
  const [value, setValue] = useState<string>(() => {
    return returnObject
      ? formikMeta.initialValue[itemValue]
      : formikMeta.initialValue;
  });

  const hasError = Boolean(formikMeta.touched && formikMeta.error);

  return (
    <FormControl component="fieldset" sx={{ mt: 2, mb: 3 }}>
      <FormLabel component="legend" error={hasError}>
        {label}
      </FormLabel>
      <RadioGroup
        row
        aria-label="gender"
        name="radio-buttons-group"
        value={value}
        onChange={(e) => {
          fieldHelperProps.setTouched(true, false);
          const newValue = returnObject
            ? items.find((i) => {
                const eValue = e.target.value as unknown as T[keyof T];
                return eValue === i[itemValue];
              })
            : e.target.value;
          fieldHelperProps.setValue(newValue, true);
          setValue(e.target.value);
        }}
      >
        {items.map((item, index) => {
          const itemKey = itemValue ? item[itemValue] : null;
          const key =
            typeof itemKey === "string" || typeof itemKey === "number"
              ? itemKey
              : index;
          let itemLabel = item[itemText];
          return (
            <FormControlLabel
              key={key}
              value={item[itemValue]}
              control={<Radio />}
              label={typeof itemLabel === "string" ? itemLabel : ""}
            />
          );
        })}
      </RadioGroup>
      {hasError ? (
        <FormHelperText
          sx={{ fontSize: "0.8rem" }}
          error={true}
          variant={"standard"}
        >
          {formikMeta.error}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}
