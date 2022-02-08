import React from "react";
import { ProblemItemProps, Problems } from "../../components/problems/Problem";

export function AccessibilityProblems() {
  const problemSolutions: ProblemItemProps[] = [
    {
      problem: `We need to make our apps not horrible to people with difficulties`,
    },
    {
      problem: `What can we do to make accessibility a default rather than an afterthought?`,
    },
  ];
  return <Problems items={problemSolutions} />;
}
