import React, {useState} from 'react'
import {Badge, Box, Stack, Typography} from "@mui/material";
import FeedbackButton from "../components/FeedbackButton";
import {fakeApi} from "../services/fake-api";
import {ThumbUp} from "@mui/icons-material";

export default function TextIndicator () {
    const [value, setValue] = useState(2)
    const [loading, setLoading] = useState(false)

    const fetch = async () => {
        setLoading(true)
        try {
            await fakeApi.fetchSuccess()
            setValue(value + 1)
        } catch (e) {
            return false;
        }
        setLoading(false)
        return true;
    }

    return (<Box>
        <Box>
            <Typography variant={'h6'}>
                #1 error: not updating all related items
            </Typography>
        </Box>
        <Stack sx={{ my: 1 }} direction={'row'} alignItems={'center'} spacing={2}>
            <FeedbackButton
                loading={loading}
                label={`Like`}
                onClick={fetch}
                icon={<ThumbUp />}
            />
            <Typography variant={'body1'}>
                # of likes 0
            </Typography>
            <Badge color="secondary" badgeContent={value}>
                <ThumbUp />
            </Badge>
        </Stack>
    </Box>)
}
