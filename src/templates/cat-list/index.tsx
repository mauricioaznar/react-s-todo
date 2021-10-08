import * as React from 'react'
import {Box} from "@mui/material";
import {useGetCatsQuery} from "../../schema";

export default function CatList () {
    const { data, loading } = useGetCatsQuery()

    if (loading) {
        return <h1>Loading</h1>;
    }


    return <Box>
        <h2>
            Title
        </h2>
        <ul>
            {
                data?.cats.map(cat => {
                    return <li
                        key={cat.breed}
                    >
                        {
                            cat.breed
                        }

                    </li>
                })
            }
        </ul>
    </Box>
}
