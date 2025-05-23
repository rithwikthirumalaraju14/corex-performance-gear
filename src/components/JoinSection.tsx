
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JoinSection = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Success message
    toast({
      title: "Success!",
      description: "You've joined the X Movement. Get ready for exclusive content!",
    });
    
    // Reset form
    setEmail('');
  };

  return (
    <section id="join" className="py-20 px-6 md:px-12 bg-black text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl mb-4 font-bebas text-corex-red">Join the Movement</h2>
        <p className="text-lg mb-8">
          Sign up for early access to drops, performance tips, exclusive content, and athlete stories.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-12">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Button type="submit" className="bg-corex-red hover:bg-white hover:text-black text-white">
            Subscribe
          </Button>
        </form>
        
        <div className="pt-6 border-t border-white/20">
          <p className="text-sm text-white/70 mb-4">Follow our athletes' journeys</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white/70 hover:text-corex-red transition-colors">
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-white/70 hover:text-corex-red transition-colors">
              <Twitter size={24} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-white/70 hover:text-corex-red transition-colors">
              <Facebook size={24} />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-white/70 hover:text-corex-red transition-colors">
              <Youtube size={24} />
              <span className="sr-only">YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
