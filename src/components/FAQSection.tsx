import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I order custom furniture from Al Ameen Furniture?",
    answer:
      "Simply fill out our order form on this website or contact us via WhatsApp at +91 89107 24040. Share your design idea, dimensions, and preferred materials — we'll provide a free quote within 24 hours.",
  },
  {
    question: "What types of custom furniture do you manufacture?",
    answer:
      "We specialize in custom sofas & sectionals, designer beds & headboards, wardrobes & closets, TV units, dining tables, office furniture, and complete home interiors. Every piece is handcrafted to your specifications.",
  },
  {
    question: "How long does it take to build custom furniture?",
    answer:
      "Depending on the complexity of the design, most custom pieces are completed within 2–4 weeks. Larger projects like full home interiors may take 4–8 weeks. We keep you updated at every stage.",
  },
  {
    question: "Do you deliver furniture across Kolkata?",
    answer:
      "Yes! We offer free delivery and installation across Kolkata and surrounding areas. For locations outside Kolkata, please contact us for delivery options and charges.",
  },
  {
    question: "Can I see samples or visit your workshop?",
    answer:
      "Absolutely! You're welcome to visit our workshop at 36, 4/3 Behari Mondal Road, Shanti Pally, Ramlal Bazar, Haltu, Kolkata 700078. We're open Monday to Saturday, 10 AM – 8 PM.",
  },
  {
    question: "What materials do you use for furniture making?",
    answer:
      "We use premium-grade plywood, solid wood, high-density foam, imported fabrics, and top-quality hardware. Every material is selected for durability, comfort, and aesthetics.",
  },
  {
    question: "Do you offer furniture repair and restoration services?",
    answer:
      "Yes, we provide professional furniture restoration and reupholstery services. Whether it's repairing a vintage piece or refreshing your old sofa, we can bring it back to life.",
  },
  {
    question: "What is the price range for custom furniture?",
    answer:
      "Our prices vary based on design, size, and materials. Custom sofas typically start from ₹15,000, beds from ₹12,000, and wardrobes from ₹18,000. Contact us for a personalized quote tailored to your budget.",
  },
];

const FAQSection = () => {
  const ref = useScrollAnimation();

  return (
    <section id="faq" className="py-24 px-6 bg-card/30" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 animate-scroll-fade">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Common Questions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Frequently Asked{" "}
            <span className="text-primary italic">Questions</span>
          </h2>
        </div>

        <div className="animate-scroll-fade" style={{ transitionDelay: "150ms" }}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-xl px-5 bg-background/50 backdrop-blur-sm data-[state=open]:border-primary/40 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-medium text-foreground hover:text-primary hover:no-underline transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
