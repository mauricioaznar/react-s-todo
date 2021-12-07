import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {GetCatsQuery, Query, useCreateCatMutation, useUpdateCatMutation} from "../../schema";
import {useHistory} from "react-router-dom";
import {nameof} from "../../helpers/nameof";
import {useForm} from "react-hook-form";
import MauTextField from "../../components/inputs/MauTextField";
import MauFile from "../../components/inputs/MauFile";


interface CatFormInputs {
    color: string,
    breed: string,
    coat: string,
    lifespan: string,
    size: string,
    files: File[] | null
}


export default function CatForm() {

    const history = useHistory()
    const [isDisabled, setIsDisabled] = useState(false)

    // @ts-ignore
    const cat = history.location.state?.cat as GetCatsQuery["cats"][number] || undefined


    const {handleSubmit, control} = useForm<CatFormInputs>({
        defaultValues: {
            color: cat?.characteristics.color || '',
            breed: cat?.breed || '',
            coat: cat?.characteristics.coat || '',
            lifespan: cat?.characteristics.lifespan || '',
            size: cat?.characteristics.size || ''
        }
    });


    const [createCatMutation] = useCreateCatMutation({
        update(cache) {
            cache.evict({
                id: "ROOT_QUERY",
                fieldName: nameof<Query>('cats')
            })
        },
    });
    const [updateCatMutation] = useUpdateCatMutation({
        update(cache) {
            cache.evict({
                id: "ROOT_QUERY",
                fieldName: nameof<Query>('cats')
            })
        },
    });

    // eslint-disable-next-line no-undef
    const onSubmit = async (data: CatFormInputs) => {

        const { files, breed, coat, lifespan, size, color } = data
        setIsDisabled(true)

        const options = {
            catInput: {
                breed: breed,
                characteristics: {
                    coat: coat,
                    lifespan: lifespan,
                    size: size,
                    color: color
                }
            },
            files: files
        }

        let errors

        if (cat) {
            const res = await updateCatMutation(
                {
                    variables: {
                        id: cat._id,
                        ...options,
                        filenames: []
                    }
                }
            )
            errors = !res.errors || res.errors.length === 0
        } else {
            const res = await createCatMutation({
                variables: {
                    ...options
                }
            })
            errors = !res.errors || res.errors.length === 0
        }


        if (errors) {
            history.push('/')
        }
    };

    const onError = () => {

    }

    return (
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
                    <Box sx={{mt: 1}}>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <MauTextField
                                rules={{
                                    required: true,
                                }}
                                label={'Coat'}
                                control={control}
                                name="coat"
                            />
                            <MauTextField
                                rules={{
                                    required: true,
                                }}
                                label={'Breed'}
                                control={control}
                                name="breed"
                            />

                            <MauTextField
                                rules={{
                                    required: true,
                                }}
                                label={'Lifespan'}
                                control={control}
                                name="lifespan"
                            />

                            <MauTextField
                                rules={{
                                    required: true,
                                }}
                                label={'Size'}
                                control={control}
                                name="size"
                            />
                            <MauTextField
                                rules={{
                                    required: true,
                                }}
                                label={'Color'}
                                control={control}
                                name="color"
                            />
                            <MauFile
                                rules={{
                                    required: true,
                                    multiple: true,
                                    filesize: 4000000
                                }}
                                label={'Files'}
                                control={control}
                                name="files"
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
            </Container>
    );
}
