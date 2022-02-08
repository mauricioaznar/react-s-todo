import React from "react";
import { Box, CircularProgress, Grid } from "@mui/material";

const BigLoader = () => {
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        sx={{ height: "100%" }}
        alignItems={"center"}
      >
        <Grid item>
          <CircularProgress size={100} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BigLoader;
