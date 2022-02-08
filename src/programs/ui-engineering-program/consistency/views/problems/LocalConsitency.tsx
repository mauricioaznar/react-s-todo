import { Badge, Stack } from '@mui/material';
import FeedbackButton from '../../components/FeedbackButton';
import { ThumbUp } from '@mui/icons-material';
import React, { useState } from 'react';
import { fakeApi } from '../../services/fake-api';

const LOCAL_CONSISTENCY_KEY = 'local_consistency_value_key';

export default function LocalConsistency() {
  const initialValue = window.localStorage.getItem(LOCAL_CONSISTENCY_KEY)
    ? Number(window.localStorage.getItem(LOCAL_CONSISTENCY_KEY))
    : 2;

  const [valueOne, setValueOne] = useState(initialValue);
  const [valueTwo] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      await fakeApi.fetchSuccess();
      const newValue = valueOne + 1;
      setValueOne(newValue);
      window.localStorage.setItem(LOCAL_CONSISTENCY_KEY, String(newValue));
    } catch (e) {
      return false;
    }
    setLoading(false);
    return true;
  };

  return (
    <Stack direction={'row'} alignItems={'center'} spacing={2}>
      <FeedbackButton loading={loading} label={`Like`} onClick={fetch} icon={<ThumbUp />} />
      <Badge color="secondary" badgeContent={valueOne}>
        <ThumbUp />
      </Badge>
      <Badge color="secondary" badgeContent={valueTwo}>
        <ThumbUp />
      </Badge>
    </Stack>
  );
}
