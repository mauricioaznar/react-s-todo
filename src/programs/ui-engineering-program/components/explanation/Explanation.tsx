import React from 'react';
import { Box, Typography } from '@mui/material';

interface ExplanationProps {
  explanation: string;
}

export default function Explanation(props: ExplanationProps) {
  const { explanation } = props;

  return (
    <Box>
      <Typography variant={'body1'} sx={{ mb: 2 }}>
        &ldquo;{explanation}&rdquo;
      </Typography>
      <Typography align={'right'}>
        <i>The Elements of UI Engineering</i>, Dan Abramov
      </Typography>
    </Box>
  );
}
