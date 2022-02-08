import React, { useCallback, useState } from 'react';
import { Box, Button, FormHelperText, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MauSnackbar from '../../../../../components/MauSnackbar';

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms));
};

export default function UiBlocker() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [label1, setLabel1] = useState('-');
  const [label2, setLabel2] = useState('-');
  const [computationDuration, setComputationDuration] = useState('-');

  const heavyComputation = useCallback(() => {
    const s = new Date().getTime();
    let x = {} as { [key: string]: number };
    for (let i = 0; i < 30000; i++) {
      const key = 'x' + i.toString();
      x[key] = i * i + i;
    }
    const e = new Date().getTime();
    setComputationDuration((e - s).toString());
  }, []);

  return (
    <Stack direction={'row'} spacing={2} alignItems={'baseline'}>
      <Box>
        <Typography sx={{ fontSize: '3rem', fontWeight: 'bold' }}>{computationDuration}</Typography>
        <FormHelperText>Duration of the computation only</FormHelperText>
      </Box>
      <Box>
        <Button
          variant={'contained'}
          onClick={() => {
            const s = new Date().getTime();
            heavyComputation();
            const e = new Date().getTime();
            const duration = (e - s).toString();
            setLabel1(duration);
          }}
        >
          Click
        </Button>
        <FormHelperText>Action without duration {label1}</FormHelperText>
      </Box>
      <Box>
        <LoadingButton
          variant={'contained'}
          loading={loading}
          onClick={async () => {
            const s = new Date().getTime();
            setLoading(true);
            heavyComputation();
            await sleep(1000);
            setLoading(false);
            setMessage('Loaded');
            const e = new Date().getTime();
            const duration = (e - s).toString();
            setLabel2(duration);
          }}
        >
          Click
        </LoadingButton>
        <FormHelperText>Action with loading states duration {label2}</FormHelperText>
      </Box>

      <MauSnackbar message={message} variant={'success'} />
    </Stack>
  );
}
