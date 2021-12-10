import React, {useCallback} from 'react'

import {Box, Button, FormHelperText, styled} from "@mui/material";
import {FormikDefaultProps} from "./common/FormikDefaultProps";
import {useField} from "formik";

interface FormikFileProps extends FormikDefaultProps {
    multiple?: boolean;
}


const Input = styled('input')({
    display: 'none',
});


const ReactHookFormFile = ({ label, name, multiple = false }: FormikFileProps) => {


    const [formikProps, formikMeta, fieldHelperProps] = useField(name)



    const getFilename = useCallback((value: any) => {
        if (value && multiple) {
            const fileArray = value as File[]
            const filenames = fileArray
                .reduce((curr, file, index) => {
                    const separator = index === 0 ? '' : index === fileArray.length - 1 ? ' and ' : ', '
                    return curr + separator + file.name
                }, '')
            return <span>{ filenames }</span>
        } else if (value && !multiple) {
            const fileConst = value as File
            return <span> {fileConst.name} </span>
        } else {
            return null;
        }
    }, [multiple])

    return (
        <Box sx={{ mt: 2, mb: 3}}>
            <label>
                <Input
                    multiple={multiple}
                    type="file"
                    onChange={({ target: {
                        files
                    }}: any) => {
                        const newValue = multiple
                            ? (files ? [...files] : [])
                            : (files ? files[0] : null)
                        fieldHelperProps.setTouched(true, false)
                        fieldHelperProps.setValue(newValue, false)
                    }}
                    name={formikProps.name}
                />
                <Button
                    sx={{ mr: 1 }}
                    variant="contained"
                    component="span"
                    color={formikMeta.error ? `error` : undefined}
                >
                    {
                        !formikMeta.error
                            ? label
                            : `Error`
                    }
                </Button>
                {
                    getFilename(formikProps.value)
                }
                <Box sx={{ my: 0 }}>

                    {
                        formikMeta.error ? (
                            <FormHelperText sx={{ fontSize: '0.8em' }} error={true} variant={'standard'}>
                                { formikMeta.error }
                            </FormHelperText>
                        ) : null
                    }
                </Box>

            </label>
        </Box>
    )
}

export default ReactHookFormFile
