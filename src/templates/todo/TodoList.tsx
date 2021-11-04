import * as React from 'react'
import {useState} from 'react'
import {animated, config as springConfig, useTransition} from 'react-spring'

// icons
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

// components
import {useHistory} from 'react-router-dom'
import {Box, CircularProgress, Fab, IconButton, Typography} from "@mui/material";
import {
    GetTodosQuery,
    namedOperations,
    useDeleteTodoMutation,
    useGetTodosQuery,
    useTodoSubscription
} from "../../schema";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MauSnackbar from "../../components/MauSnackbar";
import {ApolloError} from "@apollo/client";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {formatDate} from "../../helpers/format-date";


export default function TodoList() {

    // hooks

    const history = useHistory()

    const { loading, data } = useGetTodosQuery({
        onCompleted: () => {
            setFirst(false)
        }
    })

    const [first, setFirst] = useState(true)

    const transitions = useTransition(data?.todos, {
        keys: (item: unknown) => {
            const todo = item as GetTodosQuery["todos"][number]
            return todo._id
        },
        from: { opacity: 0, x: first ? '0%' : '10%' },
        enter: { opacity: 1,  x: '0%' },
        leave: { opacity: 0, x: '10%'},
        config: springConfig.gentle,
    })

    useTodoSubscription(
        {
            onSubscriptionData(options) {
                options.client.refetchQueries({include: [namedOperations.Query.GetTodos]})
            },

        }
    );

    function handleCreateClick() {
        history.push('/todoForm')
    }

    const AnimatedTableRow = animated(TableRow)

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container alignItems={'center'} mb={2}>
                <Grid item xs>
                    {
                        <Typography variant={'h4'}>Todos</Typography>

                    }
                </Grid>
                <Grid item>
                    <Fab size={'small'} color="primary" aria-label="add" onClick={handleCreateClick}>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{overflowY: 'hidden', overflowX: 'hidden'}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={'30%'}>Description</TableCell>
                                    <TableCell width={'20%'}>Due</TableCell>
                                    <TableCell width={'20%'}>Completed</TableCell>
                                    <TableCell width={'20%'}>User</TableCell>
                                    <TableCell width={'10%'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    loading
                                        ? <TableRow>
                                            <TableCell colSpan={5} align={'center'} sx={{
                                                py: 4
                                            }}>
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                        : transitions((styles, todo) => {
                                            return (
                                                todo && <AnimatedTableRow style={styles}>
                                                    <TodoCells todo={todo}/>
                                                </AnimatedTableRow>
                                            )
                                        })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
}


function TodoCells({todo}: { todo: GetTodosQuery["todos"][number] }) {

    // hooks

    const {currentUser} = useTypedSelector(
        (state) => state.auth
    )

    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')
    const [deleteTodoMutation] = useDeleteTodoMutation({
        refetchQueries: [namedOperations.Query.GetTodos]
    })
    const history = useHistory()

    function handleEditClick(todo: GetTodosQuery["todos"][number]) {
        history.push('/todoForm', {todo})
    }

    // functions and flow control

    async function handleDeleteClick(todo: GetTodosQuery["todos"][number]) {
        setIsDisabled(true)
        try {
            await deleteTodoMutation({
                variables: {
                    id: todo._id
                }
            })
        } catch (e) {
            if (e instanceof  ApolloError) {
                setMessage(e.message)
            }
        }
    }

    return (
        <React.Fragment>
            <TableCell>
                {todo.description}
            </TableCell>
            <TableCell>
                {
                    formatDate(todo.due)
                }
            </TableCell>
            <TableCell
                align={'center'}
            >
                <Box
                    sx={{
                        '& > :not(style)': {
                            m: 2,
                        },
                    }}
                >
                    {
                        todo.completed
                        ? <CheckBoxIcon fontSize={'medium'} />
                        : <CheckBoxOutlineBlankIcon fontSize={'medium'} />
                    }
                </Box>

            </TableCell>
            <TableCell>
                {todo.user?.username}
            </TableCell>
            <TableCell>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'nowrap'
                    }}
                >
                    {
                        currentUser?._id === todo.user?._id ? <IconButton
                            size={'small'}
                            onClick={() => {
                                handleEditClick(todo)
                            }}>
                            <CreateIcon fontSize={'small'}/>
                        </IconButton> : null

                    }
                    {
                        currentUser?._id === todo.user?._id ? <IconButton
                            disabled={isDisabled}
                            size={'small'}
                            onClick={async () => {
                                await handleDeleteClick(todo)
                            }}>
                            <DeleteIcon fontSize={'small'}/>
                        </IconButton> : null
                    }
                </Box>
            </TableCell>
            <MauSnackbar
                onClose={() => {
                    setIsDisabled(false)
                    setMessage('')
                }}
                message={message}
            />
        </React.Fragment>
    );
}
