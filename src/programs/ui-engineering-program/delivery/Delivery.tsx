import React from 'react';
import Explanation from '../components/explanation/Explanation';
import VerticalTabs, { VerticalTabItem } from '../components/vertical-tabs/VerticalTabs';
import DeliveryProblems from './problems/DeliveryProblems';

export default function Delivery() {
  const tabs: VerticalTabItem[] = [
    {
      label: 'Explanation',
      component: (
        <Explanation
          explanation={`We need to get our application code to the user’s computer. What transport and format do we use? This might sound straightforward but there are many tradeoffs here. For example, native apps tend to load all code in advance at the cost of a huge app size. Web apps tend to have smaller initial payload at the cost of more latency during use. How do we choose at which point to introduce latency? How do we optimize our delivery based on the usage patterns? What kind of data would we need for an optimal solution?`}
        />
      ),
    },
    {
      label: 'Problems',
      component: <DeliveryProblems />,
    },
  ];

  return <VerticalTabs items={tabs} title={`Delivery`} />;
}
