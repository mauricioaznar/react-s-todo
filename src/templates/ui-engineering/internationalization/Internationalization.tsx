import React from "react";
import Explanation from "../components/explanation/Explanation";
import VerticalTabs, {
  VerticalTabItem,
} from "../components/vertical-tabs/VerticalTabs";

export default function Internationalization() {
  const tabs: VerticalTabItem[] = [
    {
      label: "Explanation",
      component: (
        <Explanation
          explanation={`Our app needs to work all over the world. Not only do people speak different languages, but we also need to support right-to-left layouts with the least amount of effort from product engineers. How do we support different languages without sacrificing latency and responsiveness?`}
        />
      ),
    },
  ];

  return <VerticalTabs items={tabs} title={`Internationalization`} />;
}
