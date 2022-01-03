import React from "react";
import { ProblemItemProps, Problems } from "../../components/problems/Problem";

export function AbstractionProblems() {
  const problemSolutions: ProblemItemProps[] = [
    {
      problem: `How do we create abstractions that hide implementation details of a particular UI part?`,
    },
    {
      problem: `How do we avoid re-introducing the same problems that we just solved as our app grows?`,
    },
  ];
  return <Problems items={problemSolutions} />;
}
