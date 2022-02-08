import React from 'react';
import { ProblemItemProps, Problems } from '../../components/problems/Problem';
import { SearchBarReset } from './problems/SearchBarReset';

export default function NavigationProblems() {
  const problemSolutions: ProblemItemProps[] = [
    {
      problem: `Switching between /profile/likes and /profile/follows tabs on a profile screen shouldn’t clear a search input outside the tabbed view.`,
      example: <SearchBarReset />,
    },
    {
      problem: `Navigating to another screen is like walking into a room. People expect to go back later and find things as they left them (with, perhaps, some new items).`,
    },
    {
      problem: `If you’re in the middle of a feed, click on a profile, and go back, it’s frustrating to lose your position in the feed — or wait for it to load again. How do we architect our app to handle arbitrary navigation without losing important context?`,
    },
  ];

  return <Problems items={problemSolutions} />;
}
