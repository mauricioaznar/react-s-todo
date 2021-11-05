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
import {useForm, Controller, UnpackNestedValue, FieldValues, FieldErrors} from "react-hook-form";


const theme = createTheme();

export default function TodoForm() {

    const history = useHistory()
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')


    // todo
    // 1 make a wrapper around controller
    // 2 make an interface for the rules object (perhaps pull it from react hook form
    // 3 pass rules to both the Controller component and the render function
    // 4 make a function to display message appropriately (corresponding to rule and value)
    // extra make a function that maps custom validate function (email, isEvent, currency) to the rule object
    // and all in an array
    const {handleSubmit, formState: { errors }, control, } = useForm({
        defaultValues: {
            description: ''
        }
    });


    // @ts-ignore
    const todo = history.location.state?.todo as GetTodosQuery["todos"][number] || undefined

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

    const onSubmit = (data: { description: string }) => {
        console.log(data.description)
    }

    const onError = (err: FieldErrors<FieldValues>) => {
        console.log(err)
    }

    // eslint-disable-next-line no-undef
    const handleFormSubmit = async (event:  React.MouseEvent<HTMLButtonElement>) => {
        // event.preventDefault();


        // setIsDisabled(true)

        // const options = {
        //     todoInput: {
        //         description: description,
        //         completed: completed,
        //         due: due ? due.toString() : ''
        //     }
        // }
        //
        // try {
        //     if (todo) {
        //         await updateTodoMutation(
        //             {
        //                 variables: {
        //                     id: todo._id,
        //                     ...options
        //                 }
        //             }
        //         )
        //     } else {
        //         await createTodoMutation({
        //             variables: {
        //                 ...options
        //             }
        //         })
        //     }
        //
        //     history.push('/todoList')
        //
        // } catch (e) {
        //     if (e instanceof  ApolloError) {
        //         setMessage(e.message)
        //     }
        // }
        // setMessage('')
        // setIsDisabled(false)

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
                    <Box sx={{mt: 1}}>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <Controller
                                control={control}
                                name="description"
                                rules={{
                                    required: true,
                                    minLength: 4
                                }}
                                render={(ops) => {
                                    const {field: {onChange, value}, fieldState: { error }} = ops
                                    console.log(error)
                                    let helperText = ''
                                    switch(error?.type) {
                                        case 'minLength': {
                                            helperText = 'min length must be bigger than'
                                            break;
                                        }
                                        case 'required': {
                                            helperText = 'this field is required'
                                            break;
                                        }
                                        default: {
                                            helperText = ''
                                            break;
                                        }
                                    }
                                    return (
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            value={value}
                                            onChange={(e) => {
                                                onChange(e.target.value)
                                            }}
                                            error={!!error}
                                            helperText={helperText}
                                            label="Description"
                                            autoFocus
                                        />
                                    )
                                }}
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
        </ThemeProvider>
    );
}
