import { DatePicker } from "@mui/lab";
import moment from "moment";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";

type Views = "day" | "year" | "month";

interface EnhancedDatePickerProps {
  onChange: (date: string | null) => void;
  value: string | null;
  disabled?: boolean;
  label?: string;
  views: readonly Views[];
  mask: string;
  inputFormat: string;
  error?: boolean;
  helperText?: string;
}

export default function ClearableDatePicker(props: EnhancedDatePickerProps) {
  const {
    onChange,
    disabled,
    label,
    value,
    views,
    mask,
    inputFormat,
    helperText,
    error,
  } = props;

  return (
    <DatePicker
      views={views}
      mask={mask}
      inputFormat={inputFormat}
      label={label}
      value={value}
      clearable={true}
      disabled={disabled}
      onChange={(newValue) => {
        if (moment.isMoment(newValue)) {
          const date = moment(newValue).format(inputFormat);
          onChange(date);
        } else {
          onChange(newValue);
        }
      }}
      renderInput={({ InputProps, ...params }) => {
        return (
          <TextField
            {...params}
            color={"primary"}
            margin="normal"
            fullWidth
            label={label}
            helperText={helperText}
            error={error}
            InputProps={{
              endAdornment: (
                <>
                  {
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          onChange(null);
                        }}
                        edge="end"
                        disabled={!value}
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  {InputProps?.endAdornment}
                </>
              ),
            }}
          />
        );
      }}
    />
  );
}
