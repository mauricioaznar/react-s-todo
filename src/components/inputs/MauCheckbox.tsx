import React from 'react'
import {Controller} from "react-hook-form";
import {MauInputProps} from "./common/MauInputProps";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";


interface MauCheckboxProps extends MauInputProps {}


const MauCheckbox = ({ control, name, label }: MauCheckboxProps) => {
    return (
        <Controller
            control={control}
            name={name}
            render={(ops) => {
                const {field: {onChange, value}} = ops
                return (
                    <FormGroup>
                        <FormControlLabel
                            sx={{
                                justifyContent: "flex-start"
                            }}
                            checked={value}
                            onChange={() => {
                                onChange(!value)
                            }}
                            control={<Checkbox />}
                            label={label || ''}
                        />
                    </FormGroup>
                )
            }}
        />
    )
}

export default MauCheckbox
