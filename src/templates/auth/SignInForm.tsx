import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Query, useSignInMutation} from "../../schema";
import {Grid} from "@mui/material";
import {ApolloError} from "@apollo/client";
import MauSnackbar from "../../components/MauSnackbar";
import {useHistory} from "react-router-dom";
import {nameof} from "../../helpers/nameof";


// const theme = createTheme();

export default function SignInForm() {

    const history = useHistory()
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const [username, setUsername] = useState('john')
    const [password, setPassword] = useState('changeme')

    const [signinMutation] = useSignInMutation({
        update(cache) {
            cache.evict({
                id: "ROOT_QUERY",
                fieldName: nameof<Query>('users')
            })
        },
    })


    // eslint-disable-next-line no-undef
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsDisabled(true)

        try {
            const options = {
                userInput: {
                    username: username,
                    password: password
                }
            }

            const res = await signinMutation(
                {
                    variables: {
                        ...options
                    }
                }
            )

            if (res.data?.createUser?.username) {
                history.push('/userList')
            }

            setIsDisabled(false)
        } catch (e: unknown) {
            if (e instanceof ApolloError) {
                setMessage(e.message)
            }
        }
        setMessage('')
        setIsDisabled(false)
    };

    return (
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
        >

            <Grid item xs>
                <Container component="main" maxWidth="xs">
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
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="color"
                                label="User name"
                                name="username"
                                autoFocus
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
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
                        </Box>
                    </Box>
                    <MauSnackbar
                        message={message}
                    />
                </Container>
            </Grid>

        </Grid>

    );
}
