import React from "react";
import { ProblemItemProps, Problems } from "../../components/problems/Problem";

export default function StalenessProblems() {
  const problemSolutions: ProblemItemProps[] = [
    {
      problem: `Caches can get stale. If I change an avatar, it should update in the cache too. If I make a new post, it needs to appear in the cache immediately, or the cache needs to be invalidated.`,
    },
    {
      problem: `How long does the cache stay in memory?`,
    },
    {
      problem: `How is pagination or sorting represented in the cache?`,
    },
  ];

  return <Problems items={problemSolutions} />;
}
