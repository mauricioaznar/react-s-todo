import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {
  namedOperations,
  useDeleteNoteMutation,
  useGetNotesQuery,
} from "../../../../services/schema";
import { Box, Fab, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PageLoader from "../../../dum/loaders/page-loader";
import { useHistory } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { NoteNode } from "../../../../types/note";

export default function NoteList() {
  const history = useHistory();

  const { data, loading } = useGetNotesQuery();

  const [disabled, setDisabled] = useState(false);

  function handleCreateClick() {
    history.push("/noteForm");
  }

  function handleEditClick(note: NoteNode) {
    history.push("/noteForm", {
      note,
    });
  }

  const [deleteNoteMutation] = useDeleteNoteMutation({
    refetchQueries: [namedOperations.Query.GetNotes],
  });

  const handleDeleteMutation = async (id: number) => {
    setDisabled(true);
    try {
      await deleteNoteMutation({
        variables: {
          id,
        },
      });
    } catch (e) {
      console.error(e);
    }

    setDisabled(false);
  };

  const notes = data?.notes;

  return loading ? (
    <PageLoader />
  ) : (
    <Box>
      <Fab
        sx={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          position: "fixed",
          left: "auto",
        }}
        size={"large"}
        color="primary"
        aria-label="add"
        onClick={handleCreateClick}
      >
        <AddIcon />
      </Fab>
      <TableContainer
        component={Paper}
        sx={{ overflowY: "hidden", overflowX: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={"45%"}>Title</TableCell>
              <TableCell width={"45%"}>Author</TableCell>
              <TableCell width={"10%"}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes
              ? notes.map((n) => {
                  return (
                    <TableRow key={n.id}>
                      <TableCell>{n.title}</TableCell>
                      <TableCell>{n.author?.username}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "nowrap",
                          }}
                        >
                          <IconButton
                            size={"small"}
                            onClick={() => {
                              handleEditClick(n);
                            }}
                          >
                            <CreateIcon fontSize={"small"} />
                          </IconButton>
                          <IconButton
                            disabled={disabled}
                            size={"small"}
                            onClick={async () => {
                              await handleDeleteMutation(n.id);
                            }}
                          >
                            <DeleteIcon fontSize={"small"} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
