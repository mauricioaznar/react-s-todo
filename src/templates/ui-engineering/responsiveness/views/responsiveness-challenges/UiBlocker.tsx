import React, {useState} from 'react'
import {Box, Button, FormHelperText, Stack} from "@mui/material";
import {LoadingButton} from "@mui/lab";


const heavyComputation = () => {
    const s = (new Date()).getTime();
    let x = {} as { [key: string]: number };
    for (let i = 0; i < 999999; i++) {
        const key = "x" + i.toString()
        x[key] = i * i + i;
    }
    const e = new Date().getTime();
    return e - s;
}

export default function UiBlocker () {
    const [loading, setLoading] = useState(false)


    // const handleLoadingButton = () => {
    //     setLoading(false)
    // }

    const handleLockableButton =  () => {
        heavyComputation()
    }



    return <Stack direction={'row'} spacing={2}>
        <Box>
            <Button variant={'contained'} onClick={handleLockableButton}>
                Click
            </Button>
            <FormHelperText>
                Click me many times to block the ui
            </FormHelperText>
        </Box>
        <Box>
            <LoadingButton variant={'contained'} loading={loading} onClick={() => {
                setLoading(true)
                heavyComputation()
            }}>
                Click
            </LoadingButton>
            <FormHelperText>
                This button doesnt block the ui
            </FormHelperText>
        </Box>



    </Stack>
}
