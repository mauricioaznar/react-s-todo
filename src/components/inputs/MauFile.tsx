import React from 'react'
import {Controller} from "react-hook-form";
import {MauInputProps} from "./common/MauInputProps";
import {Box, Button, styled} from "@mui/material";

interface Rules {
    required?: boolean;
    filesize?: number;
}


interface MauFileProps extends MauInputProps {
    rules: Rules,
    multiple?: boolean;
}


const Input = styled('input')({
    display: 'none',
});

const MauFile = ({control, name, rules, multiple = false}: MauFileProps) => {

    const {filesize, ...rest} = rules

    const getFilename = (value: any) => {
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
    }

    return (
        <Controller
            control={control}
            name={name}
            rules={
                {
                    ...rest,
                    validate: function (value) {

                        if (filesize) {
                            if (value !== null) {
                                if (multiple) {
                                    const fileArray = value as File[]
                                    return fileArray.some(f => f.size < filesize)
                                } else {
                                    const fileConst = value as File
                                    return fileConst.size < filesize
                                }

                            }
                        }

                        return true

                    }
                }

            }
            render={(ops) => {
                const {field: {onChange, value}, fieldState: {error}} = ops
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
                        </label>
                    </Box>
                )
            }}
        />
    )
}

export default MauFile
