import React, { useState } from 'react';
import { useProgramsContext } from '../../hooks/context-hooks/useProgramsContext';
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

export default function AppVariantSelect() {
  const { selectAppVariant, appVariants, currAppVariant } = useProgramsContext();
  const [name, setName] = useState<string>(currAppVariant ? currAppVariant.name : '');

  return (
    <FormControl sx={{ m: 1 }} fullWidth>
      <InputLabel id="app-variant-label">ProgramHandler</InputLabel>
      <Select
        labelId="app-variant-label"
        value={name}
        onChange={(e) => {
          const newName = e.target.value;
          const av = appVariants.find((av) => {
            return newName === av.name;
          });
          if (av !== undefined) {
            selectAppVariant(av);
            setName(newName);
          }
        }}
        input={<OutlinedInput label="ProgramHandler" />}
        renderValue={() => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {currAppVariant ? <Chip label={currAppVariant.title} /> : null}
          </Box>
        )}
      >
        {appVariants.map((av) => (
          <MenuItem key={av.name} value={av.name}>
            {av.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
