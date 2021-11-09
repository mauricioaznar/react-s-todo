import * as React from 'react'
import {useState} from 'react'
import {animated, config as springConfig, useTransition} from 'react-spring'

// icons
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import ArchiveIcon from '@mui/icons-material/Archive';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ForwardIcon from '@mui/icons-material/Forward';

// components
import {useHistory} from 'react-router-dom'
import {Box, CircularProgress, Fab, IconButton, Typography} from "@mui/material";
import {namedOperations, Todo, TodoEdge, useDeleteTodoMutation, useGetTodosQuery} from "../../schema";
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

    const [archived, setArchived] = useState(window.localStorage.getItem('archived') === 'true')
    const [after, setAfter] = useState<null | string | undefined>(null)

    const { loading, data } = useGetTodosQuery({
        variables: {
            archived: archived,
            first: 5,
            after: after
        },
        onCompleted: () => {
            setFirst(false)
        }
    })

    const [first, setFirst] = useState(true)

    const edges = data?.todos.page.edges

    // enter and leave overlapping
    // https://github.com/pmndrs/react-spring/issues/1064
    const transitions = useTransition( edges, {
        keys: (item: unknown) => {
            const todo = item as TodoEdge
            return todo.cursor!
        },
        from: { opacity: 0, x: first ? '0%' : '10%' },
        enter: { opacity: 1, x: '0%', },
        leave: { opacity: 0, x: '10%' },
        trail: 150,
        config: springConfig.default,
    })


    // useTodoSubscription(
    //     {
    //         onSubscriptionData(options) {
    //             options.client.refetchQueries({include: [namedOperations.Query.GetTodos]})
    //         },
    //
    //     }
    // );

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
                    <Grid container spacing={2}>
                        <Grid item>
                            <IconButton
                                disabled={!data?.todos.page.pageInfo?.hasNextPage}
                                onClick={() => {
                                    const newCursor = edges && edges.length > 0 ? edges[edges.length - 1].cursor : null;
                                    setAfter(newCursor)
                                }}
                            >
                                <ForwardIcon fontSize={'medium'} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                onClick={() => {
                                    const newArchived = !archived
                                    window.localStorage.setItem('archived', newArchived ? 'true' : 'false')
                                    setArchived(newArchived)
                                    setAfter(null)
                                }}
                            >
                                {
                                    archived
                                        ? <ArchiveIcon fontSize={'medium'} />
                                        : <ArchiveOutlinedIcon fontSize={'medium'} />
                                }
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Fab size={'small'} color="primary" aria-label="add" onClick={handleCreateClick}>
                                <AddIcon/>
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{overflowY: 'hidden', overflowX: 'hidden'}}>
                        <Table>
                            <TableHead>
                                <TableRow
                                >
                                    <TableCell width={'10%'}>&nbsp;</TableCell>
                                    <TableCell width={'30%'}>Description</TableCell>
                                    <TableCell width={'20%'}>Due</TableCell>
                                    <TableCell width={'10%'}>Completed</TableCell>
                                    <TableCell width={'20%'}>User</TableCell>
                                    <TableCell width={'10%'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    loading && first
                                        ? <TableRow>
                                            <TableCell colSpan={5} align={'center'} sx={{ py: 4 }}>
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                        : transitions((styles, todo) => {
                                            return (
                                                todo && <AnimatedTableRow style={styles}>
                                                    <TodoCells todoEdge={todo}/>
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


function TodoCells({todoEdge}: { todoEdge: TodoEdge }) {

    // hooks

    const todo = todoEdge.node!

    const {currentUser} = useTypedSelector(
        (state) => state.auth
    )

    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')
    const [deleteTodoMutation] = useDeleteTodoMutation({
        refetchQueries: [namedOperations.Query.GetTodos]
    })
    const history = useHistory()

    function handleEditClick(todo: Todo) {
        history.push('/todoForm', {todo})
    }

    // functions and flow control

    async function handleDeleteClick(todo: Todo) {
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
        setMessage('')
        setIsDisabled(false)
    }

    return (
        <React.Fragment>
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
                        todo.locked
                            ? <LockRoundedIcon fontSize={'medium'} />
                            : <LockOpenRoundedIcon fontSize={'medium'} />
                    }
                </Box>

            </TableCell>
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
                message={message}
            />
        </React.Fragment>
    );
}
