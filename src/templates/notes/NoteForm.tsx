import React from 'react'
import {Button} from "@mui/material";
import * as yup from 'yup';
import {Form, Formik} from 'formik';
import {IsUserOccupiedQuery, refetchIsUserOccupiedQuery} from "../../schema";
import {ApolloQueryResult, useApolloClient} from "@apollo/client";
import FormikTextField from "../../components/inputs/formik/FormikTextField";
import FormikFile from "../../components/inputs/formik/FormikFile";
import FormikDate from "../../components/inputs/formik/FormikDate";
import FormikCheckbox from "../../components/inputs/formik/FormikCheckbox";
import FormikRadio from "../../components/inputs/formik/FormikRadio";
import FormikAutocomplete from "../../components/inputs/formik/FormikAutocomplete";

export default function NoteForm () {
    const client = useApolloClient()


    const validationSchema = yup.object({
        email: yup
            .string()
            .required('Email is required')
            .test("unique", "email must be unique",
                async function (value) {
                    const result: ApolloQueryResult<IsUserOccupiedQuery> =
                        await client.query(refetchIsUserOccupiedQuery({ username: value || '' }))
                    return !result.data.isUserOccupied
                }
            ),
        password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        file: yup
            .string()
            .nullable()
            .required('Pleasse provide a file'),
        files:  yup
            .mixed()
            .nullable()
            .required('Pleasse provide a date'),
        date:  yup
            .mixed()
            .nullable()
            .required('Pleasse provide a file'),
        radio:  yup
            .mixed()
            .nullable()
            .required('Pleasse provide a radio'),
        autocomplete:  yup
            .mixed()
            .nullable()
            .required('Pleasse provide a autocomplete'),
    });

    const items = [
        {
            text: 'text 1',
            value: 'value 1'
        },
        {
            text: 'text 2',
            value: 'value 2'
        },
        {
            text: 'text 3',
            value: 'value 3'
        },
    ]

    return (
        <Formik
            initialValues={{
                email: 'foobar@example.com',
                password: 'foobar',
                file: null,
                files: null,
                date: null,
                checkbox: false,
                radio: null,
                autocomplete: items[0],
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {

                alert(JSON.stringify(values, null, 2));
            }}
        >
            <Form

            >
                <FormikDate
                    name={'date'}
                    label={'Date'}
                />
                <FormikTextField
                    name="email"
                    label="Email"
                />
                <FormikTextField
                    label="Password"
                    name="password"
                    type={'password'}
                />
                <FormikFile
                    name={'file'}
                    label={'Upload file'}
                />

                <FormikFile
                    name={'files'}
                    label={'Upload files'}
                    multiple={true}
                />
                <FormikCheckbox
                    name={'checkbox'}
                    label={'Checkbox'}
                />
                <FormikRadio
                    items={items}
                    itemValue={'value'}
                    itemText={'text'}
                    itemId={'value'}
                    name={'radio'}
                    label={'Radio'}
                />
                <FormikAutocomplete
                    items={items}
                    itemValue={'value'}
                    itemText={'text'}
                    itemId={'value'}
                    name={'autocomplete'}
                    label={'Autocomplete'}
                />

                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </Form>
        </Formik>
    );
}
