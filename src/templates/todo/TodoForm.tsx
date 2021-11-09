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
import MauSnackbar from "../../components/MauSnackbar";
import {ApolloError} from "@apollo/client";
import {useForm} from "react-hook-form";
import MauTextField from "../../components/inputs/MauTextField";
import MauDatePicker from "../../components/inputs/MauDatePicker";
import MauCheckbox from "../../components/inputs/MauCheckbox";


interface TodoFormInputs {
    description: string,
    due: string,
    completed: boolean,
    archived: boolean,
    locked: boolean,
}


export default function TodoForm() {

    const history = useHistory()
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    // todo check with react router typescript
    // @ts-ignore
    const todo = history.location.state?.todo as GetTodosQuery["todos"][number] || undefined


    // todo
    // extra make a function that maps custom validate function (email, isEvent, currency) to the rule object
    // and all in an array
    const {handleSubmit, control} = useForm<TodoFormInputs>({
        defaultValues: {
            description: todo?.description || '',
            due: todo?.due || '',
            completed: todo?.completed || false,
            archived: todo?.archived || false,
            locked: todo?.locked || false,
        }
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
        const {description, due, completed, locked, archived} = data

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
                        <MauCheckbox
                            control={control}
                            name={'completed'}
                            label={'Completed'}
                        />
                        <MauCheckbox
                            control={control}
                            name={'locked'}
                            label={'Locked'}
                        />
                        <MauCheckbox
                            control={control}
                            name={'archived'}
                            label={'Archived'}
                        />
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
