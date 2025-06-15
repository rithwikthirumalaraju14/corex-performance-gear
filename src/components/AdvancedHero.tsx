
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import AdvancedHeroLogo from "./AdvancedHeroLogo";
import AdvancedHeroTagline from "./AdvancedHeroTagline";
import AdvancedHeroFloatingDots from "./AdvancedHeroFloatingDots";

const AdvancedHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video/Image with Parallax */}
      <div
        className="absolute inset-0 transition-transform duration-75"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="relative w-full h-[120%]">
          <img
            src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Core X Sportswear"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80"></div>
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-corex-red/20 via-transparent to-corex-blue/20 animate-gradient bg-300%"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <AdvancedHeroFloatingDots />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-6">
        <div className="text-center max-w-4xl animate-fade-in">
          {/* Animated Logo */}
          <div className="mb-8">
            <AdvancedHeroLogo />
          </div>

          {/* Tagline with Typewriter Effect */}
          <AdvancedHeroTagline />

          {/* CTA Buttons - Only Watch Story button */}
          <div
            className="flex justify-center animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-black border-black hover:bg-black hover:text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Watch Story
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0">
                <div className="aspect-video w-full bg-black rounded-lg flex items-center justify-center">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/NW2Sibk4u1U"
                    title="Core X Brand Story"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedHero;

