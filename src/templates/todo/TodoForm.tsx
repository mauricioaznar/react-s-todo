import * as React from 'react';
import {useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {ApolloError} from "@apollo/client";
import {useFieldArray, useForm} from "react-hook-form";

// mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import {
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Tooltip
} from "@mui/material";
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";

// components
import {Query, useCreateTodoMutation, useUpdateTodoMutation} from "../../services/schema";
import {nameof} from "../../helpers/nameof";
import MauSnackbar from "../../components/MauSnackbar";
import ReactHookFormTextField from "../../components/inputs/react-hook-form/ReactHookFormTextField";
import ReactHookFormDatePicker from "../../components/inputs/react-hook-form/ReactHookFormDatePicker";
import ReactHookFormCheckbox from "../../components/inputs/react-hook-form/ReactHookFormCheckbox";
import {TodoNode} from "../../types/todo";

interface TodoItem {
    description: string;
    completed: boolean;

}

interface TodoFormInputs {
    description: string,
    due: string,
    completed: boolean,
    archived: boolean,
    locked: boolean,
    items: TodoItem[]
}

interface TodoFormLocationProps {
    todo?: TodoNode
}


export default function TodoForm() {

    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const history = useHistory()

    const location = useLocation<TodoFormLocationProps>()
    const todo = location.state?.todo

    const {handleSubmit, control} = useForm<TodoFormInputs>({
        defaultValues: {
            description: todo?.description || '',
            due: todo?.due || '',
            archived: todo?.archived || false,
            locked: todo?.locked || false,
            items: todo?.items || [
                {completed: false, description: ''}
            ],
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    const [createTodoMutation] = useCreateTodoMutation({
        update(cache) {
            cache.evict({
                id: "ROOT_QUERY",
                fieldName: nameof<Query>('todos')
            })
        },
    });

    const [updateTodoMutation] = useUpdateTodoMutation({
        update(cache) {
            cache.evict({
                id: "ROOT_QUERY",
                fieldName: nameof<Query>('todos')
            })
        },
    });

    const onSubmit = async (data: TodoFormInputs) => {
        const {description, due, locked, archived, items} = data

        setIsDisabled(true)

        const options = {
            todoInput: {
                description: description,
                locked: locked,
                archived: archived,
                due: due ? due.toString() : '',
                items: items.map( i => {
                    return {
                        description: i.description,
                        completed: i.completed
                    }
                })
            }
        }

        try {
            if (todo) {
                await updateTodoMutation(
                    {
                        variables: {
                            id: todo._id,
                            ...options
                        }
                    }
                )
            } else {
                await createTodoMutation({
                    variables: {
                        ...options
                    }
                })
            }

            history.push('/todos')

        } catch (e) {
            if (e instanceof ApolloError) {
                setMessage(e.message)
            }
        }

        setMessage('')
        setIsDisabled(false)
    }

    const onError = () => {
        //
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <PetsIcon/>
                </Avatar>
                <Typography variant="h4">
                    Todo
                </Typography>
                <Box sx={{mt: 1}}>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        <ReactHookFormTextField
                            rules={{
                                required: true,
                                minLength: 4
                            }}
                            label={'Description'}
                            control={control}
                            name="description"
                        />
                        <ReactHookFormDatePicker
                            rules={{
                                required: true,
                            }}
                            label={'Due'}
                            control={control}
                            name="due"
                        />
                        <ReactHookFormCheckbox
                            control={control}
                            name={'locked'}
                            label={'Locked'}
                            uncheckedIcon={LockOpenRoundedIcon}
                            checkedIcon={LockRoundedIcon}
                        />
                        <ReactHookFormCheckbox
                            control={control}
                            name={'archived'}
                            label={'Archived'}
                            checkedIcon={ArchiveIcon}
                            uncheckedIcon={UnarchiveOutlinedIcon}
                        />


                        <Grid
                            item
                            sx={{
                                mt: 2
                            }}
                            xs={12}
                        >
                            <Grid
                                container
                                direction={'column'}
                            >
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Toolbar
                                      disableGutters
                                    >
                                        <Typography
                                            sx={{
                                                flexGrow: 1
                                            }}
                                            variant="h6"
                                        >
                                            Items
                                        </Typography>
                                        <Tooltip title="Create todo">
                                            <IconButton
                                                aria-label="filter list"
                                                onClick={() => {
                                                    append({
                                                        description: "",
                                                        completed: false,
                                                    })
                                                }}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Toolbar>
                                    <TableContainer component={Paper}>
                                        <Table

                                            size={"small"}
                                            aria-label="credit notes table"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell width={'60%'}>Description</TableCell>
                                                    <TableCell width={'20%'}>Completed</TableCell>
                                                    <TableCell width={'20%'}>&nbsp;</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody >
                                                {fields.map((field, index) => (
                                                    <TableRow key={index} >
                                                        <TableCell>
                                                            <ReactHookFormTextField
                                                                size={"small"}
                                                                rules={{
                                                                    required: true,
                                                                    minLength: 4
                                                                }}
                                                                control={control}
                                                                name={`items.${index}.description`}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <ReactHookFormCheckbox
                                                                control={control}
                                                                name={`items.${index}.completed`}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton
                                                                aria-label="filter list"
                                                                onClick={() => {
                                                                    remove(index)
                                                                }}
                                                            >
                                                                <DeleteOutlineIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>

                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Button
                            disabled={isDisabled}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Box>
            <MauSnackbar
                message={message}
            />
        </Container>
    );
}
