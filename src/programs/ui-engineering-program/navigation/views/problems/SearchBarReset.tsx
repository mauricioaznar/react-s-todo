import React, { useEffect } from 'react';
import { Box, Tab, Tabs, TextField, Typography } from '@mui/material';

export function SearchBarReset() {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [text, setText] = React.useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setText('');
  }, [value]);

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="likes" />
          <Tab label="follows" />
        </Tabs>
      </Box>
      <Box sx={{ my: 2 }}>
        <TextField value={text} onChange={handleTextChange} />
      </Box>
      {value === 0 ? (
        <>
          <Typography>Likes</Typography>
        </>
      ) : null}
      {value === 1 ? (
        <>
          <Typography>Follows</Typography>
        </>
      ) : null}
    </Box>
  );
}
