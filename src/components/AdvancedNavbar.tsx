import { useState, useEffect } from 'react';
import { Menu, X, User, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import { useProfile } from '@/contexts/ProfileContext';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import ShoppingCart from './ShoppingCart';
import ProfileDisplay from './ProfileDisplay';

const AdvancedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const { getItemCount } = useShoppingCart();
  const { profile } = useProfile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Scroll to shop section
      const shopSection = document.querySelector('#shop');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navItems = [
    { href: '#shop', label: 'Shop' },
    { href: '#about', label: 'Our Mission' },
    { href: '#athletes', label: 'X Athletes' },
    { href: '#join', label: 'Join' },
    { href: '#contact', label: 'Support' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full py-4 px-6 md:px-12 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
        : 'bg-white/90 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          className="text-3xl font-bebas tracking-wider hover:text-corex-red transition-colors duration-300 transform hover:scale-105"
        >
          CORE X
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a 
              key={item.href}
              href={item.href} 
              className="font-medium hover:text-corex-red transition-all duration-300 relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-corex-red transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <div className="flex items-center space-x-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {/* Search Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-corex-red transition-colors duration-300"
            >
              <Search size={20} />
            </Button>
            
            {/* User Profile */}
            <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:text-corex-red transition-colors duration-300"
                >
                  {profile ? (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name || ""} />
                      <AvatarFallback className="text-xs">
                        {(profile.full_name || "").split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <User size={20} />
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <ProfileDisplay onClose={() => setProfileOpen(false)} />
              </DialogContent>
            </Dialog>
            
            {/* Shopping Cart */}
            <ShoppingCart />
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ShoppingCart />
          <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                {profile ? (
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name || ""} />
                    <AvatarFallback className="text-xs">
                      {(profile.full_name || "").split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <User size={20} />
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <ProfileDisplay onClose={() => setProfileOpen(false)} />
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Search Bar */}
      {searchOpen && (
        <div className="mt-4 animate-slide-in-left">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSearch}>
              <Input
                placeholder="Search products, categories..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 md:hidden animate-slide-in-left">
          <div className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <a 
                key={item.href}
                href={item.href} 
                className="font-medium py-2 hover:text-corex-red transition-colors duration-300 animate-fade-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center space-x-4 pt-2 border-t border-gray-200">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)}>
                <Search size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdvancedNavbar;
