import React from 'react';
import { ProblemItemProps, Problems } from '../../components/problems/Problem';

export default function PriorityProblems() {
  const problemSolutions: ProblemItemProps[] = [
    {
      problem: `A dialog might need to appear physically “above” the button that spawned it and “break out” of its container’s clip boundaries`,
    },
    {
      problem: `A newly scheduled task (e.g. responding to a click) might be more important than a long-running task that already started (e.g. rendering next posts below the screen fold)`,
    },
    {
      problem: `How do we get independent widgets to cooperate instead of fighting for resources?`,
    },
  ];
  return <Problems items={problemSolutions} />;
}
