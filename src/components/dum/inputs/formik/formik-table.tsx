import React from "react";
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
  Tooltip,
} from "@mui/material";
import { FormikDefaultProps } from "./common/formik-default-props";
import { useField } from "formik";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

interface FormikArrayProps<T> extends FormikDefaultProps {
  renderRow: (
    item: T,
    index: number,
    deleteItem: () => void,
  ) => React.ReactNode;
  renderHeader: () => React.ReactNode;
  defaultItem: T;
}

function FormikTable<T>({
  name,
  label,
  renderRow,
  renderHeader,
  defaultItem,
}: FormikArrayProps<T>) {
  const [formikProps, formikMeta, fieldHelperProps] = useField(name);

  const items = formikProps.value as T[];

  const appendItem = () => {
    fieldHelperProps.setTouched(true, false);
    fieldHelperProps.setValue(items.concat([{ ...defaultItem }]), true);
  };

  return (
    <Grid
      item
      sx={{
        mt: 2,
        mb: 3,
      }}
      xs={12}
    >
      <Grid container direction={"column"}>
        <Grid item xs={12}>
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <Typography variant={"body1"}>{label}</Typography>
              {formikMeta.touched && typeof formikMeta.error === "string" ? (
                <FormHelperText
                  sx={{ fontSize: "0.8rem", my: 0 }}
                  error={true}
                  variant={"standard"}
                >
                  {formikMeta.error}
                </FormHelperText>
              ) : null}
            </Box>

            <Tooltip title="Create todo">
              <IconButton
                aria-label="filter list"
                onClick={() => {
                  appendItem();
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>

          {items.length > 0 ? (
            <TableContainer component={Paper}>
              <Table size={"small"} aria-label="credit notes table">
                <TableHead>{renderHeader()}</TableHead>
                <TableBody>
                  {items.map((i, index) => {
                    const deleteItem = (item: T) => {
                      fieldHelperProps.setTouched(true, false);
                      fieldHelperProps.setValue(
                        items.filter((i) => {
                          return i !== item;
                        }),
                        true,
                      );
                    };

                    return renderRow(i, index, () => {
                      deleteItem(i);
                    });
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FormikTable;
