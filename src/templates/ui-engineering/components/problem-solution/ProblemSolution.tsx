import React from 'react'
import {Box, Typography} from "@mui/material";

interface ProblemSolutionProps {
    problem: string;
    example?: React.ReactElement<any, any>
    solutions: string[];
}

export default function ProblemSolution (props: ProblemSolutionProps ) {
    const { problem, solutions, example } = props;

    return <Box sx={{ mb: 3 }}>
        <Typography variant={'h6'} sx={{ fontSize: '1.2rem', mb: 1 }}>
            { problem }
        </Typography>
        {
            example ? <>
                    <Typography variant={'body1'}>
                        Example
                    </Typography>
                    {
                        example
                    }
                </>
                : null

        }

        <Typography variant={'body1'}>
            { `Solution${solutions.length > 1 ? 's' : ''}` }
        </Typography>
        <ul style={{ margin: 0 }}>
            {
                solutions.map((s, index) => {
                    return (
                        <li key={index} >
                            { s }
                        </li>
                    )
                })
            }
        </ul>

    </Box>;
}

