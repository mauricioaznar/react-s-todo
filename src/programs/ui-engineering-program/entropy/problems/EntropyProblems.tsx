import React from 'react';
import { ProblemItemProps, Problems } from '../../components/problems/Problem';

export default function EntropyProblems() {
  const problemSolutions: ProblemItemProps[] = [
    {
      problem: `We can’t predict the exact user interactions and their order.”`,
    },
    {
      problem: `How do we tame the combinatorial explosion of possible states and make visual output predictable?”`,
    },
  ];
  return <Problems items={problemSolutions} />;
}
