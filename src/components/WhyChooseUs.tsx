import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Gem, ShieldCheck, Paintbrush, Users } from "lucide-react";

const features = [
  {
    icon: Paintbrush,
    title: "100% Custom Design",
    desc: "Sofas & beds tailored to your space and style.",
  },
  {
    icon: Gem,
    title: "Premium Materials",
    desc: "Finest wood, fabric & hardware for lasting quality.",
  },
  {
    icon: ShieldCheck,
    title: "Expert Craftsmanship",
    desc: "Decades of sofa & bed making experience in Kolkata.",
  },
  {
    icon: Users,
    title: "70+ Happy Customers",
    desc: "Consistently 5-star rated on Google.",
  },
];

const WhyChooseUs = () => {
  const ref = useScrollAnimation();

  return (
    <section className="py-28 px-6 bg-card/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-scroll-fade">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Why Choose Us</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
            Kolkata's Trusted <span className="text-primary italic">Sofa & Bed Maker</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="animate-scroll-fade group relative p-8 rounded-xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/50"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative z-10">
                <div className="w-14 h-14 mb-5 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors duration-300">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mid-page CTA */}
        <div className="mt-14 text-center animate-scroll-fade">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+918910724040"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:scale-105 gold-glow"
            >
              📞 Call Now for Instant Price
            </a>
            <a
              href="https://wa.me/918910724040?text=I%20want%20custom%20sofa%20or%20bed%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-green-500 text-green-400 font-semibold transition-all duration-300 hover:bg-green-500/10 hover:scale-105"
            >
              💬 WhatsApp for Quick Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
