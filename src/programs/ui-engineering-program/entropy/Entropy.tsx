import React from 'react';
import Explanation from '../components/explanation/Explanation';
import VerticalTabs, { VerticalTabItem } from '../components/vertical-tabs/VerticalTabs';
import EntropyProblems from './problems/EntropyProblems';

export default function Entropy() {
  const tabs: VerticalTabItem[] = [
    {
      label: 'Explanation',
      component: (
        <Explanation
          explanation={`The second law of thermodynamics says something like “with time, things turn into a mess” (well, not exactly). This applies to user interfaces too. We can’t predict the exact user interactions and their order. At any point in time, our app may be in one of a mind-boggling number of possible states. We do our best to make the result predictable and limited by our design. We don’t want to look at a bug screenshot and wonder “how did that happen”. For N possible states, there are N×(N–1) possible transitions between them. For example, if a button can be in one of 5 different states (normal, active, hover, danger, disabled), the code updating the button must be correct for 5×4=20 possible transitions — or forbid some of them. How do we tame the combinatorial explosion of possible states and make visual output predictable?`}
        />
      ),
    },
    {
      label: 'Problems',
      component: <EntropyProblems />,
    },
  ];

  return <VerticalTabs items={tabs} title={'entropy'} />;
}
