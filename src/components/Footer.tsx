
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You've been added to our newsletter.",
      });
      setEmail('');
    }
  };

  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-3xl font-bebas tracking-wider text-corex-red">CORE X</h3>
              <p className="text-gray-300 leading-relaxed">
                Performance athletic wear designed for champions. Gear that moves with you, not against you.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-corex-red transition-colors duration-300 transform hover:scale-110">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-corex-blue transition-colors duration-300 transform hover:scale-110">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-corex-blue transition-colors duration-300 transform hover:scale-110">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-corex-red transition-colors duration-300 transform hover:scale-110">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Shop All', href: '#shop' },
                  { label: 'New Arrivals', href: '#shop' },
                  { label: 'Sale Items', href: '#shop' },
                  { label: 'Gift Cards', href: '#' },
                  { label: 'Size Guide', href: '#' },
                ].map((link, index) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-corex-red transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h4 className="text-lg font-semibold text-white">Customer Service</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Contact Us', href: '#contact' },
                  { label: 'Shipping & Returns', href: '#' },
                  { label: 'Track Your Order', href: '#' },
                  { label: 'Product Care', href: '#' },
                  { label: 'Warranty', href: '#' },
                ].map((link, index) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-corex-red transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <h4 className="text-lg font-semibold text-white">Stay Connected</h4>
              <p className="text-gray-300 text-sm">
                Get the latest updates on new products, athlete stories, and exclusive offers.
              </p>
              <form onSubmit={handleNewsletterSignup} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-corex-red hover:bg-corex-red/90 text-white"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Bar */}
      <div className="border-t border-gray-800 px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-sm text-gray-400">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                support@corexsport.com
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                1-800-CORE-GYM
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                Los Angeles, CA
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=32&h=20&fit=crop" 
                alt="Payment"
                className="h-5 opacity-70"
              />
              <span className="text-sm text-gray-400">Secure payments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div>
              © 2024 Core X Sportswear. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
