import React from "react";
import HomeHeroSection from "./HomeHeroFade";
import UsersReview from "./UserReview";
import Gallery from "./Gallery";
// import Gallery from "./GalleryInsta";
// import Gallery from "./GalleryInstaApi";

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
