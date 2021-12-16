import React from 'react'
import {ChallengeItem, Challenges} from "../../components/challenges/Challenge";
import LocalConsistency from "./consitency-challenges/LocalConsitency";
import ScreenConsistency from "./consitency-challenges/ScreenConsistency";

export default function ConsistencyChallenges () {

    const problemSolutions: ChallengeItem[] = [
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


    return (<Challenges items={problemSolutions} />)
}
