import React from "react";
import { ProblemItemProps, Problems } from "../../components/problems/Problem";

export default function InternationalizationProblems() {
  const problemSolutions: ProblemItemProps[] = [
    {
      problem: `Support right-to-left layouts with the least amount of effort from product engineers”`,
    },
    {
      problem: `How do we support different languages without sacrificing latency and responsiveness?”`,
    },
  ];
  return <Problems items={problemSolutions} />;
}
