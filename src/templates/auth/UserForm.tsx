import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
    GetUsersQuery,
    Query,
    useIsUserOccupiedQuery,
    useSignInMutation,
    useUpdateUserMutation,
    useUploadFileMutation
} from "../../schema";
import {Grid} from "@mui/material";
import {ApolloError} from "@apollo/client";
import MauSnackbar from "../../components/MauSnackbar";
import {useHistory} from "react-router-dom";
import {nameof} from "../../helpers/nameof";
import {useForm} from "react-hook-form";
import MauTextField from "../../components/inputs/MauTextField";
import MauCheckbox from "../../components/inputs/MauCheckbox";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import MauFile from "../../components/inputs/MauFile";


interface UserFormInputs {
    username: string,
    password: string,
    admin: boolean,
    avatar: File | null | undefined,
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

    const {handleSubmit, control, watch, trigger} = useForm<UserFormInputs>({
        defaultValues: {
            username:  user ? user.username : '',
            password: 'changeme',
            admin: user ? user.admin : false,
            avatar: null
        }
    });

    const username = watch('username')

    const  { data: isUserOccupiedResult } = useIsUserOccupiedQuery({
        variables: {
            username
        },
        skip: !!user,
        onCompleted: async function () {
            if (username !== '') {
                await trigger('username')
            }
        }
    })

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

    const [uploadFileMutation] = useUploadFileMutation()





    const onSubmit = async (data: UserFormInputs) => {
        const { username, password, admin, avatar } = data

        setIsDisabled(true)

        const options = {
            userInput: {
                username: username,
                password: password,
                admin: isAdmin ? admin : false,
            }
        }


        try {

            let userId: string | undefined

            if (user) {
                const {data} = await updateUserMutation(
                    {
                        variables: {
                            id: user._id,
                            ...options
                        }
                    }
                )
                userId = data?.updateUser._id
            } else {
                const {data} = await signinMutation(
                    {
                        variables: {
                            ...options
                        }
                    }
                )
                userId = data?.createUser._id
            }

            if (avatar && userId) {
                await uploadFileMutation({
                    variables: {
                        file: avatar,
                        userId
                    }
                })
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
                                        invalid: isUserOccupiedResult?.isUserOccupied ? 'User is already in use' : null
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
                                <MauFile
                                    rules={{
                                        required: user ? !user.avatar : true,
                                    }}
                                    label={'Avatar'}
                                    control={control}
                                    name="avatar"
                                />
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
