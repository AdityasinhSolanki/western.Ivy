import React from "react";

const MainCollectionBanner = () => {
  return (
    <div className="w-full h-[60vh] sm:h-[75vh] lg:h-screen overflow-hidden">
      <img
        src="/assets/Banners/MainBannerImage.png"
        alt="Main Banner"
        className="w-full h-full object-cover object-right sm:object-center"
      />
    </div>
  );
};

export default MainCollectionBanner;