import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Gem, ShieldCheck, Paintbrush, Users } from "lucide-react";

const features = [
  { icon: Paintbrush, title: "Custom Design Solutions", desc: "Furniture tailored precisely to your space, style and requirements." },
  { icon: Gem, title: "Premium Quality Materials", desc: "Only the finest wood, fabric and hardware for lasting elegance." },
  { icon: ShieldCheck, title: "Skilled Craftsmanship", desc: "Master artisans with decades of experience in fine furniture." },
  { icon: Users, title: "Trusted by Customers", desc: "50+ delighted clients with consistently 5-star reviews." },
];

const WhyChooseUs = () => {
  const ref = useScrollAnimation();

  return (
    <section className="py-24 px-6 bg-card/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-scroll-fade">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Why Choose Us</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
            The <span className="text-primary italic">Al Ameen</span> Difference
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="animate-scroll-fade group p-8 rounded-xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 gold-glow-hover"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
