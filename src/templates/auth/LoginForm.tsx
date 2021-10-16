import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useLoginMutation} from "../../schema";
import {Grid} from "@mui/material";
import {ApolloError} from "@apollo/client";
import {useActions} from "../../hooks/useActions";
import MauSnackbar from "../../components/MauSnackbar";


// const theme = createTheme();

export default function LogInForm() {

    // const history = useHistory()
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const [username, setUsername] = useState('john')
    const [password, setPassword] = useState('changeme')

    const [loginMutation] = useLoginMutation()

    const {login} = useActions()

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

            const res = await loginMutation(
                {
                    variables: {
                        ...options
                    }
                }
            )

            const accessToken = res.data?.login?.accessToken

            if (accessToken) {
                login(accessToken)
            }

            setIsDisabled(false)
        } catch (e: unknown) {
            if (e instanceof ApolloError) {
                setMessage(e.message)
            }
        }
    };

    return (
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >

            <Grid item xs>
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
                        onClose={() => {
                            setIsDisabled(false)
                            setMessage('')
                        }}
                        message={message}
                    />
                </Container>
            </Grid>

        </Grid>

    );
}
