import React from 'react'
import {DATE_FORMAT, DATE_MASK} from "../../../helpers/format-date";
import ClearableDatePicker from "../../clearable-date-picker/clearable-date-picker";
import {FormikDefaultProps} from "./common/FormikDefaultProps";
import {useField} from "formik";



interface FormikDateProps extends FormikDefaultProps {

}


const ReactHookFormDatePicker = ({  name, label }: FormikDateProps) => {

    const [formikProps, formikMeta, fieldHelperProps] = useField(name)

    return (
        <ClearableDatePicker
            views={['day']}
            mask={DATE_MASK}
            inputFormat={DATE_FORMAT}
            label={label}
            onChange={(val) => {
                fieldHelperProps.setValue(val, true)
            }}
            value={formikProps.value}
            error={!!formikMeta.error}
            helperText={formikMeta.touched ? formikMeta.error : ''}
        />
    )
}

export default ReactHookFormDatePicker
