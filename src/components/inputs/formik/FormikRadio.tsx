import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {FormikDefaultProps} from "./common/FormikDefaultProps";
import {useField} from "formik";
import {FormHelperText} from "@mui/material";

interface FormikRadioProps<T> extends FormikDefaultProps {
    items: T[];
    itemValue: keyof T;
    itemText: keyof T;
    itemId: keyof T;
}

export default function FormikRadio<T>({ name, label, items, itemValue, itemText, itemId }: FormikRadioProps<T>) {

    const [formikProps, formikMeta, fieldHelperProps] = useField(name)

    const hasError = Boolean(formikMeta.touched && formikMeta.error)

    return (
        <FormControl component="fieldset"  sx={{ mt: 2, mb: 3}}>
            <FormLabel component="legend" error={hasError} >{ label }</FormLabel>
            <RadioGroup
                row
                aria-label="gender"
                defaultValue="female"
                name="radio-buttons-group"
                value={formikProps.value}
                onChange={(e) => {
                    fieldHelperProps.setTouched(true, false)
                    fieldHelperProps.setValue(e.target.value, true)
                }}
            >
                {
                    items.map((item, index) => {
                        const itemKey = item[itemId]
                        const key = typeof itemKey === 'string' || typeof itemKey === 'number'
                            ? itemKey
                            : index;
                        return (
                            <FormControlLabel
                                key={key}
                                value={item[itemValue]}
                                control={<Radio />}
                                label={item[itemText]}
                            />
                        )
                    })
                }
            </RadioGroup>
            {
                hasError? (
                    <FormHelperText sx={{ fontSize: '0.8em' }} error={true} variant={'standard'}>
                        { formikMeta.error }
                    </FormHelperText>
                ) : null
            }
        </FormControl>
    )

}
