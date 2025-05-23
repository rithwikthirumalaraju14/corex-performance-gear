
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageSquare, Headphones } from 'lucide-react';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ContactSection = () => {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formValues.name || !formValues.email || !formValues.message) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Our support team will get back to you shortly.",
      });
      
      // Reset form
      setFormValues({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-12 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-5xl md:text-6xl mb-6 font-bebas">Support & Contact</h2>
          <p className="text-lg mb-8">
            Have questions about our products, sizing, or training suggestions? Our support team is ready to help.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="mr-4 h-6 w-6 text-corex-red" />
              <div>
                <h3 className="text-xl font-bold">Email Support</h3>
                <p className="mt-1">support@corexsport.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Headphones className="mr-4 h-6 w-6 text-corex-red" />
              <div>
                <h3 className="text-xl font-bold">Call Us</h3>
                <p className="mt-1">1-800-CORE-GYM</p>
                <p className="text-sm text-gray-500">Mon-Fri: 9am - 5pm EST</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MessageSquare className="mr-4 h-6 w-6 text-corex-red" />
              <div>
                <h3 className="text-xl font-bold">Quick Links</h3>
                <ul className="mt-1 space-y-1">
                  <li><a href="#" className="text-corex-red hover:underline">Size Guide</a></li>
                  <li><a href="#" className="text-corex-red hover:underline">Shipping & Returns</a></li>
                  <li><a href="#" className="text-corex-red hover:underline">Product Care</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="How can we help you?"
                  rows={5}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-corex-red text-white"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
