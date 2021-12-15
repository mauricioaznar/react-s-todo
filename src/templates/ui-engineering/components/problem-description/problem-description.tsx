import React from 'react'
import {Box, Typography} from "@mui/material";

interface ProblemDescriptionProps {
    problem: string;
    description: React.ReactElement<any,any> | string;
}

export default function ProblemDescription (props: ProblemDescriptionProps ) {
    const { problem, description } = props;

    return <Box sx={{ mb: 4 }}>
        <Typography variant={'h6'} sx={{ fontSize: '1.2rem' }}>
            { problem }
        </Typography>
        { description }
    </Box>;
}
