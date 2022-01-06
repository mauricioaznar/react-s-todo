import React from "react";
import { ProblemItemProps, Problems } from "../../components/problems/Problem";

export default function ResilienceProblems() {
  const problemSolutions: ProblemItemProps[] = [
    {
      problem: `Your code displays incorrect visual output under some condition.`,
    },
    {
      problem: `What if the rendering code crashes?`,
    },
    {
      problem:
        "How do we write code in a way that isolates rendering and fetching failures and keeps the rest of the app running?",
    },
    {
      problem: "What does fault tolerance mean for user interfaces?",
    },
  ];
  return <Problems items={problemSolutions} />;
}
