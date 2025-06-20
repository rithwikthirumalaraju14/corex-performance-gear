import { useState, useEffect, useRef } from 'react';
import { Award, Target, Users, Zap } from 'lucide-react';

const AboutSection = () => {
  const [counters, setCounters] = useState({ athletes: 0, countries: 0, years: 0, products: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const targets = { athletes: 1, countries: 1, years: 1, products: 1 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounters({
        athletes: Math.floor(targets.athletes * progress),
        countries: Math.floor(targets.countries * progress),
        years: Math.floor(targets.years * progress),
        products: Math.floor(targets.products * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepTime);
  };

  const features = [
    {
      icon: Target,
      title: "Performance Driven",
      description: "Every product is designed with one goal: to enhance your athletic performance and push your limits."
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "Premium materials and rigorous testing ensure our gear meets the highest standards of durability and comfort."
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "We're more than a brand - we're a community of athletes supporting each other's journey to excellence."
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "Cutting-edge technology and innovative design drive every piece of Core X gear we create."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl mb-6 font-bebas text-black">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Core X was born from a simple belief: every athlete deserves gear that moves with them, 
            not against them. We engineer performance into every fiber, every seam, every detail.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center animate-scale-in">
            <div className="text-4xl md:text-5xl font-bold text-corex-red mb-2">
              {counters.athletes}
            </div>
            <div className="text-gray-600 font-medium">Athletes Trust Us</div>
          </div>
          <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl md:text-5xl font-bold text-corex-blue mb-2">
              {counters.countries}
            </div>
            <div className="text-gray-600 font-medium">Countries Worldwide</div>
          </div>
          <div className="text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl md:text-5xl font-bold text-corex-green mb-2">
              {counters.years}
            </div>
            <div className="text-gray-600 font-medium">Years of Excellence</div>
          </div>
          <div className="text-center animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-4xl md:text-5xl font-bold text-corex-orange mb-2">
              {counters.products}
            </div>
            <div className="text-gray-600 font-medium">Performance Products</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-corex-red to-corex-blue rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <h3 className="text-3xl font-bold mb-6 text-gray-900">The Core X Story</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in 2016 by former professional athletes, Core X emerged from frustration with 
                sportswear that looked good but failed when it mattered most. We knew there had to be 
                a better way.
              </p>
              <p>
                Our founding team spent two years in research and development, working with textile 
                engineers, biomechanics experts, and hundreds of athletes to create gear that truly 
                enhances performance.
              </p>
              <p>
                Today, Core X is trusted by professional athletes, weekend warriors, and everyone in 
                between. Our commitment remains unchanged: to create gear that moves with you, not against you.
              </p>
            </div>
          </div>
          <div className="animate-slide-in-right">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Core X Athletes"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-2xl font-bold">Performance Tested</div>
                <div className="text-sm opacity-90">By Real Athletes, For Real Athletes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
