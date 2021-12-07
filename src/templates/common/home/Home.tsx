import React from 'react'
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import Container from "@mui/material/Container";



export default function Home () {
    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container alignItems={'center'} mb={2}>
                <Grid item xs>
                    {
                        <Typography variant={'h4'}>Home</Typography>

                    }
                </Grid>
            </Grid>
        </Container>

    )
}
