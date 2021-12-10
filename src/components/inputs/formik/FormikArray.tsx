import React from 'react'
import {
    Box,
    FormHelperText,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    Toolbar,
    Tooltip
} from "@mui/material";
import {FormikDefaultProps} from "./common/FormikDefaultProps";
import {useField} from "formik";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";


interface FormikArrayProps<T> extends FormikDefaultProps {
    renderRow: (item: T, index: number) => React.ReactNode;
    renderHeader: () => React.ReactNode;
    defaultItem: T;
}


function FormikArray<T>({ name, label, renderRow, renderHeader, defaultItem }: FormikArrayProps<T>){

    const [formikProps, formikMeta ,fieldHelperProps] = useField(name)

    const items = formikProps.value as T[]

    const append = () => {
        fieldHelperProps.setValue(items.concat([{...defaultItem}]))
    }

    return (
        <Grid
            item
            sx={{
                mt: 2
            }}
            xs={12}
        >
            <Grid
                container
                direction={'column'}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Toolbar
                        disableGutters
                    >
                        <Box   sx={{
                            flexGrow: 1
                        }}>
                            <Typography

                                variant="h6"
                            >
                                { label }
                            </Typography>
                            {
                                formikMeta.touched && typeof formikMeta.error === 'string' ? (
                                    <FormHelperText sx={{ fontSize: '0.8rem', my: 0 }} error={true} variant={'standard'}>
                                        { formikMeta.error }
                                    </FormHelperText>
                                ) : null
                            }
                        </Box>

                        <Tooltip title="Create todo">
                            <IconButton
                                aria-label="filter list"
                                onClick={() => {
                                   append()
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>

                    <TableContainer component={Paper}>
                        <Table

                            size={"small"}
                            aria-label="credit notes table"
                        >
                            <TableHead>
                                {
                                    renderHeader()
                                }
                            </TableHead>
                            <TableBody >
                                {
                                    items.map((i, index) => {
                                        return renderRow(i, index)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FormikArray
