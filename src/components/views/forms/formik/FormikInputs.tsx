import React from "react";
import { Button, IconButton, TableCell, TableRow } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import {
  IsUserOccupiedQuery,
  refetchIsUserOccupiedQuery,
} from "../../../../services/schema";
import { ApolloQueryResult, useApolloClient } from "@apollo/client";
import FormikTextField from "../../../dum/inputs/formik/formik-text-field";
import FormikFile from "../../../dum/inputs/formik/formik-file";
import FormikDate from "../../../dum/inputs/formik/formik-date";
import FormikCheckbox from "../../../dum/inputs/formik/formik-checkbox";
import FormikRadio from "../../../dum/inputs/formik/formik-radio";
import FormikAutocomplete from "../../../dum/inputs/formik/formik-autocomplete";
import FormikTable from "../../../dum/inputs/formik/formik-table";
import { Delete } from "@mui/icons-material";

export default function Inputs() {
  const client = useApolloClient();

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username is required")
      .test("unique", "username must be unique", async function (value) {
        const result: ApolloQueryResult<IsUserOccupiedQuery> =
          await client.query(
            refetchIsUserOccupiedQuery({ username: value || "" }),
          );
        return !result.data.isUserOccupied;
      }),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    file: yup.string().nullable().required("Pleasse provide a file"),
    files: yup.mixed().nullable().required("Pleasse provide a file"),
    date: yup.mixed().nullable().required("Pleasse provide a date"),
    radio: yup.mixed().nullable().required("Pleasse provide a radio"),
    autocomplete: yup
      .mixed()
      .nullable()
      .required("Pleasse provide a autocomplete"),
    array: yup
      .array()
      .min(1, "array required minimum 1 item")
      .of(
        yup.object().shape({
          description: yup.string().required("description is required"),
        }),
      )
      .required("Required"),
  });

  const items = [
    {
      text: "text 1",
      value: "value 1",
    },
    {
      text: "text 2",
      value: "value 2",
    },
    {
      text: "text 3",
      value: "value 3",
    },
  ];

  return (
    <Formik
      initialValues={{
        username: "jonas",
        password: "foobar43243",
        file: null,
        files: null,
        date: "2021-01-01",
        checkbox: false,
        radio: items[0].value,
        autocomplete: items[0].value,
        array: [{ description: "12341234" }],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <FormikDate name={"date"} label={"Date"} />
        <FormikTextField name="username" label="Username" />
        <FormikTextField label="Password" name="password" type={"password"} />
        <FormikFile name={"file"} label={"Upload file"} />

        <FormikFile name={"files"} label={"Upload files"} multiple={true} />
        <FormikCheckbox name={"checkbox"} label={"Checkbox"} />
        <FormikRadio
          items={items}
          itemText={"text"}
          itemValue={"value"}
          name={"radio"}
          label={"Radio"}
        />
        <FormikAutocomplete
          items={items}
          itemText={"text"}
          itemValue={"value"}
          name={"autocomplete"}
          label={"Autocomplete"}
        />

        <FormikTable
          renderHeader={() => {
            return (
              <TableRow>
                <TableCell width={"70%"}>Description</TableCell>
                <TableCell align={"right"}>Actions</TableCell>
              </TableRow>
            );
          }}
          renderRow={(i, index, deleteItem) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <FormikTextField
                    name={`array[${index}].description`}
                    label="Desscription"
                  />
                </TableCell>
                <TableCell align={"right"}>
                  <IconButton onClick={deleteItem}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          }}
          defaultItem={{
            description: "",
          }}
          name={"array"}
          label={"Array"}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </Form>
    </Formik>
  );
}
