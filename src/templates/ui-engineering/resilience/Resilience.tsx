import React from "react";
import Explanation from "../components/explanation/Explanation";
import VerticalTabs, {
  VerticalTabItem,
} from "../components/vertical-tabs/VerticalTabs";
import ResilienceProblems from "./problems/ResilienceProblems";

export default function Resilience() {
  const tabs: VerticalTabItem[] = [
    {
      label: "Explanation",
      component: (
        <Explanation
          explanation={`You might like bugs if you’re an entomologist, but you probably don’t enjoy seeing them in your programs. However, some of your bugs will inevitably get to production. What happens then? Some bugs cause wrong but well-defined behavior. For example, maybe your code displays incorrect visual output under some condition. But what if the rendering code crashes? Then we can’t meaningfully continue because the visual output would be inconsistent. A crash rendering a single post shouldn’t “bring down” an entire feed or get it into a semi-broken state that causes further crashes. How do we write code in a way that isolates rendering and fetching failures and keeps the rest of the app running? What does fault tolerance mean for user interfaces?`}
        />
      ),
    },
    {
      label: "Problems",
      component: <ResilienceProblems />,
    },
  ];

  return <VerticalTabs items={tabs} title={`Resilience`} />;
}
