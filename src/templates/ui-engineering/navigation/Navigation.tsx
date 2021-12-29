import React from "react";
import Explanation from "../components/explanation/Explanation";
import VerticalTabs, {
  VerticalTabItem,
} from "../components/vertical-tabs/VerticalTabs";

export default function Navigation() {
  const tabs: VerticalTabItem[] = [
    {
      label: "Explanation",
      component: (
        <Explanation
          explanation={`We expect that the UI remains “stable” as we interact with it. Things shouldn’t disappear from right under our noses. Navigation, whether started within the app (e.g. clicking a link) or due to an external event (e.g. clicking the “back” button), should also respect this principle. For example, switching between /profile/likes and /profile/follows tabs on a profile screen shouldn’t clear a search input outside the tabbed view. Even navigating to another screen is like walking into a room. People expect to go back later and find things as they left them (with, perhaps, some new items). If you’re in the middle of a feed, click on a profile, and go back, it’s frustrating to lose your position in the feed — or wait for it to load again. How do we architect our app to handle arbitrary navigation without losing important context?`}
        />
      ),
    },
  ];

  return <VerticalTabs items={tabs} title={`Navigation`} />;
}
