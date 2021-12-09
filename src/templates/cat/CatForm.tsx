import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {GetCatsQuery, Query, useCreateCatMutation, useUpdateCatMutation} from "../../schema";
import {useHistory, useLocation} from "react-router-dom";
import {nameof} from "../../helpers/nameof";
import {useForm} from "react-hook-form";
import ReactHookFormTextField from "../../components/inputs/react-hook-form/ReactHookFormTextField";
import ReactHookFormFile from "../../components/inputs/react-hook-form/ReactHookFormFile";
import {Badge, IconButton} from "@mui/material";


interface CatFormInputs {
    color: string,
    breed: string,
    coat: string,
    lifespan: string,
    size: string,
    files: File[] | null
}

interface CatFormLocationProps {
    cat: GetCatsQuery["cats"][number]
}

export default function CatForm() {

    const [isDisabled, setIsDisabled] = useState(false)

    const history = useHistory()

    const location = useLocation<CatFormLocationProps>()
    const cat = location.state?.cat

    const [filenames, setFilenames] = useState(cat?.filenames || [])

    const {handleSubmit, control} = useForm<CatFormInputs>({
        defaultValues: {
            color: cat?.characteristics.color || '',
            breed: cat?.breed || '',
            coat: cat?.characteristics.coat || '',
            lifespan: cat?.characteristics.lifespan || '',
            size: cat?.characteristics.size || '',
            files: []
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

        try {
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
                            filenames: filenames
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
        } catch (e) {
            //
        }
    };

    const onError = () => {}

    const removeFilename = (filename: string) => {
        setFilenames(filenames.filter(f => {return f !== filename}))
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
                            <ReactHookFormTextField
                                rules={{
                                    required: true,
                                }}
                                label={'Coat'}
                                control={control}
                                name="coat"
                            />
                            <ReactHookFormTextField
                                rules={{
                                    required: true,
                                }}
                                label={'Breed'}
                                control={control}
                                name="breed"
                            />

                            <ReactHookFormTextField
                                rules={{
                                    required: true,
                                }}
                                label={'Lifespan'}
                                control={control}
                                name="lifespan"
                            />

                            <ReactHookFormTextField
                                rules={{
                                    required: true,
                                }}
                                label={'Size'}
                                control={control}
                                name="size"
                            />
                            <ReactHookFormTextField
                                rules={{
                                    required: true,
                                }}
                                label={'Color'}
                                control={control}
                                name="color"
                            />
                            <ReactHookFormFile
                                rules={{
                                    required: !cat || cat?.filenames.length === 0,
                                    multiple: true,
                                    filesize: 4000000
                                }}
                                label={'Files'}
                                control={control}
                                name="files"
                            />
                            <Box>
                                {
                                    cat ?
                                        filenames.map(f => (

                                            <Badge
                                                key={f}
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                badgeContent={
                                                    <IconButton
                                                        sx={{
                                                            width: '30px',
                                                            height: '30px'
                                                        }}
                                                        onClick={() => {
                                                            removeFilename(f)
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                }
                                            >
                                                <Avatar alt="Travis Howard" src={f} />
                                            </Badge>
                                        )) : null
                                }
                            </Box>
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
