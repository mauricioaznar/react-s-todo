import React from 'react'
import {Box} from "@mui/material";
import ProblemSolution from "../../components/problem-solution/ProblemSolution";

export default function ConsistencySolutions () {


    return (<Box>
        <ProblemSolution
            problem={`If you share local state, it should update all related items.`}
            solutions={
                [
                    `Use a single source of truth. Stated that is share among components should be
                     declare on the nearest common ancestor`
                ]
            }
        />
        <ProblemSolution
            problem={`If you navigate to another screen and go back, the post shouldn’t “forget” it was liked.`}
            solutions={
                [
                    `State could be persisted, so that it doesnt get lost once the component gets destroyed.`
                ]
            }
        />
        <ProblemSolution
            problem={`How do we keep the same data in sync on different parts of the screen?`}
            solutions={
                [
                    `By sharing state.`
                ]
            }
        />
        <ProblemSolution
            problem={`How and when do we make the local data consistent with the server, and the other way around?`}
            solutions={
                [
                    `Updating the server first and if successful update the local state. `
                ]
            }
        />

    </Box>)
}
