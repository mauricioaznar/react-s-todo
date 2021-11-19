import React from 'react'
import {Controller} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {MauInputProps} from "./common/MauInputProps";

interface Rules {
    required?: boolean;
    min?: number;
    max?: number;
    maxLength?: number;
    minLength?: number;
    pattern?: RegExp;
}


interface MauTextFieldProps extends MauInputProps {
    rules: Rules;
    size?: "medium" | "small"
}

const getRuleMessage = ({
                            rule,
                            rules,
                            fieldName
                        }: { rule: keyof Rules, value: string, rules: Rules, fieldName: string }) => {

    switch (rule) {
        case 'required': {
            return `${fieldName} is required.`
        }
        case 'minLength': {
            return `${fieldName} must be bigger than ${rules[rule]}.`
        }
        default: {
            return ''
        }
    }
}



const MauTextField = ({control, name, label, rules, size = "medium"}: MauTextFieldProps) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
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
                    <TextField
                        size={size}
                        margin="normal"
                        fullWidth
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value)
                        }}
                        error={!!error}
                        helperText={helperText}
                        label={label}
                        autoFocus
                    />
                )
            }}
        />
    )
}

export default MauTextField
