import React from "react";
import { Box, Stack, useTheme } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

export default function NoteForm() {
  const [value, setValue] = React.useState<string | undefined>(
    "**Hello world!!!**"
  );

  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      spacing={2}
      justifyContent={"stretch"}
      alignItems={"stretch"}
    >
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <Box sx={{ flex: "1 0 50%" }}>
        <MDEditor
          className={"custom-editor"}
          value={value}
          hideToolbar
          height={800}
          onChange={setValue}
          preview={"edit"}
          visiableDragbar={false}
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            minHeight: "100%",
          }}
          textareaProps={{
            style: { color: "white", minHeight: "100%", height: "100%" },
          }}
        />
      </Box>
      <Box sx={{ flex: "1 0 50%", wordWrap: "break-word" }}>
        <MDEditor.Markdown
          source={value}
          style={{ height: "771px", overflowY: "auto" }}
        />
      </Box>
    </Stack>
  );
}
