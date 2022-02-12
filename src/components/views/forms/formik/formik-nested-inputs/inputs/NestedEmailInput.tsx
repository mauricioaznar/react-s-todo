import React, { useEffect } from "react";
import FormikTextField from "../../../../../dum/inputs/formik/formik-text-field";
import { useFormikContext } from "formik";
import IFormikNestedInputs from "../i-formik-nested-inputs";

const NestedEmailInput = () => {
  const inputName: keyof IFormikNestedInputs = "email";
  const { values, setFieldValue } = useFormikContext<IFormikNestedInputs>();

  useEffect(() => {
    setFieldValue(inputName, `${values.name}@email.com`);
  }, [values.name]);

  return <FormikTextField name={inputName} label="Email" />;
};

export default NestedEmailInput;
