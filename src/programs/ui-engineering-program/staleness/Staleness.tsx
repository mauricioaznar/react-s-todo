import React from 'react';
import Explanation from '../components/explanation/Explanation';
import VerticalTabs, { VerticalTabItem } from '../components/vertical-tabs/VerticalTabs';
import StalenessProblems from './problems/StalenessProblems';

export default function Staleness() {
  const tabs: VerticalTabItem[] = [
    {
      label: 'Explanation',
      component: (
        <Explanation
          explanation={`We can make the “back” button navigation instant by introducing a local cache. In that cache, we can “remember” some data for quick access even if we could theoretically refetch it. But caching brings its own problems. Caches can get stale. If I change an avatar, it should update in the cache too. If I make a new post, it needs to appear in the cache immediately, or the cache needs to be invalidated. This can become difficult and error-prone. What if the posting fails? How long does the cache stay in memory? When we refetch the feed, do we “stitch” the newly fetched feed with the cached one, or throw the cache away? How is pagination or sorting represented in the cache?`}
        />
      ),
    },
    {
      label: 'Problems',
      component: <StalenessProblems />,
    },
  ];

  return <VerticalTabs items={tabs} title={`Staleness`} />;
}
