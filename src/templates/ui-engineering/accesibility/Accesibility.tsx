import React from "react";
import Explanation from "../components/explanation/Explanation";
import VerticalTabs, {
  VerticalTabItem,
} from "../components/vertical-tabs/VerticalTabs";

export default function Accesibility() {
  const tabs: VerticalTabItem[] = [
    {
      label: "Explanation",
      component: (
        <Explanation
          explanation={`Inaccessible websites are not a niche problem. For example, in UK disability affects 1 in 5 people. (Here’s a nice infographic.) I’ve felt this personally too. Though I’m only 26, I struggle to read websites with thin fonts and low contrast. I try to use the trackpad less often, and I dread the day I’ll have to navigate poorly implemented websites by keyboard. We need to make our apps not horrible to people with difficulties — and the good news is that there’s a lot of low-hanging fruit. It starts with education and tooling. But we also need to make it easy for product developers to do the right thing. What can we do to make accessibility a default rather than an afterthought?`}
        />
      ),
    },
  ];

  return <VerticalTabs items={tabs} title={`Accesibility`} />;
}
