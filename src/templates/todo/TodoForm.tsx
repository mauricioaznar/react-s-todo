import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {GetTodosQuery, Query, useCreateTodoMutation, useUpdateTodoMutation} from "../../schema";
import {useHistory} from "react-router-dom";
import {nameof} from "../../helpers/nameof";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import MauSnackbar from "../../components/MauSnackbar";
import {ApolloError} from "@apollo/client";
import {useForm} from "react-hook-form";
import MauTextField from "../../components/inputs/MauTextField";
import MauDatePicker from "../../components/inputs/MauDatePicker";


interface TodoFormInputs {
    description: string,
    due: string,
}


export default function TodoForm() {

    const history = useHistory()
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    // todo check with react router typescript
    // @ts-ignore
    const todo = history.location.state?.todo as GetTodosQuery["todos"][number] || undefined


    // todo
    // 1 make a wrapper around controller
    // 2 make an interface for the rules object (perhaps pull it from react hook form
    // 3 pass rules to both the Controller component and the render function
    // 4 make a function to display message appropriately (corresponding to rule and value)
    // extra make a function that maps custom validate function (email, isEvent, currency) to the rule object
    // and all in an array
    const {handleSubmit, control} = useForm<TodoFormInputs>({
        defaultValues: {
            description:  todo?.description || '',
            due: todo?.due || ''
        }
    });

    const [completed, setCompleted] = useState(todo !== undefined ? todo.completed : false)
    const [locked, setLocked] = useState(todo !== undefined ? todo.locked : false)
    const [archived, setArchived] = useState(todo !== undefined ? todo.archived : false)

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
        const { description, due }  = data

        setIsDisabled(true)

        const options = {
            todoInput: {
                description: description,
                completed: completed,
                locked: locked,
                archived: archived,
                due: due ? due.toString() : ''
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

            history.push('/todoList')

        } catch (e) {
            if (e instanceof  ApolloError) {
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
            <Container component="main" maxWidth="xs">
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
                    <Typography component="h1" variant="h5">
                        Todo
                    </Typography>
                    <Box sx={{mt: 1}}>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <MauTextField
                                rules={{
                                    required: true,
                                    minLength: 4
                                }}
                                label={'Description'}
                                control={control}
                                name="description"
                            />
                            <MauDatePicker
                                rules={{
                                    required: true,
                                }}
                                label={'Due'}
                                control={control}
                                name="due"
                            />
                            <FormGroup>
                                <FormControlLabel
                                    sx={{
                                        justifyContent: "flex-end"
                                    }}
                                    checked={completed}
                                    onChange={() => {
                                        setCompleted(!completed)
                                    }}
                                    control={<Checkbox />}
                                    label="Completed"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    sx={{
                                        justifyContent: "flex-end"
                                    }}
                                    checked={locked}
                                    onChange={() => {
                                        setLocked(!locked)
                                    }}
                                    control={<Checkbox />}
                                    label="Locked"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    sx={{
                                        justifyContent: "flex-end"
                                    }}
                                    checked={archived}
                                    onChange={() => {
                                        setArchived(!archived)
                                    }}
                                    control={<Checkbox />}
                                    label="Archived"
                                />
                            </FormGroup>
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
