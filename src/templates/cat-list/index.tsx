import * as React from 'react'
import {Box} from "@mui/material";
import {useGetCatsLazyQuery} from "../../schema";

export default function CatList () {
    const [a , b] = useGetCatsLazyQuery()

    console.log(a, b)

    return <Box>
        <h2>
            Title
        </h2>
    </Box>
}
