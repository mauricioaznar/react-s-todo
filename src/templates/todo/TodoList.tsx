import * as React from 'react'
import {useState} from 'react'
import {animated, config as springConfig, useTransition} from 'react-spring'
import {useHistory} from 'react-router-dom'

// mui
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Fab,
    IconButton,
    ListItem,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

// local
import {ColumnOrder, FilterTodoColumn, TodoEdge, useGetTodosQuery} from "../../services/schema";
import MauSnackbar from "../../components/MauSnackbar";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {formatDate, YEAR_MONTH_FORMAT, YEAR_MONTH_MASK} from "../../helpers/format-date";
import {TodoEdges, TodoNode} from "../../types/todo";
import LocalStorage from "../../helpers/local-storage";
import {useGraphqlPagination} from "../../hooks/useGraphqlPagination";
import {EnhancedContainerProps} from "../../components/enhanced-table/types";
import EnhancedTableHead from "../../components/enhanced-table/enhanced-table-head";
import ClearableDatePicker from "../../components/clearable-date-picker/clearable-date-picker";
import {useMenu} from "../../hooks/useMenu";
import {useDeleteTodo} from "./hooks/useDeleteTodo";
import {useEditTodoClick} from "./hooks/useEditTodoClick";
import PageLoader from "../../components/loaders/PageLoader";


// constants
const TODO_AFTER = 'todo_after'
const TODO_LIMIT = 'todo_limit'
const TODO_BEFORE = 'todo_before'
const TODO_DUE = 'todo_due'
const TODO_COMPLETED = 'todo_completed'
const TODO_VIEW = 'todo_view'


interface TodoListProps {
    archived?: boolean;
}

export default function TodoList({archived = false}: TodoListProps) {

    const history = useHistory()

    const [order, setOrder] = React.useState<ColumnOrder>(ColumnOrder.Desc);
    const [orderBy, setOrderBy] = React.useState<FilterTodoColumn>(FilterTodoColumn.Id);
    const [view, setView] = React.useState(LocalStorage.getBoolean(TODO_VIEW))
    const [completed, setCompleted] = useState(LocalStorage.getBoolean(TODO_COMPLETED))
    const [due, setDue] = useState<string | null>(LocalStorage.getMomentDate(TODO_DUE, YEAR_MONTH_FORMAT))
    const [firstRender, setFirstRender] = useState(true)

    const {handleClick, handleClose, open, anchorEl} = useMenu()


    const {limit, after, before, setBefore, setAfter, resetGraphqlPagination} = useGraphqlPagination({
        afterKey: TODO_AFTER,
        beforeKey: TODO_BEFORE,
        limitKey: TODO_LIMIT,
        limit: 10
    })

    const {loading, data, error} = useGetTodosQuery({
        variables: {
            archived: archived,
            completed: archived ? null : completed,
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

    const edges = data?.todos.page.edges
    const offset = data?.todos?.pageData?.offset || 0
    const count = data?.todos?.pageData?.count || 0
    const forwardDisabled = (data?.todos?.pageData) ? (offset >= count - (limit ? limit : 0)) : true

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
                        <Grid item>
                            <IconButton
                                disabled={data?.todos?.pageData?.offset === 0}
                                onClick={() => {
                                    const newCursor = edges && edges.length > 0 ? edges[0].cursor : null;
                                    setBefore(newCursor)
                                }}
                            >
                                <ArrowBackIosIcon fontSize={'medium'}/>
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
                                <ArrowForwardIosIcon fontSize={'medium'}/>
                            </IconButton>
                        </Grid>
                        {/* MENU */}
                        <Grid item>
                            <IconButton
                                id="demo-positioned-button"
                                aria-controls="demo-positioned-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <ListItem>
                                    <ClearableDatePicker
                                        views={due ? ['month'] : ['year', 'month']}
                                        mask={YEAR_MONTH_MASK}
                                        inputFormat={YEAR_MONTH_FORMAT}
                                        label={'Selected due'}
                                        value={due}
                                        onChange={(newValue) => {
                                            setDue(newValue)
                                            if (newValue !== null) {
                                                LocalStorage.saveMomentDate(newValue, TODO_DUE, YEAR_MONTH_FORMAT)
                                            } else {
                                                LocalStorage.removeItem(TODO_DUE)
                                            }

                                        }}
                                    />
                                </ListItem>
                                {
                                    !archived
                                        ? <MenuItem
                                            onClick={() => {
                                                const newCompleted = !completed
                                                LocalStorage.saveBoolean(newCompleted, TODO_COMPLETED)
                                                setCompleted(newCompleted)
                                                resetGraphqlPagination()
                                            }}
                                        >
                                            <ListItemIcon

                                            >
                                                {
                                                    completed
                                                        ? <CheckBoxIcon fontSize={'medium'}/>
                                                        : <CheckBoxOutlineBlankIcon fontSize={'medium'}/>
                                                }

                                            </ListItemIcon>
                                            {
                                                completed ? 'Completed' : "Uncompleted"
                                            }
                                        </MenuItem>
                                        : null
                                }
                                <MenuItem
                                    sx={{display: 'flex', alignItems: 'center'}}
                                    onClick={() => {
                                        const newView = !view
                                        LocalStorage.saveBoolean(newView, TODO_VIEW)
                                        setView(newView)
                                    }}
                                >

                                    <ListItemIcon>
                                        {
                                            view
                                                ? <ViewModuleIcon fontSize={'medium'}/>
                                                : <ViewHeadlineIcon fontSize={'medium'}/>
                                        }
                                    </ListItemIcon>
                                    {
                                        view ? 'Cards' : 'Table'
                                    }
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {
                        loading
                            ? <PageLoader />
                            : view
                                ? <EnhancedTodoCards
                                    edges={edges}
                                    onRequestSort={handleOrderBy}
                                    order={order}
                                    orderBy={orderBy}
                                    firstRender={firstRender}
                                />
                                : <EnhancedTodoTable
                                    edges={edges}
                                    onRequestSort={handleOrderBy}
                                    order={order}
                                    orderBy={orderBy}
                                    firstRender={firstRender}
                                />
                    }
                </Grid>
            </Grid>

            <MauSnackbar
                message={error ? error.message : ''}
            />
            <Fab

                sx={{
                    margin: 0,
                    top: 'auto',
                    right: 20,
                    bottom: 20,
                    position: 'fixed',
                    left: 'auto'
                }}
                size={'large'} color="primary" aria-label="add" onClick={handleCreateClick}>
                <AddIcon/>
            </Fab>
        </Container>
    );
}


export interface EnhancedTodoContainerProps<T> extends EnhancedContainerProps<T> {
    firstRender: boolean;
    edges: TodoEdges | undefined | null;
}


function EnhancedTodoCards(props: EnhancedTodoContainerProps<FilterTodoColumn>) {
    const {edges} = props

    const transitions = useTransition(edges, {
        keys: (item: unknown) => {
            const todo = item as TodoEdge
            return todo.node?._id!
        },
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0},
        order: ['enter', 'update', 'leave'],
        trail: 150,
        config: springConfig.gentle,
    })

    const AnimatedGridItem = animated(Grid)

    return <Grid container>
        {

            transitions((styles: any, todo: any) => {
                const todoItem = todo as { node: any }
                const todoNode = todoItem.node as TodoNode
                return (
                    todo && <AnimatedGridItem
                        style={styles}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        sx={{
                            px: {sm: 2, md: 4},
                            py: {xs: 2, sm: 2, md: 0}
                        }}
                    >
                        <TodoCard todo={todoNode}/>
                    </AnimatedGridItem>
                )
            })
        }
    </Grid>;
}


function TodoCard({todo}: { todo: TodoNode }) {

    const {currentUser} = useTypedSelector(
        (state) => state.auth
    )


    const {handleEditTodoClick} = useEditTodoClick()

    const {message, isDisabled, handleDeleteClick} = useDeleteTodo()


    return (

        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {todo.description}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    <span style={{fontStyle: 'normal', fontWeight: 'bold'}}> due: </span>
                    {
                        formatDate(todo.due)
                    }
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'nowrap'
                    }}
                >

                </Box>
                <Typography variant="body2">
                    <span style={{fontStyle: 'normal', fontWeight: 'bold'}}> user: </span> {todo.user?.username}
                </Typography>
                <ul>
                    {
                        todo?.items.map(item => (
                            <li style={{textDecoration: item.completed ? 'line-through' : undefined}}
                                key={item.description}>{item.description}</li>
                        ))
                    }
                </ul>
            </CardContent>
            <CardActions style={{display: 'flex', alignItems: 'center'}}>
                {
                    currentUser?._id === todo.user?._id ? <Button
                        size={'small'}
                        onClick={() => {
                            handleEditTodoClick(todo)
                        }}>
                        Edit
                    </Button> : null

                }
                {
                    currentUser?._id === todo.user?._id ? <Button
                        disabled={isDisabled}
                        size={'small'}
                        onClick={async () => {
                            await handleDeleteClick(todo)
                        }}>
                        Delete
                    </Button> : null
                }
                <Box style={{flexGrow: 1, display: 'flex', justifyContent: 'end'}}>
                    {
                        todo.locked
                            ? <LockRoundedIcon fontSize={'medium'}/>
                            : <LockOpenRoundedIcon fontSize={'medium'}/>
                    }
                </Box>
            </CardActions>
            <MauSnackbar
                message={message}
            />
        </Card>
    );
}


