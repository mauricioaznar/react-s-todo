import React from "react";
import Explanation from "../components/explanation/Explanation";
import VerticalTabs, {
  VerticalTabItem,
} from "../components/vertical-tabs/VerticalTabs";

export default function Abstraction() {
  const tabs: VerticalTabItem[] = [
    {
      label: "Explanation",
      component: (
        <Explanation
          explanation={`In a tiny app, we can hardcode a lot of special cases to account for the above problems. But apps tend to grow. We want to be able to reuse, fork, and join parts of our code, and work on it collectively. We want to define clear boundaries between the pieces familiar to different people, and avoid making often-changing logic too rigid. How do we create abstractions that hide implementation details of a particular UI part? How do we avoid re-introducing the same problems that we just solved as our app grows?`}
        />
      ),
    },
  ];

  return <VerticalTabs items={tabs} title={`Abstraction`} />;
}
