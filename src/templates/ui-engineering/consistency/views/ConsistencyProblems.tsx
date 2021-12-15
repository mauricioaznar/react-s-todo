import React from 'react'
import {Box} from "@mui/material";
import ProblemDescription from "../../components/problem-description/problem-description";
import LocalConsistency from "./consitency-problems/LocalConsitency";
import ScreenConsistency from "./consitency-problems/ScreenConsistency";

export default function ConsistencyProblems () {


    return (<Box>
        <ProblemDescription
            problem={`If you share local state, it should update all related items.`}
            description={<LocalConsistency />}
        />
        <ProblemDescription
            problem={`If you navigate to another screen and go back, the post shouldn’t “forget” it was liked.`}
            description={<ScreenConsistency />}
        />

    </Box>)
}
