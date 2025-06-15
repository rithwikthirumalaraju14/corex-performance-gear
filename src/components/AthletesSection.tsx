
import { Card, CardContent } from './ui/card';

interface AthleteProps {
  name: string;
  sport: string;
  quote: string;
  image: string;
}

const AthleteCard = ({ name, sport, quote, image }: AthleteProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-64 md:h-full">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-6 flex flex-col justify-center">
          <blockquote className="text-lg italic mb-4">"{quote}"</blockquote>
          <div className="mt-auto">
            <p className="font-bold text-xl">{name}</p>
            <p className="text-corex-red">{sport}</p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

const AthletesSection = () => {
  const athletes = [
    {
      name: "Alex Rivera",
      sport: "CrossFit Athlete",
      quote: "Core X compression gear gives me the support and freedom I need for my most intense training sessions.",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Tasha Williams",
      sport: "Marathon Runner",
      quote: "The X-Run collection has been a game-changer for my marathon training. Breathable, lightweight, and durable.",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
  ];

  return (
    <section id="athletes" className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl mb-6 font-bebas">X Athletes</h2>
        <p className="text-lg mb-12 max-w-3xl">
          Our gear is tested and trusted by professional athletes across various disciplines.
          Here's what they have to say about training in Core X.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {athletes.map((athlete, index) => (
            <AthleteCard 
              key={index} 
              name={athlete.name} 
              sport={athlete.sport} 
              quote={athlete.quote}
              image={athlete.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AthletesSection;
