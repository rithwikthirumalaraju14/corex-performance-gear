
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

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
      <div className="absolute top-20 left-10 w-2 h-2 bg-corex-red rounded-full animate-float opacity-70"></div>
      <div
        className="absolute top-40 right-20 w-3 h-3 bg-corex-blue rounded-full animate-float opacity-60"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-1 h-1 bg-corex-green rounded-full animate-float opacity-80"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-6">
        <div className="text-center max-w-4xl animate-fade-in">
          {/* Animated Logo */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas tracking-wider mb-4 animate-scale-in">
              <span className="inline-block hover:text-corex-red transition-colors duration-300 cursor-default">
                C
              </span>
              <span className="inline-block hover:text-corex-blue transition-colors duration-300 cursor-default">
                O
              </span>
              <span className="inline-block hover:text-corex-green transition-colors duration-300 cursor-default">
                R
              </span>
              <span className="inline-block hover:text-corex-orange transition-colors duration-300 cursor-default">
                E
              </span>
              <span className="mx-4">•</span>
              <span className="inline-block hover:text-corex-purple transition-colors duration-300 cursor-default">
                X
              </span>
            </h1>
          </div>

          {/* Tagline with Typewriter Effect */}
          <div className="mb-16 animate-slide-in-right">
            <p className="text-xl md:text-3xl mb-4 tracking-wide">
              Gear That Moves With You.
            </p>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Experience the perfect fusion of cutting-edge technology and
              athletic performance
            </p>
          </div>

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
                  <div className="text-white text-center">
                    <Play className="mx-auto mb-4 h-16 w-16" />
                    <p className="text-xl">Core X Brand Story</p>
                    <p className="text-sm opacity-70 mt-2">
                      Video coming soon...
                    </p>
                  </div>
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
