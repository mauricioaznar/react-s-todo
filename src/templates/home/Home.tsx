import React from 'react'
import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import {AppVariantContext} from "../../hooks/useAppVariant";
import {appVariants} from "../../services/app-variants";
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function Home () {

    const { appVariant, selectAppVariant } = React.useContext(AppVariantContext);

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container alignItems={'center'} mb={2}>
                <Grid item xs>
                    {
                        <Typography variant={'h4'}>Home</Typography>

                    }
                </Grid>
            </Grid>
            <Grid container alignItems={'center'} mb={2}>
                {
                    appVariants.map(av => {
                        const AvatarIcon = av.icon
                        return (
                            <Grid item key={av.name}>
                                <Card sx={{ maxWidth: 300, mx: 1,bgcolor: av.secondary }}>
                                    <CardHeader
                                        avatar={
                                            <AvatarIcon sx={{ color: av.primary }}/>
                                        }
                                        sx={{
                                            color: av.mode === 'dark' ? "white" : "black"
                                        }}
                                        title={av.title}
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: av.mode === 'dark' ? "white" : "black"
                                            }}
                                        >
                                            This impressive paella is a perfect party dish and a fun meal to cook
                                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                                            if you like.
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton
                                            sx={{
                                                bgcolor: av.backgroundSecondary
                                            }}
                                            disabled={av === appVariant}
                                            onClick={() => {
                                                selectAppVariant(av)
                                            }}
                                        >
                                            <FavoriteIcon  sx={{
                                                    color: av !== appVariant ?  av.primary : null
                                                }}

                                            />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>

    )
}
