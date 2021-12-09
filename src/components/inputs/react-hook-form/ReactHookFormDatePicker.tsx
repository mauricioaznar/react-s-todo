import React from 'react'
import {Controller} from "react-hook-form";
import {MauInputProps} from "./common/MauInputProps";
import {DATE_FORMAT, DATE_MASK} from "../../../helpers/format-date";
import ClearableDatePicker from "../../clearable-date-picker/clearable-date-picker";

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



const ReactHookFormDatePicker = ({control, name, label, rules, disabled}: MauDatePickerProps) => {
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
                    <ClearableDatePicker
                        views={['day']}
                        disabled={disabled}
                        mask={DATE_MASK}
                        inputFormat={DATE_FORMAT}
                        label={label}
                        value={value}
                        onChange={(newValue) => {
                            onChange(newValue);
                        }}
                        error={!!error}
                        helperText={helperText}
                    />
                )
            }}
        />
    )
}

export default ReactHookFormDatePicker
