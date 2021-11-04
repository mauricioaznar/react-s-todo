import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
    GetTodosQuery,
    Query,
    useCreateTodoMutation,
    useUpdateTodoMutation
} from "../../schema";
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {nameof} from "../../helpers/nameof";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {DatePicker} from "@mui/lab";
import MauSnackbar from "../../components/MauSnackbar";
import {ApolloError} from "@apollo/client";
import {useForm, Controller} from "react-hook-form";


const theme = createTheme();

export default function TodoForm() {

    const history = useHistory()
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const {register, handleSubmit,  setValue, formState: { errors }, control} = useForm({
    });


    // @ts-ignore
    const todo = history.location.state?.todo as GetTodosQuery["todos"][number] || undefined

    const [description, setDescription] = useState(todo !== undefined ? todo.description : '')
    const [completed, setCompleted] = useState(todo !== undefined ? todo.completed : false)
    const [due, setDue] = React.useState<Date | null>(todo !== undefined && todo.due ? new Date(todo.due) : null);

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

    // eslint-disable-next-line no-undef
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(errors)
        handleSubmit((data) => { console.log(data) })
        setIsDisabled(true)

        const options = {
            todoInput: {
                description: description,
                completed: completed,
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

    };

    return (
        <ThemeProvider theme={theme}>
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
                    <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{mt: 1}}>
                        <Controller
                            control={control}
                            name="description"
                            defaultValue={''}
                            rules={{
                                required: true,
                                minLength: 4
                            }}
                            render={({field: {ref, ...rest}, fieldState}) => {
                                console.log(fieldState)
                                return (
                                    <TextField
                                        {...rest}
                                        margin="normal"
                                        fullWidth
                                        label="Description"
                                        autoFocus
                                    />
                                )
                            }}
                        />
                        <Controller
                            defaultValue={''}
                            render={({ field }) => <TextField {...field} />}
                            name="TextField"
                            control={control}
                        />
                        <DatePicker
                            label="Basic example"
                            value={due}
                            onChange={(newValue) => {
                                setDue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params}  fullWidth margin={'normal'} />}
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
                        <Button
                            disabled={isDisabled}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
                <MauSnackbar
                    message={message}
                />
            </Container>
        </ThemeProvider>
    );
}
