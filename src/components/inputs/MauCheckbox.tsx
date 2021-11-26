import React from 'react'
import {Controller} from "react-hook-form";
import {MauInputProps} from "./common/MauInputProps";
import {Checkbox, FormControlLabel, FormGroup, SvgIconTypeMap} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {OverridableComponent} from "@mui/material/OverridableComponent";


interface MauCheckboxProps extends MauInputProps {
    uncheckedIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {muiName: string}
    checkedIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {muiName: string}

}


const MauCheckbox = ({ control, name, label, checkedIcon, uncheckedIcon }: MauCheckboxProps) => {
    const CheckedIcon = checkedIcon || CheckBoxIcon
    const UncheckedIcon = uncheckedIcon || CheckBoxOutlineBlankIcon
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
                            control={
                                <Checkbox
                                    checkedIcon={<CheckedIcon />}
                                    icon={<UncheckedIcon />}
                                />
                            }
                            label={label || ''}
                        />
                    </FormGroup>
                )
            }}
        />
    )
}

export default MauCheckbox
