import React from 'react'
import {ChallengeItem, Challenges} from "../../components/challenges/Challenge";
import LackOfVisualFeedback from "./responsiveness-challenges/LackOfVisualFeedback";
import JankyAnimation from "./responsiveness-challenges/JankyAnimation";

export default function ResponsivenessChallenges () {

    const problemSolutions: ChallengeItem[] = [
        {
            problem: `Lack of visual feedback to their actions.`,
            solutions: [
                `Inform the user about each stage of their actions.`,
                `Use animations to show different transitions smoothly`
            ],
            tradeoffs: [
                `If an action takes less than 100ms, we can skip animations.`
            ],
            example: <LackOfVisualFeedback />
        },
        {
            problem: `Skipping frames feels “janky.`,
            solutions:   [],
            example: <JankyAnimation />
        },
        {
            problem: `Indicators that cause the page layout to “jump” or that go through several loading “stages”
             can make the action feel longer than it was.`,
            solutions: []
        },
        {
            problem: `Handling an interaction within 20ms at the cost of dropping an
             animation frame can feel slower than handling it within 30ms and no dropped frames.`,
            solutions:   []
        },
        {
            problem: `How do we keep our apps responsive to different kinds of inputs?.`,
            solutions: []
        }
    ]

    return <Challenges items={problemSolutions} />
}
