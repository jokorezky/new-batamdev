"use client";

import React, { useState } from "react";
import TopWidgetHome from "@/components/TopWidgetHome";
import HomeLayout from "@/components/HomeLayout";
import DarkItemsFullWidth from "@/components/DarkItemsFullWidth";
import DarkGreenItemsFullWidth from "@/components/DarkGreenItemsFullWidth";
import LatestVideo from "@/components/LatestVideo";
import ByCategory from "@/components/ByCategory";
import { useNewsQuery } from "@/hooks/useNewsMutation";

const Home = () => {
  const [page] = useState(1);
  const { news: startup } = useNewsQuery(page, 6, {
    category: "startup",
  });

  const { news: cyberSecurity } = useNewsQuery(page, 6, {
    category: "cyber-security",
  });

  const { news: ai } = useNewsQuery(page, 6, {
    category: "ai",
  });

  const { news: community } = useNewsQuery(page, 6, {
    category: "community",
  });

  return (
    <>
      <div className="hidden md:block">
        <TopWidgetHome />
      </div>
      <div className="block mb-1 md:hidden">
        <DarkGreenItemsFullWidth />
      </div>

      <HomeLayout />
      {/* <DarkItemsFullWidth /> */}
      <ByCategory title="Startup" data={startup} />
      <LatestVideo />
      <ByCategory title="Cyber Security" data={cyberSecurity} />
      <ByCategory title="AI" data={ai} />
      <ByCategory title="Community" data={community} />
    </>
  );
};

export default Home;
