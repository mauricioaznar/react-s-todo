import React from 'react'
import {Controller} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {MauInputProps} from "./common/MauInputProps";
import {DatePicker} from "@mui/lab";
import moment from "moment";
import {DATE_FORMAT, DATE_MASK} from "../../helpers/format-date";

interface Rules {
    required?: boolean;
}


interface MauDatePickerProps extends MauInputProps {
    rules: Rules;
}

const getRuleMessage = ({
                            rule,
                            fieldName
                        }: { rule: keyof Rules, value: string, rules: Rules, fieldName: string }) => {

    switch (rule) {
        case 'required': {
            return `${fieldName} is required.`
        }
        default: {
            return ''
        }
    }
}



const MauDatePicker = ({control, name, label, rules}: MauDatePickerProps) => {
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
                    <DatePicker
                        mask={DATE_MASK}
                        inputFormat={DATE_FORMAT}
                        label={label}
                        value={value}
                        clearable={true}
                        onChange={(newValue) => {
                            if (moment.isMoment(newValue)) {
                                onChange(newValue.format(DATE_FORMAT));
                            } else {
                                onChange(newValue);
                            }
                        }}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    color={'primary'}
                                    margin="normal"
                                    fullWidth
                                    error={!!error}
                                    helperText={helperText}
                                    label={label}
                                    autoFocus
                                />
                            )
                        }}
                    />
                )
            }}
        />
    )
}

export default MauDatePicker
