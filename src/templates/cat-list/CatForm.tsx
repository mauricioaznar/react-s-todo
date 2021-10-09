import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {GetCatsQuery, useCreateCatMutation} from "../../schema";
import {useHistory} from "react-router-dom";
import sleep from "../../services/sleep";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {

    const history = useHistory()

    // @ts-ignore
    const cat = history.location.state.cat as GetCatsQuery["cats"][number] || undefined


    console.log(cat)

    const [createCatMutation] = useCreateCatMutation({
        variables: {
            catInput: {
                breed: '',
                characteristics: {
                    coat: '',
                    lifespan: '',
                    size: '',
                    color: ''
                }
            } // value for 'catInput'
        },
    });

    // eslint-disable-next-line no-undef
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // eslint-disable-next-line no-undef
        const formData = new FormData(event.currentTarget);
        const {errors} = await createCatMutation({
            variables: {
                catInput: {
                    breed: formData.get('breed')?.toString() || '',
                    characteristics: {
                        coat: formData.get('coat')?.toString() || '',
                        lifespan: formData.get('lifespan')?.toString() || '',
                        size: formData.get('size')?.toString() || '',
                        color: formData.get('color')?.toString() || ''
                    }
                }
            }
        })
        if (!errors || errors.length === 0) {
            await sleep(2000)
            history.push('/')
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
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
                            label="Color"
                            name="color"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="breed"
                            label="Breed"
                            type="breed"
                            id="breed"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="coat"
                            label="Coat"
                            type="coat"
                            id="coat"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="lifespan"
                            label="Lifespan"
                            type="lifespan"
                            id="lifespan"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="size"
                            label="Size"
                            type="size"
                            id="size"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}
