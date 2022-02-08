import React from 'react';
import { ProblemItemProps, Problems } from '../../components/problems/Problem';

export default function LatencyProblems() {
  const problemSolutions: ProblemItemProps[] = [
    {
      problem: `How do we gracefully handle latency without displaying a “cascade” of spinners or empty “holes”?`,
      answers: [
        'We could load data that is used across many places on the first render and display only one loading global-state.',
      ],
    },
    {
      problem: ` How do we avoid “jumpy” layout?`,
      answers: [
        'Using transition animations like fade effects or moving the layout into the screen',
      ],
    },
    {
      problem: `How do we change async dependencies without “rewiring” our code every time?`,
      answers: [
        'We could create an abstraction of the async functionality and have the async dependencies work inside. The api would remain stable for the dependent code',
      ],
    },
  ];

  return <Problems items={problemSolutions} />;
}
