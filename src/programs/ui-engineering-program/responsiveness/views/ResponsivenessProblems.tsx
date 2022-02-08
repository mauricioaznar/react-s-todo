import React from 'react';
import { ProblemItemProps, Problems } from '../../components/problems/Problem';
import LackOfVisualFeedback from './problems/LackOfVisualFeedback';
import JankyAnimation from './problems/JankyAnimation';
import UiBlocker from './problems/UiBlocker';

export default function ResponsivenessProblems() {
  const problemSolutions: ProblemItemProps[] = [
    {
      problem: `Lack of visual feedback to their actions.`,
      solutions: [
        `Inform the user about each stage of their actions.`,
        `Use animations to show different transitions smoothly`,
      ],
      tradeoffs: [`If an action takes less than 100ms, we can skip animations.`],
      example: <LackOfVisualFeedback />,
    },
    {
      problem: `Skipping frames feels “janky.`,
      example: <JankyAnimation />,
    },
    {
      problem: `Indicators that cause the page layout to “jump” or that go through several loading “stages”
             can make the action feel longer than it was.`,
      example: <UiBlocker />,
    },
    {
      problem: `How do we keep our apps responsive to different kinds of inputs?.`,
      answers: ['If the action takes longer than 100ms, we display a loading global-state.'],
    },
  ];

  return <Problems items={problemSolutions} />;
}
