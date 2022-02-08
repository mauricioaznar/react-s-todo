import React from "react";
import Explanation from "../components/explanation/Explanation";
import VerticalTabs, {
  VerticalTabItem,
} from "../components/vertical-tabs/VerticalTabs";
import PriorityProblems from "./problems/PriorityProblems";

export default function Priority() {
  const tabs: VerticalTabItem[] = [
    {
      label: "Explanation",
      component: (
        <Explanation
          explanation={`Some things are more important than others. A dialog might need to appear physically “above” the button that spawned it and “break out” of its container’s clip boundaries. A newly scheduled task (e.g. responding to a click) might be more important than a long-running task that already started (e.g. rendering next posts below the screen fold). As our app grows, parts of its code written by different people and teams compete for limited resources like processor, network, screen estate, and the bundle size budget. Sometimes you can rank the contenders on a shared scale of “importance”, like the CSS z-index property. But it rarely ends well. Every developer is biased to think their code is important. And if everything is important, then nothing is! How do we get independent widgets to cooperate instead of fighting for resources?`}
        />
      ),
    },
    {
      label: "Problems",
      component: <PriorityProblems />,
    },
  ];

  return <VerticalTabs items={tabs} title={`Priority`} />;
}
