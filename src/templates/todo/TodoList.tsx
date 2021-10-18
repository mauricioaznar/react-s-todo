
import * as React from 'react'
import {useState} from 'react'

// icons
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from '@mui/icons-material/Delete';


// components
import {useHistory} from 'react-router-dom'
import {Fab, IconButton} from "@mui/material";
import {GetTodosQuery, namedOperations, useDeleteTodoMutation, useGetTodosQuery} from "../../schema";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";


export default function TodoList() {
    const history = useHistory()
    const {data, loading} = useGetTodosQuery()

    if (loading) {
        return <h1>Loading</h1>;
    }


    function handleCreateClick() {
        history.push('/todoForm')
    }


    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container alignItems={'center'}>
                <Grid item xs>
                    <h2>
                        Todos
                    </h2>
                </Grid>
                <Grid item>
                    <Fab size={'small'} color="primary" aria-label="add" onClick={handleCreateClick}>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.todos.map((todo) => (
                                    <TodoRow
                                        key={todo._id}
                                        todo={todo}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
}


function TodoRow({todo}: { todo: GetTodosQuery["todos"][number] }) {
    const [isDisabled, setDisabled] = useState(false)

    const [deleteTodoMutation] = useDeleteTodoMutation({
        refetchQueries: [namedOperations.Query.GetTodos]
    })

    const history = useHistory()

    function handleEditClick(todo: GetTodosQuery["todos"][number]) {
        history.push('/todoForm', {todo})
    }


    async function onDelete(todo: GetTodosQuery["todos"][number]) {
        setDisabled(true)
        await deleteTodoMutation({
            variables: {
                id: todo._id
            }
        })
    }

    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell>
                {todo.description}
            </TableCell>
            <TableCell>
                {todo.user?.username}
            </TableCell>
            <TableCell>
                <IconButton
                    size={'small'}
                    onClick={() => {
                        handleEditClick(todo)
                    }}>
                    <CreateIcon fontSize={'small'}/>
                </IconButton>
                <IconButton
                    disabled={isDisabled}
                    size={'small'}
                    onClick={() => {
                        onDelete(todo)
                    }}>
                    <DeleteIcon fontSize={'small'}/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
