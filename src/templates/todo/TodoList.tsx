import * as React from 'react'
import {useState} from 'react'
import {animated, config as springConfig, useTransition} from 'react-spring'
import {useHistory} from 'react-router-dom'

// icons
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import {Box, CircularProgress, Fab, IconButton, InputAdornment, TableSortLabel, Typography} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {DatePicker} from "@mui/lab";

// components
import {
    ColumnOrder,
    FilterTodoColumn,
    namedOperations,
    TodoEdge,
    useDeleteTodoMutation,
    useGetTodosQuery
} from "../../schema";
import MauSnackbar from "../../components/MauSnackbar";
import {ApolloError} from "@apollo/client";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {formatDate, YEAR_MONTH_FORMAT, YEAR_MONTH_MASK} from "../../helpers/format-date";
import {TodoNode} from "../../types/todo";
import LocalStorage from "../../helpers/local-storage";
import {useGraphqlPagination} from "../../hooks/useGraphqlPagination";
import moment from "moment";


// constants
const TODO_AFTER = 'todo_after'
const TODO_LIMIT = 'todo_limit'
const TODO_BEFORE = 'todo_before'
const TODO_DUE = 'todo_due'
const TODO_COMPLETED = 'todo_completed'


// month picker bug https://github.com/mui-org/material-ui/issues/28352

interface TodoListProps {
    archived?: boolean;
}

export default function TodoList(props: TodoListProps) {

    const { archived = false } = props

    const history = useHistory()


    const [order, setOrder] = React.useState<ColumnOrder>(ColumnOrder.Desc);
    const [orderBy, setOrderBy] = React.useState<FilterTodoColumn>(FilterTodoColumn.Id);

    const [completed, setCompleted] = useState(LocalStorage.getBoolean(TODO_COMPLETED))
    const [due, setDue] = useState<string | null>(LocalStorage.getMomentDate(TODO_DUE, YEAR_MONTH_FORMAT))

    const { limit, after, before, setBefore, setAfter, resetGraphqlPagination } = useGraphqlPagination({
        afterKey: TODO_AFTER,
        beforeKey: TODO_BEFORE,
        limitKey: TODO_LIMIT,
        limit: 10
    })

    const { loading, data, error } = useGetTodosQuery({
        variables: {
            archived: archived,
            completed: completed,
            due: due,
            limit: limit,
            after: after,
            before: before,
            order: order,
            orderBy: orderBy
        },
        onCompleted: () => {
            setFirstRender(false)
        }
    })

    const [firstRender, setFirstRender] = useState(true)

    const edges = data?.todos.page.edges

    const offset = data?.todos?.pageData?.offset || 0
    const count = data?.todos?.pageData?.count || 0

    const forwardDisabled = (data?.todos?.pageData) ? (offset >= count - (limit ? limit : 0)) : true



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

    function handleCreateClick() {
        history.push('/todoForm')
    }

    function handleOrderBy(event: React.MouseEvent<unknown>, property: FilterTodoColumn) {
        if (property !== orderBy) {
            setOrderBy(property)
            setOrder(ColumnOrder.Asc)
        } else if (property === orderBy && order === ColumnOrder.Asc) {
            setOrder(ColumnOrder.Desc)
        } else if (property === orderBy && order === null) {
            setOrder(ColumnOrder.Asc)
            setOrderBy(property)
        } else {
            setOrderBy(FilterTodoColumn.Id)
            setOrder(ColumnOrder.Desc)
        }
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
                                views={due ? ['month'] : ['year', 'month']}
                                mask={YEAR_MONTH_MASK}
                                inputFormat={YEAR_MONTH_FORMAT}
                                label={'Selected due'}
                                value={due}
                                clearable={true}
                                onChange={(newValue) => {
                                    if (moment.isMoment(newValue)) {
                                        const date = moment(newValue).format(YEAR_MONTH_FORMAT)
                                        setDue(date)
                                    } else {
                                        setDue(newValue)
                                    }
                                    LocalStorage.saveMomentDate(newValue, TODO_DUE, YEAR_MONTH_FORMAT)
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
                                                                    LocalStorage.removeItem(TODO_DUE)
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
                                    setBefore(newCursor)
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
                                    setAfter(newCursor)
                                }}
                            >
                                <ArrowForwardIosIcon fontSize={'medium'} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                sx={{ mr: 2 }}
                                onClick={() => {
                                    const newCompleted = !completed
                                    LocalStorage.saveBoolean(newCompleted, TODO_COMPLETED)
                                    setCompleted(newCompleted)
                                    resetGraphqlPagination()
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
                                <TableRow>
                                    <TableCell width={'10%'}>&nbsp;</TableCell>
                                    <SortableHead
                                        onRequestSort={handleOrderBy}
                                        order={order}
                                        title={FilterTodoColumn.Description}
                                        orderBy={orderBy}
                                        width={'30%'}
                                    />
                                    <SortableHead
                                        onRequestSort={handleOrderBy}
                                        order={order}
                                        title={FilterTodoColumn.Due}
                                        orderBy={orderBy}
                                        width={'20%'}
                                    />
                                    <TableCell width={'10%'}>Completed</TableCell>
                                    <TableCell width={'20%'}>User</TableCell>
                                    <TableCell width={'10%'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    loading
                                        ? <TableRow>
                                            <TableCell colSpan={5} align={'center'} sx={{ py: 4 }}>
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                        : transitions((styles: any, todo: any) => {
                                            const todoItem = todo as { node: any }
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


interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: FilterTodoColumn) => void;
    order: ColumnOrder;
    orderBy: FilterTodoColumn |  null;
    title: FilterTodoColumn;
    width?: string;

}

function SortableHead (props: EnhancedTableProps) {
    const { onRequestSort, order, orderBy, title, width } = props

    const createSortHandler =
        (property: FilterTodoColumn) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableCell
            width={width ? width : 'auto'}
            sortDirection={orderBy === title && order !== null ? order : false}
        >
            <TableSortLabel
                active={orderBy === title}
                direction={orderBy === title && order !== null ? order : 'asc'}
                onClick={createSortHandler(title)}
            >
                {title}
            </TableSortLabel>
        </TableCell>
    )
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

    function handleEditClick(todo: TodoNode) {
        history.push('/todoForm', {todo})
    }

    // functions and flow control

    async function handleDeleteClick(todo: TodoNode) {
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
            <TableCell>{ todo.completed_percentage }</TableCell>
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
