import React from 'react'
import {Box, List, ListItem, ListItemText, Typography} from "@mui/material";

interface ProblemSolutionProps {
    problem: string;
    solutions: string[];
}

export default function ProblemSolution (props: ProblemSolutionProps ) {
    const { problem, solutions } = props;

    return <Box sx={{ mb: 3 }}>
        <Typography variant={'h6'} sx={{ fontSize: '1.2rem' }}>
            { problem }
        </Typography>
        <List sx={{ py: 0 }}>
            {
                solutions.map((s, index) => {
                    return ( <ListItem key={index} sx={{ py: 0 }} >
                        <ListItemText  inset>
                            &bull; { s }
                        </ListItemText>

                    </ListItem> )
                })
            }

        </List>

    </Box>;
}

