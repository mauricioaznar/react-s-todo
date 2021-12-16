import React from 'react'
import {Box, Typography} from "@mui/material";

export interface ChallengeItem {
    problem: string;
    example?: React.ReactElement<any, any>;
    solutions?: string[];
    tradeoffs?: string[];
}

export function Challenge (props: ChallengeItem ) {
    const { problem, solutions, tradeoffs,  example } = props;

    return <Box sx={{ mb: 4 }}>
        <Typography variant={'h6'} sx={{ fontSize: '1.2rem', mb: 2 }}>
            { problem }
        </Typography>
        {
            example ? <Box sx={{ mb: 2 }}>
                    <Typography variant={'body1'}>
                        Example
                    </Typography>
                    {
                        example
                    }
                </Box>
                : null

        }

        {
            solutions
            ? <Box sx={{ mb: 2 }}>
                <Typography variant={'body1'}>
                    { `Solution${solutions.length > 1 ? 's' : '' }` }
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
            </Box>
            : null
        }

        {
            tradeoffs
                ? <Box>
                    <Typography variant={'body1'}>
                        { `Tradeoff${tradeoffs.length > 1 ? 's' : '' }` }
                    </Typography>
                    <ul style={{ margin: 0 }}>
                        {
                            tradeoffs.map((s, index) => {
                                return (
                                    <li key={index} >
                                        { s }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Box>
                : null
        }


    </Box>;
}

interface ChallengesProps {
    items: ChallengeItem[]
}

export function Challenges (props: ChallengesProps) {
    const { items } = props

    return (<Box>
        {
            items.map((psm, index) => {
                const { problem, ...rest } = psm
                return (
                    <Challenge
                        key={index}
                        problem={`#${index + 1}: ${problem}`}
                        {...rest}

                    />
                )
            })
        }

    </Box>)

}

