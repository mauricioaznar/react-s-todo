import React, { useState } from "react";
import { useThemeContext } from "../../../hooks/context-hooks/useThemeContext";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

export default function ThemeSelector() {
  const { selectTheme, themes, currentTheme } = useThemeContext();
  const [name, setName] = useState<string>(
    currentTheme ? currentTheme.name : "",
  );

  return (
    <FormControl sx={{ m: 1 }} fullWidth>
      <InputLabel id="app-variant-label">Th eme</InputLabel>
      <Select
        labelId="app-variant-label"
        value={name}
        onChange={(e) => {
          const newName = e.target.value;
          const av = themes.find((av) => {
            return newName === av.name;
          });
          if (av !== undefined) {
            selectTheme(av);
            setName(newName);
          }
        }}
        input={<OutlinedInput label="Theme" />}
        renderValue={() => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {currentTheme ? <Chip label={currentTheme.title} /> : null}
          </Box>
        )}
      >
        {themes.map((av) => (
          <MenuItem key={av.name} value={av.name}>
            {av.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
