import React from "react";
import Explanation from "../components/explanation/Explanation";
import VerticalTabs, {
  VerticalTabItem,
} from "../components/vertical-tabs/VerticalTabs";

export default function Latency() {
  const tabs: VerticalTabItem[] = [
    {
      label: "Explanation",
      component: (
        <Explanation
          explanation={`Both computations and network access take time. Sometimes we can ignore
            the computational cost if it doesn’t hurt the responsiveness on our target devices 
            (make sure to test your app on the low-end device spectrum). But handling network latency
            is unavoidable — it can take seconds! Our app can’t just freeze waiting for the data
            or code to load. This means any action that depends on new data, code, or assets is
            potentially asynchronous and needs to handle the “loading” case. But that can
            happen for almost every screen. How do we gracefully handle latency without displaying a 
            “cascade” of spinners or empty “holes”? How do we avoid “jumpy” layout? And how
            do we change async dependencies without “rewiring” our code every time?`}
        />
      ),
    },
  ];

  return <VerticalTabs items={tabs} title={`Latency`} />;
}
