import React from "react";
import FormikTextField from "../../../../../dum/inputs/formik/formik-text-field";
import IFormikNestedInputs from "../i-formik-nested-inputs";

const NestedNameInput = () => {
  const inputName: keyof IFormikNestedInputs = "name";
  return <FormikTextField name={inputName} label="Name" />;
};

export default NestedNameInput;
