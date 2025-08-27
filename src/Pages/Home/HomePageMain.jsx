import React from "react";
import HomeHeroSection from "./HomeHeroFade";
import UsersReview from "./UserReview";
import Gallery from "./Gallery";

const HomePageMain = () => {
  return (
    <div>
      <HomeHeroSection />
      <UsersReview />
      <Gallery />
    </div>
  );
};

export default HomePageMain;
