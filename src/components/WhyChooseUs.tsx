import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Gem, ShieldCheck, Paintbrush, Users } from "lucide-react";

const features = [
  {
    icon: Paintbrush,
    title: "100% Custom Design",
    desc: "Tailored to your space and style.",
  },
  {
    icon: Gem,
    title: "Premium Materials",
    desc: "Finest wood, fabric & hardware.",
  },
  {
    icon: ShieldCheck,
    title: "Expert Craftsmanship",
    desc: "Decades of fine furniture experience.",
  },
  {
    icon: Users,
    title: "50+ Happy Customers",
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
            Kolkata's Trusted <span className="text-primary italic">Furniture Maker</span>
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
      </div>
    </section>
  );
};

export default WhyChooseUs;
