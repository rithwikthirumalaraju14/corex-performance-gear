
import AdvancedNavbar from '@/components/AdvancedNavbar';
import AdvancedHero from '@/components/AdvancedHero';
import AdvancedShopSection from '@/components/AdvancedShopSection';
import AboutSection from '@/components/AboutSection';
import AthletesSection from '@/components/AthletesSection';
import JoinSection from '@/components/JoinSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Chatbot from "../components/Chatbot";

const Index = () => {
  return (
    <>
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
      <Chatbot />
    </>
  );
};

export default Index;
