import React, { useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { animated, useSpring } from 'react-spring';

const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms));
};

export default function JankyAnimation() {
  const [text, setText] = useState('');

  const [styles, api] = useSpring(() => {
    return {
      from: {
        x: 0,
      },
      to: [{ x: 100 }, { x: 0 }],
      loop: true,
    };
  });

  const makeJanky = async () => {
    api.resume();
    await sleep(10);
    api.pause();
    await sleep(10);
    api.resume();
    await sleep(10);
    api.pause();
    await sleep(40);
    api.resume();
    await sleep(30);
    api.pause();
    await sleep(50);
    api.resume();
  };

  useEffect(() => {
    makeJanky();
  }, [text]);

  return (
    <Stack direction={'row'} spacing={2}>
      <TextField
        label={'Write fast!'}
        helperText={'Write fast to feel the jankiness'}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <animated.div
        style={{
          ...styles,
          width: '50px',
          height: '50px',
          backgroundColor: 'white',
          borderRadius: '100px',
        }}
      />
    </Stack>
  );
}
