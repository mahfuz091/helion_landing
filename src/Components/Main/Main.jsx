import React from "react";
import Banner from "../Banner/Banner";
import Blog from "../Blog/Blog";
import OurVault from "../OurVault/OurVault";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import OurProducts from "../OurProducts/OurProducts";

const Main = () => {
  return (
    <main>
      <Banner />
      <Blog />
      <OurVault />
      <LeaderBoard />
      <OurProducts />
    </main>
  );
};

export default Main;
