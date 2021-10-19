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


const theme = createTheme();

export default function TodoForm() {

    const history = useHistory()
    const [isDisabled, setIsDisabled] = useState(false)

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
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsDisabled(true)

        const options = {
            todoInput: {
                description: description,
                completed: completed,
                due: due ? due.toString() : ''
            }
        }

        let errors

        if (todo) {
            const res = await updateTodoMutation(
                {
                    variables: {
                        id: todo._id,
                        ...options
                    }
                }
            )
            errors = !res.errors || res.errors.length === 0
        } else {
            const res = await createTodoMutation({
                variables: {
                    ...options
                }
            })
            errors = !res.errors || res.errors.length === 0
        }


        if (errors) {
            history.push('/todoList')
        }
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            autoFocus
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
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
                                label="Disabled"
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
            </Container>
        </ThemeProvider>
    );
}
