import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {
  GetNotesQuery,
  Query,
  useDeleteNoteMutation,
  useGetNotesQuery,
} from "../../../../services/schema";
import { Box, Container, Fab, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PageLoader from "../../../dum/loaders/page-loader";
import { useHistory } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { NoteNode } from "../../../../types/note";
import Grid from "@mui/material/Grid";
import { OffsetPaginatorArrows } from "./components/offset-paginator-arrows";
import { nameof } from "../../../../helpers/nameof";

export default function NoteList() {
  const history = useHistory();

  const [perPage] = useState(10);
  const [page, setPage] = useState(1);

  const { data, loading } = useGetNotesQuery({
    variables: {
      offset: (page - 1) * perPage,
      limit: perPage,
    },
  });

  function handleCreateClick() {
    history.push("/noteForm");
  }

  const notes = data?.notes?.notes;
  const count = data?.notes?.count || 0;

  return loading ? (
    <PageLoader />
  ) : (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container alignItems={"center"} mb={2}>
        <Grid item xs>
          <Typography variant={"h4"}>Notes</Typography>
        </Grid>
        <Grid item>
          <OffsetPaginatorArrows
            setPage={setPage}
            count={count}
            perPage={perPage}
            page={page}
          />
        </Grid>
      </Grid>
      <NoteTable notes={notes} />
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
    </Container>
  );
}

interface NoteTableProps {
  notes?: GetNotesQuery["notes"]["notes"];
}

function NoteTable(props: NoteTableProps) {
  const { notes } = props;

  const history = useHistory();

  const [disabled, setDisabled] = useState(false);

  function handleEditClick(note: NoteNode) {
    history.push("/noteForm", {
      note,
    });
  }

  const [deleteNoteMutation] = useDeleteNoteMutation({
    update(cache) {
      cache.evict({
        id: "ROOT_QUERY",
        fieldName: nameof<Query>("notes"),
      });
    },
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

  return (
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
  );
}
