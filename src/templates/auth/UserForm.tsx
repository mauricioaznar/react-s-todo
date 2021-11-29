import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {GetUsersQuery, Query, useSignInMutation, useUpdateUserMutation} from "../../schema";
import {Grid} from "@mui/material";
import {ApolloError} from "@apollo/client";
import MauSnackbar from "../../components/MauSnackbar";
import {useHistory} from "react-router-dom";
import {nameof} from "../../helpers/nameof";
import {useForm} from "react-hook-form";
import MauTextField from "../../components/inputs/MauTextField";
import MauCheckbox from "../../components/inputs/MauCheckbox";
import {useTypedSelector} from "../../hooks/useTypedSelector";


interface UserFormInputs {
    username: string,
    password: string,
    admin: boolean,
}

export default function UserForm() {

    const {currentUser} = useTypedSelector(
        (state) => state.auth
    )

    const history = useHistory()
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    // @ts-ignore
    const user = history.location.state?.user as GetUsersQuery["users"][number] || undefined

    const isUserCurrent = currentUser?._id === user?._id
    const isAdmin = currentUser?.admin
    const canAlter = isAdmin || isUserCurrent

    const {handleSubmit, control} = useForm<UserFormInputs>({
        defaultValues: {
            username:  user ? user.username : '',
            password: 'changeme',
            admin: user ? user.admin : false,
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

    const [updateUserMutation] = useUpdateUserMutation({
        update(cache) {
            cache.evict({
                id: "ROOT_QUERY",
                fieldName: nameof<Query>('users')
            })
        },
    })



    const onSubmit = async (data: UserFormInputs) => {
        const { username, password, admin } = data

        setIsDisabled(true)

        const options = {
            userInput: {
                username: username,
                password: password,
                admin: isAdmin ? admin : false
            }
        }


        try {

            if (user) {
                await updateUserMutation(
                    {
                        variables: {
                            id: user._id,
                            ...options
                        }
                    }
                )
            } else {
                await signinMutation(
                    {
                        variables: {
                            ...options
                        }
                    }
                )
            }

            history.push('/users')
        } catch (e: unknown) {
            if (e instanceof ApolloError) {
                setMessage(e.message)
            }
        }

        setMessage('')
        setIsDisabled(false)
    };

    const onError = () => {

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

                                {
                                    isAdmin
                                        ? <MauCheckbox control={control} name={'admin'} label={'admin'} />
                                        : null
                                }
                                <Button
                                    disabled={isDisabled || !canAlter}
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
