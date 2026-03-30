import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Gem, ShieldCheck, Paintbrush, Users, Sparkles } from "lucide-react";

const features = [
  {
    icon: Paintbrush,
    title: "Custom Design",
    desc: "Furniture tailored precisely to your space, style and requirements.",
    gradient: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: Gem,
    title: "Premium Materials",
    desc: "Only the finest wood, fabric and hardware for lasting elegance.",
    gradient: "from-yellow-500/20 to-amber-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Expert Craftsmanship",
    desc: "Master artisans with decades of experience in fine furniture.",
    gradient: "from-orange-500/20 to-yellow-500/10",
  },
  {
    icon: Users,
    title: "Trusted by 50+",
    desc: "Delighted clients with consistently 5-star Google reviews.",
    gradient: "from-amber-600/20 to-yellow-600/10",
  },
];

const WhyChooseUs = () => {
  const ref = useScrollAnimation();

  return (
    <section className="py-24 px-6 bg-card/50 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-scroll-fade">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-primary uppercase tracking-[0.3em] text-sm">Why Choose Us</p>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
            The <span className="text-primary italic">Al Ameen</span> Difference
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="animate-scroll-fade group relative p-8 rounded-xl border border-border bg-card overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:border-primary/50"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Animated gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              {/* Glow effect */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10">
                {/* Icon with animated ring */}
                <div className="relative w-16 h-16 mb-6">
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-500" />
                  <div className="w-full h-full rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-500">
                    <f.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>

                <h3 className="font-serif text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>

                {/* Bottom accent line */}
                <div className="mt-6 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary/80 to-primary/20 transition-all duration-700 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
