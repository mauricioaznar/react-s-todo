import React from 'react';
import { Box, FormHelperText, Stack, useTheme } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

const HEIGHT = 400;

interface CustomMarkdownEditorProps {
  value: string | undefined;
  setValue: (val: string | undefined) => void;
}

export default function CustomMarkdownEditor(props: CustomMarkdownEditorProps) {
  const { value, setValue } = props;
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, mb: 1 }}>
      <FormHelperText sx={{ mb: 1 }}>Editor</FormHelperText>
      <Stack direction={'row'} spacing={2} justifyContent={'stretch'} alignItems={'stretch'}>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Box sx={{ flex: '1 0 50%' }}>
          <MDEditor
            className={'custom-editor'}
            value={value}
            hideToolbar
            height={HEIGHT}
            onChange={setValue}
            preview={'edit'}
            visiableDragbar={false}
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              minHeight: '100%',
            }}
            textareaProps={{
              style: { color: 'white', minHeight: '100%', height: '100%' },
            }}
          />
        </Box>
        <Box sx={{ flex: '1 0 50%', wordWrap: 'break-word' }}>
          <MDEditor.Markdown
            source={value}
            style={{ height: `${HEIGHT - 29}px`, overflowY: 'auto' }}
          />
        </Box>
      </Stack>
    </Box>
  );
}
