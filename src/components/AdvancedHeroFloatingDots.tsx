
import React from "react";

const AdvancedHeroFloatingDots = () => (
  <>
    <div className="absolute top-20 left-10 w-2 h-2 bg-corex-red rounded-full animate-float opacity-70"></div>
    <div
      className="absolute top-40 right-20 w-3 h-3 bg-corex-blue rounded-full animate-float opacity-60"
      style={{ animationDelay: "1s" }}
    ></div>
    <div
      className="absolute bottom-40 left-20 w-1 h-1 bg-corex-green rounded-full animate-float opacity-80"
      style={{ animationDelay: "2s" }}
    ></div>
  </>
);

export default AdvancedHeroFloatingDots;
