import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import {useForm} from "react-hook-form";
import MauTextField from "../../components/inputs/MauTextField";


interface UserFormInputs {
    username: string,
    password: string,
}

export default function SignInForm() {

    const history = useHistory()
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')


    const {handleSubmit, control} = useForm<UserFormInputs>({
        defaultValues: {
            username:  '',
            password: '',
        }
    });


    const [signinMutation] = useSignInMutation({
        update(cache) {
            cache.evict({
                id: "ROOT_QUERY",
                fieldName: nameof<Query>('users')
            })
        },
    })


    // eslint-disable-next-line no-undef
    const onSubmit = async (data: UserFormInputs) => {
        const { username, password } = data

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

    const onError = () => {
        //
    }

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
                            User form
                        </Typography>
                        <Box sx={{mt: 1}}>
                            <form onSubmit={handleSubmit(onSubmit, onError)}>
                                <MauTextField
                                    rules={{
                                        required: true,
                                        email: true
                                    }}
                                    label={'Username'}
                                    control={control}
                                    name="username"
                                />
                                <MauTextField
                                    rules={{
                                        required: true,
                                    }}
                                    label={'Password'}
                                    control={control}
                                    name="password"
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
            </Grid>

        </Grid>

    );
}
