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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

// components
import {useHistory} from 'react-router-dom'
import {Box, CircularProgress, Fab, IconButton, InputAdornment, Typography} from "@mui/material";
import {GetTodosQuery, namedOperations, Todo, TodoEdge, useDeleteTodoMutation, useGetTodosQuery} from "../../schema";
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
import {DATE_FORMAT, DATE_MASK, formatDate} from "../../helpers/format-date";
import {DatePicker} from "@mui/lab";
import moment from "moment";
import TextField from "@mui/material/TextField";


type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
};


type TodoEdges = Exclude<Concrete<GetTodosQuery['todos']['page']['edges']>, null | undefined>
type TodoItem = TodoEdges[number]
type TodoNode = Exclude<TodoEdges[number]['node'], null | undefined>

const TODO_AFTER = 'todo_after'
const TODO_FIRST = 'todo_first'
const TODO_LAST = 'todo_last'
const TODO_BEFORE = 'todo_before'
const TODO_DUE = 'todo_due'
const TODO_ARCHIVED = 'todo_archived'
const TODO_COMPLETED = 'todo_completed'

export default function TodoList() {

    const history = useHistory()

    const [completed, setCompleted] = useState(window.localStorage.getItem(TODO_COMPLETED) === 'true')
    const [archived, setArchived] = useState(window.localStorage.getItem(TODO_ARCHIVED) === 'true')
    const [after, setAfter] = useState<null | string | undefined>(window.localStorage.getItem(TODO_AFTER) || null)
    const [first, setFirst] = useState<number | null | undefined>(window.localStorage.getItem(TODO_FIRST) ? Number(window.localStorage.getItem(TODO_FIRST)) : null)
    const [before, setBefore] = useState<null | string | undefined>(window.localStorage.getItem(TODO_BEFORE) || null)
    const [last, setLast] = useState<number | null | undefined>(window.localStorage.getItem(TODO_LAST) ? Number(window.localStorage.getItem(TODO_LAST)) : null)
    const [due, setDue] = useState<string | null>(window.localStorage.getItem(TODO_DUE) || null)

    const { loading, data, error } = useGetTodosQuery({
        variables: {
            archived: archived,
            completed: completed,
            due: due,
            first: first,
            last: last,
            after: after,
            before: before
        },
        onCompleted: () => {
            setFirstRender(false)
        }
    })


    const [firstRender, setFirstRender] = useState(true)

    const edges = data?.todos.page.edges

    const offset = data?.todos?.pageData?.offset || 0
    const count = data?.todos?.pageData?.count || 0
    const limit = data?.todos?.pageData?.limit || 0

    const forwardDisabled = (data?.todos?.pageData) ? (offset >= count - limit) : true



    // enter and leave overlapping
    // https://github.com/pmndrs/react-spring/issues/1064
    const transitions = useTransition( edges, {
        keys: (item: unknown) => {
            const todo = item as TodoEdge
            return todo.node?._id!
        },
        from: { opacity: 0, x: firstRender ? '0%' : '10%' },
        enter: { opacity: 1, x: '0%', },
        leave: { opacity: 0, x: '10%' },
        order: ['enter', 'update', 'leave'],
        trail: 150,
        config: springConfig.gentle,
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
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item sx={{ mr: 2 }}>
                            <DatePicker
                                mask={DATE_MASK}
                                inputFormat={DATE_FORMAT}
                                label={'Selected due'}
                                value={due}
                                clearable={true}
                                onChange={(newValue) => {
                                    if (moment.isMoment(newValue)) {
                                        const newDue = newValue.format(DATE_FORMAT)
                                        setDue(newDue);
                                        window.localStorage.setItem(TODO_DUE, newDue)
                                    } else {
                                        if (newValue) {
                                            window.localStorage.setItem(TODO_DUE, newValue)
                                        } else {
                                            window.localStorage.removeItem(TODO_DUE)
                                        }
                                        setDue(newValue);
                                    }
                                }}
                                renderInput={({InputProps, ...params}) => {
                                    return (
                                        <TextField
                                            {...params}
                                            color={'primary'}
                                            margin="normal"
                                            fullWidth
                                            label={'Due'}
                                            InputProps={{
                                                endAdornment: <>
                                                    {
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => {
                                                                    setDue(null)
                                                                    window.localStorage.removeItem(TODO_DUE)
                                                                }}
                                                                edge="end"
                                                                disabled={!due}
                                                            >
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    {
                                                        InputProps?.endAdornment
                                                    }
                                                </>
                                            }}
                                        />
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton
                                disabled={data?.todos?.pageData?.offset === 0}
                                onClick={() => {
                                    const newCursor = edges && edges.length > 0 ? edges[0].cursor : null;
                                    setAfter(null)
                                    window.localStorage.removeItem(TODO_AFTER)
                                    setFirst(null)
                                    window.localStorage.removeItem(TODO_FIRST)
                                    const newLast = 5
                                    setLast(newLast)
                                    window.localStorage.setItem(TODO_LAST, newLast.toString())
                                    setBefore(newCursor)
                                    if (newCursor) {
                                        window.localStorage.setItem(TODO_BEFORE, newCursor)
                                    } else {
                                        window.localStorage.removeItem(TODO_BEFORE)
                                    }
                                }}
                            >
                                <ArrowBackIosIcon fontSize={'medium'} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                disabled={forwardDisabled}
                                onClick={() => {
                                    const newCursor = edges && edges.length > 0 ? edges[edges.length - 1].cursor : null;
                                    setBefore(null)
                                    window.localStorage.removeItem(TODO_BEFORE)
                                    setLast(null)
                                    window.localStorage.removeItem(TODO_LAST)
                                    const newFirst = 5
                                    setFirst(newFirst)
                                    window.localStorage.setItem(TODO_FIRST, newFirst.toString())
                                    setAfter(newCursor)
                                    if (newCursor) {
                                        window.localStorage.setItem(TODO_AFTER, newCursor)
                                    } else {
                                        window.localStorage.removeItem(TODO_AFTER)
                                    }
                                }}
                            >
                                <ArrowForwardIosIcon fontSize={'medium'} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                sx={{ mr: 2 }}
                                onClick={() => {
                                    const newArchived = !archived
                                    window.localStorage.setItem(TODO_ARCHIVED, newArchived ? 'true' : 'false')
                                    setArchived(newArchived)
                                    window.localStorage.removeItem(TODO_BEFORE)
                                    setBefore(null)
                                    window.localStorage.removeItem(TODO_LAST)
                                    setLast(null)
                                    const newFirst = 5
                                    setFirst(newFirst)
                                    window.localStorage.setItem(TODO_FIRST, newFirst.toString())
                                    setAfter(null)
                                    window.localStorage.removeItem(TODO_AFTER)
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
                            <IconButton
                                sx={{ mr: 2 }}
                                onClick={() => {
                                    const newCompleted = !completed
                                    window.localStorage.setItem(TODO_COMPLETED, newCompleted ? 'true' : 'false')
                                    setCompleted(newCompleted)
                                }}
                            >
                                {
                                    completed
                                        ? <CheckBoxIcon fontSize={'medium'} />
                                        : <CheckBoxOutlineBlankIcon fontSize={'medium'} />
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
                                        : transitions((styles: any, todo: any) => {
                                            const todoItem = todo as TodoItem
                                            const todoNode = todoItem.node as TodoNode
                                            return (
                                                todo && <AnimatedTableRow style={styles}>
                                                    <TodoCells todo={todoNode}/>
                                                </AnimatedTableRow>
                                            )
                                        })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <MauSnackbar
                message={error ? error.message : ''}
            />
        </Container>
    );
}


function TodoCells({todo}: { todo: TodoNode }) {

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
