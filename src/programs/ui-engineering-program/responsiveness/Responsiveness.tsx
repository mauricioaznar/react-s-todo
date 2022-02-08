import React from 'react';
import Explanation from '../components/explanation/Explanation';
import ResponsivenessProblems from './views/ResponsivenessProblems';
import ResponsivenessSolution from './views/ResponsivenessSolution';
import VerticalTabs, { VerticalTabItem } from '../components/vertical-tabs/VerticalTabs';

export default function Responsiveness() {
  const tabs: VerticalTabItem[] = [
    {
      label: 'Explanation',
      component: (
        <Explanation
          explanation={`People can only tolerate a lack of visual feedback to their actions for a limited time.
                 For continuous actions like gestures and scroll, this limit is low. (Even skipping a single 16ms
                 frame feels “janky”.) For discrete actions like clicks, there is research saying users perceive any
                 < 100ms delays as equally fast. If an action takes longer, we need to show a visual indicator.
                 But there are some counter-intuitive challenges. Indicators that cause the page layout to
                 “jump” or that go through several loading “stages” can make the action feel longer than
                 it was. Similarly, handling an interaction within 20ms at the cost of dropping an animation
                 frame can feel slower than handling it within 30ms and no dropped frames. Brains aren’t benchmarks.
                 How do we keep our apps responsive to different kinds of inputs?`}
        />
      ),
    },
    {
      label: 'Problems',
      component: <ResponsivenessProblems />,
    },
    {
      label: 'The solution example',
      component: <ResponsivenessSolution />,
    },
  ];

  return <VerticalTabs items={tabs} title={`Responsiveness`} />;
}
