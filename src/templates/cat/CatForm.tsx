import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {GetCatsQuery, Query, useCreateCatMutation, useUpdateCatMutation} from "../../schema";
import {useHistory} from "react-router-dom";
import {nameof} from "../../helpers/nameof";


export default function CatForm() {

    const history = useHistory()
    const [isDisabled, setIsDisabled] = useState(false)

    // @ts-ignore
    const cat = history.location.state?.cat as GetCatsQuery["cats"][number] || undefined

    const [coat, setCoat] = useState(cat !== undefined ? cat.characteristics.coat : '')
    const [breed, setBreed] = useState(cat !== undefined ? cat.breed : '')
    const [lifespan, setLifespan] = useState(cat !== undefined ? cat.characteristics.lifespan : '')
    const [size, setSize] = useState(cat !== undefined ? cat.characteristics.size : '')
    const [color, setColor] = useState(cat !== undefined ? cat.characteristics.color : '')

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
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
            }
        }

        let errors

        if (cat) {
            const res = await updateCatMutation(
                {
                    variables: {
                        id: cat._id,
                        ...options
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="color"
                            label="Color"
                            name="color"
                            autoFocus
                            value={color}
                            onChange={(e) => { setColor(e.target.value) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="breed"
                            label="Breed"
                            type="breed"
                            id="breed"
                            value={breed}
                            onChange={(e) => { setBreed(e.target.value)} }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="coat"
                            label="Coat"
                            type="coat"
                            id="coat"
                            value={coat}
                            onChange={(e) => { setCoat(e.target.value) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="lifespan"
                            label="Lifespan"
                            type="lifespan"
                            id="lifespan"
                            value={lifespan}
                            onChange={(e) => { setLifespan(e.target.value) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="size"
                            label="Size"
                            type="size"
                            id="size"
                            value={size}
                            onChange={(e) => { setSize(e.target.value) }}
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
            </Container>
    );
}
