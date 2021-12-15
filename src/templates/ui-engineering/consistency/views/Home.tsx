import React from 'react'
import {Box, Typography} from "@mui/material";

export default function Home () {
    return   <Box>
        <Typography variant={'body1'}>
            You click on a “Like” button and the text updates: “You and 3 other friends liked this post.” You click it again, and the text flips back. Sounds easy. But maybe a label like this exists in several places on the screen. Maybe there is some other visual indication (such as the button background) that needs to change. The list of “likers” that was previously fetched from the server and is visible on hover should now include your name. If you navigate to another screen and go back, the post shouldn’t “forget” it was liked. Even local consistency alone creates a set of challenges. But other users might also modify the data we display (e.g. by liking a post we’re viewing). How do we keep the same data in sync on different parts of the screen? How and when do we make the local data consistent with the server, and the other way around?
        </Typography>
    </Box>
}
