import React from 'react'
import {Controller} from "react-hook-form";
import {MauInputProps} from "./common/MauInputProps";
import {Button, styled} from "@mui/material";

interface Rules {
    required?: boolean;
}


interface MauFileProps extends MauInputProps {
    rules: Rules,
    multiple?: boolean;
}


const Input = styled('input')({
    display: 'none',
});

const MauFile = ({control, name, rules, multiple = false}: MauFileProps) => {


    const getFilename = (value: any) => {
        if (value && multiple) {
            const fileArray = value as File[]
            return fileArray.map((v, index) => (<span key={index}>{v.name}</span>))
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
            rules={rules}
            render={(ops) => {
                const {field: {onChange, value}, fieldState: {error}} = ops
                return (

                    <label htmlFor={`contained-button-file-${name}`}>
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
                                    const newValue = multiple ? files : files[0]
                                    onChange(newValue)
                                }}
                        />
                        <Button variant="contained" component="span" color={error ? `error` : undefined}>
                            {
                                !error
                                    ? `Upload`
                                    : `Error`
                            }
                        </Button>
                        <span>
                            {
                                getFilename(value)
                            }
                        </span>
                    </label>
                )
            }}
        />
    )
}

export default MauFile