function EnhancedTodoTable(props: EnhancedTodoContainerProps<FilterTodoColumn>) {
    const {onRequestSort, order, orderBy, firstRender, edges} = props


    // enter and leave overlapping
    // https://github.com/pmndrs/react-spring/issues/1064
    const transitions = useTransition(edges, {
        keys: (item: unknown) => {
            const todo = item as TodoEdge
            return todo.node?._id!
        },
        from: {opacity: 0, x: firstRender ? '0%' : '10%'},
        enter: {opacity: 1, x: '0%',},
        leave: {opacity: 0, x: '10%'},
        order: ['enter', 'update', 'leave'],
        trail: 150,
        config: springConfig.gentle,
    })


    const AnimatedTableRow = animated(TableRow)

    return (
        <TableContainer component={Paper} sx={{overflowY: 'hidden', overflowX: 'hidden'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={'10%'}>&nbsp;</TableCell>
                        <EnhancedTableHead
                            onRequestSort={onRequestSort}
                            order={order}
                            title={FilterTodoColumn.Description}
                            orderBy={orderBy}
                            width={'30%'}
                        />
                        <EnhancedTableHead
                            onRequestSort={onRequestSort}
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
                        transitions((styles: any, todo: any) => {
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
    )
}


function TodoCells({todo}: { todo: TodoNode }) {

    const {currentUser} = useTypedSelector(
        (state) => state.auth
    )


    const {handleEditTodoClick} = useEditTodoClick()

    const {message, isDisabled, handleDeleteClick} = useDeleteTodo()

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
                            ? <LockRoundedIcon fontSize={'medium'}/>
                            : <LockOpenRoundedIcon fontSize={'medium'}/>
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
            <TableCell>{todo.completed_percentage}</TableCell>
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
                                handleEditTodoClick(todo)
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
