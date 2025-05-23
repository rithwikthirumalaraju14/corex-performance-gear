
import AdvancedNavbar from '@/components/AdvancedNavbar';
import AdvancedHero from '@/components/AdvancedHero';
import AdvancedShopSection from '@/components/AdvancedShopSection';
import AboutSection from '@/components/AboutSection';
import AthletesSection from '@/components/AthletesSection';
import JoinSection from '@/components/JoinSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { ShoppingCartProvider } from '@/contexts/ShoppingCartContext';

const Index = () => {
  return (
    <ShoppingCartProvider>
      <div className="min-h-screen">
        <AdvancedNavbar />
        <AdvancedHero />
        <AdvancedShopSection />
        <AboutSection />
        <AthletesSection />
        <JoinSection />
        <ContactSection />
        <Footer />
      </div>
    </ShoppingCartProvider>
  );
};

export default Index;
