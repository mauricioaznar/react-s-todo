import React from "react";
import { Box, CircularProgress, Grid } from "@mui/material";

const PageLoader = () => {
  return (
    <Box sx={{ height: "300px" }}>
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        sx={{ height: "100%" }}
        alignItems={"center"}
      >
        <Grid item>
          <CircularProgress size={40} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageLoader;
