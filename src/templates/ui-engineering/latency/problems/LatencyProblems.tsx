import React from "react";
import { ProblemItemProps, Problems } from "../../components/problems/Problem";

export default function LatencyProblems() {
  const problemSolutions: ProblemItemProps[] = [
    {
      problem: `Any action that depends on new data, code, or assets is potentially asynchronous and needs to handle the “loading” case. `,
    },
    {
      problem: `How do we gracefully handle latency without displaying a “cascade” of spinners or empty “holes”?`,
    },
    {
      problem: ` How do we avoid “jumpy” layout?`,
    },
    {
      problem: `How do we change async dependencies without “rewiring” our code every time?`,
    },
  ];

  return <Problems items={problemSolutions} />;
}
