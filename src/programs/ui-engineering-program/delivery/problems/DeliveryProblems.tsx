import React from 'react';
import { ProblemItemProps, Problems } from '../../components/problems/Problem';

export default function DeliveryProblems() {
  const problemSolutions: ProblemItemProps[] = [
    {
      problem: `We need to get our application code to the user’s computer. What transport and format do we use?`,
    },
    {
      problem: `Native apps tend to load all code in advance at the cost of a huge app size. Web apps tend to have smaller initial payload at the cost of more latency during use. `,
    },
    {
      problem: 'How do we choose at which point to introduce latency?',
    },
    {
      problem: 'How do we optimize our delivery based on the usage patterns?',
    },
    {
      problem: 'What kind of data would we need for an optimal solution?',
    },
  ];
  return <Problems items={problemSolutions} />;
}
