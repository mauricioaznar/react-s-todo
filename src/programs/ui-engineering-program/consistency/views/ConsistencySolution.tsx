import React, { useEffect, useState } from "react";
import { Badge, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import { fakeApi } from "../services/fake-api";
import FeedbackButton from "../components/FeedbackButton";

export default function ConsistencySolution() {
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);

  const getLikes = async () => {
    const newLikes = await fakeApi.getLikes();
    setLikes(newLikes);
    setLoading(false);
  };

  const fetch = async () => {
    setLoading(true);
    try {
      await fakeApi.setLikes(likes + 1);
      await getLikes();
    } catch (e) {
      return false;
    }
    setLoading(false);
    return true;
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <Box>
      <Typography variant={"h5"} sx={{ fontSize: "1.2rem", mb: 2 }}>
        The ultimate example that demonstrates ui consistency
      </Typography>
      <Typography>Features</Typography>
      <ul style={{ fontStyle: "italic", margin: 0 }}>
        <li>Loading state share across all components</li>
        <li>Data gets locally persisted so it doesnt get lost/forgotten</li>
        <li>
          Same data gets reused across all components and is retrieved from
          parent ancestor
        </li>
        <li>Likes get only updated if response was successfully</li>
      </ul>
      <Stack
        sx={{ my: 2 }}
        spacing={2}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <FeedbackButton
          loading={loading}
          label={`Like`}
          onClick={fetch}
          icon={<ThumbUp />}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Badge color="secondary" badgeContent={likes}>
            <ThumbUp />
          </Badge>
        )}
      </Stack>
    </Box>
  );
}
