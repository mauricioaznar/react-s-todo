import React, {useCallback} from 'react'
import {Controller} from "react-hook-form";
import {MauInputProps} from "./common/MauInputProps";
import {Box, Button, FormHelperText, styled} from "@mui/material";

interface Rules {
    required?: boolean;
    filesize?: number;
    multiple?: boolean;
}


interface MauFileProps extends MauInputProps {
    rules: Rules,
    label?: string;
}


const Input = styled('input')({
    display: 'none',
});


const getRuleMessage = ({
                            rule,
                            rules,
                            fieldName,
                            value
                        }: { rule: keyof Rules | 'validate', value: string, rules: Rules, fieldName: string }) => {

    switch (rule) {
        case 'required': {
            return `${fieldName} is required.`
        }

        case 'validate': {
            const customRule = customValidate(value, rules)

            if (customRule === 'filesize') {
                return `${fieldName} exceeds ${rules.filesize}`
            }

            return ''

        }
        default: {
            return ''
        }
    }
}

const customValidate: (val: any, rules: Rules) => keyof Rules | null = (val, rules) => {
    let rule: keyof Rules | null = null
    if (rules.filesize) {
        const size = rules.filesize
        if (val !== null) {
            if (rules.multiple && rules.filesize) {
                const fileArray = val as File[]
                return fileArray.some(f => f.size > size) ? 'filesize' : null
            } else {
                const fileConst = val as File
                return fileConst.size > size ? 'filesize' : null
            }

        }
    }
    return rule
}


const MauFile = ({control, label, name, rules}: MauFileProps) => {

    const {filesize, multiple, ...rest} = rules


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
        <Controller
            control={control}
            name={name}
            rules={
                {
                    ...rest,
                    validate: function (value) {
                        return customValidate(value, { filesize, multiple }) === null
                    }
                }

            }
            render={(ops) => {
                const {field: {onChange, value}, fieldState: {error}} = ops

                let helperText = ''
                if (error) {
                    const rule = error.type as keyof Rules
                    helperText = getRuleMessage({
                        rule: rule,
                        fieldName: label || name,
                        rules: rules,
                        value: value
                    })
                }

                return (

                    <Box sx={{ my: 2}}>
                        <label htmlFor={`contained-button-file-${name}`} >
                            <Input
                                id={`contained-button-file-${name}`}
                                multiple={multiple}
                                type="file"
                                onChange={
                                    ({
                                         target: {
                                             files
                                         }
                                     }: any) => {
                                        const newValue = multiple ? [...files] : files[0]
                                        onChange(newValue)
                                    }}
                            />
                            <Button
                                sx={{ mr: 1 }}
                                variant="contained"
                                component="span"
                                color={error ? `error` : undefined}
                            >
                                {
                                    !error
                                        ? `Upload`
                                        : `Error`
                                }
                            </Button>
                            {
                                getFilename(value)
                            }
                            <Box sx={{ my: 0 }}>

                                {
                                    error ? (
                                        <FormHelperText sx={{ fontSize: '0.8em' }} error={true} variant={'standard'}>
                                            { helperText }
                                        </FormHelperText>
                                    ) : null
                                }
                            </Box>

                        </label>
                    </Box>
                )
            }}
        />
    )
}

export default MauFile
