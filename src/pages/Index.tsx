import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryGallery from "@/components/CategoryGallery";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import OrderForm from "@/components/OrderForm";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CategoryGallery />
        <AboutSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <OrderForm />
        <WhatsAppCTA />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
