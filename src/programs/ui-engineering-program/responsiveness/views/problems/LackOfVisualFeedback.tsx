import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

const fakeFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export default function LackOfVisualFeedback() {
  const [result, setResult] = useState("");

  const handleClick = async () => {
    try {
      await fakeFetch();
      setResult("success!");
    } catch (e) {
      //
    }
  };

  return (
    <Stack direction={"row"} spacing={3}>
      <Button
        variant={"contained"}
        onClick={async () => {
          await handleClick();
        }}
      >
        Fetch
      </Button>
      {result !== "" ? <Typography>{result}</Typography> : null}
    </Stack>
  );
}
