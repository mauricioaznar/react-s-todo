import {Badge, Stack} from "@mui/material";
import FeedbackButton from "../../components/FeedbackButton";
import {ThumbUp} from "@mui/icons-material";
import React, {useState} from "react";
import {fakeApi} from "../../services/fake-api";

export default function ScreenConsistency () {

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

    return (
        <Stack sx={{ my: 1 }} direction={'row'} alignItems={'center'} spacing={2}>
            <FeedbackButton
                loading={loading}
                label={`Like`}
                onClick={fetch}
                icon={<ThumbUp />}
            />
            <Badge color="secondary" badgeContent={value}>
                <ThumbUp />
            </Badge>
        </Stack>
    )
}
