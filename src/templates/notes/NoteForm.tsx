import React from 'react'
import {Button} from "@mui/material";
import * as yup from 'yup';
import {Form, Formik} from 'formik';
import {IsUserOccupiedQuery, refetchIsUserOccupiedQuery} from "../../schema";
import {ApolloQueryResult, useApolloClient} from "@apollo/client";
import FormikTextField from "../../components/inputs/formik/FormikTextField";
import FormikFile from "../../components/inputs/formik/FormikFile";

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
            .mixed()
            .nullable()
            .required('Pleasse provide a file')

    });

    return (
        <Formik
            initialValues={{
                email: 'foobar@example.com',
                password: 'foobar',
                file: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}
        >
            <Form

            >
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
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </Form>
        </Formik>
    );
}
