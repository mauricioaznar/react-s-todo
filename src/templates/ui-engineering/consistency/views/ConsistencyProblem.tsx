import React from 'react'
import {Box} from "@mui/material";
import ProblemSolution from "../../components/problem-solution/ProblemSolution";
import LocalConsistency from "./consitency-problems/LocalConsitency";
import ScreenConsistency from "./consitency-problems/ScreenConsistency";

export default function ConsistencyProblem () {

    const problemSolutions = [
        {
            problem: `If you share local state, it should update all related items.`,
            example: <LocalConsistency />,
            solutions: [
                `Use a single source of truth. Stated that is share among components should be
                     declare on the nearest common ancestor`
            ]
        },
        {
            problem: `If you navigate to another screen and go back, the post shouldn’t “forget” it was liked.`,
            example: <ScreenConsistency />,
            solutions:   [
                `State could be persisted, so that it doesnt get lost once the component gets destroyed.`
            ]
        },
        {
            problem: `How do we keep the same data in sync on different parts of the screen?`,
            solutions: [
                `Sharing state using a common ancestor that distributes this state.`,
                `Using state management tools like: redux, relay or context`
            ]
        },
        {
            problem: `How and when do we make the local data consistent with the server, and the other way around?`,
            solutions:   [
                `Updating the server first and if successful update the local state. `
            ]
        }
    ]


    return (<Box>
        {
            problemSolutions.map((psm, index) => {
                return (
                    <ProblemSolution
                        key={index}
                        problem={`#${index + 1}: ${psm.problem}`}
                        example={psm.example || undefined}
                        solutions={psm.solutions}
                    />
                )
            })
        }

    </Box>)
}
