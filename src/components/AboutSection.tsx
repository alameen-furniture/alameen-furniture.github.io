import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, Users, Award } from "lucide-react";

const AboutSection = () => {
  const ref = useScrollAnimation();

  return (
    <section id="about" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="animate-scroll-fade">
          <div className="relative rounded-lg overflow-hidden aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80"
              alt="Al Ameen Furniture workshop — custom furniture craftsmanship in Kolkata"
              className="w-full h-full object-cover img-zoom"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-3">
                <a href="https://share.google/hwZRaQpBDTIYWTj27" target="_blank" rel="noopener noreferrer" className="group relative rounded-xl border border-primary/30 bg-background/80 backdrop-blur-md p-4 overflow-hidden animate-border-glow hover:border-primary/60 transition-all duration-500 cursor-pointer no-underline">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Customers</span>
                    </div>
                    <p className="font-serif text-3xl font-bold text-primary animate-count">50+</p>
                    <p className="text-muted-foreground text-xs mt-1">Happy & Satisfied</p>
                  </div>
                </a>

                <a href="https://share.google/hwZRaQpBDTIYWTj27" target="_blank" rel="noopener noreferrer" className="group relative rounded-xl border border-primary/30 bg-background/80 backdrop-blur-md p-4 overflow-hidden animate-border-glow hover:border-primary/60 transition-all duration-500 cursor-pointer no-underline" style={{ animationDelay: '1.5s' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Award className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Rating</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <p className="font-serif text-3xl font-bold text-primary">5</p>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-primary fill-primary" style={{ animationDelay: `${i * 150}ms` }} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs mt-1">Google Reviews</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-scroll-fade" style={{ transitionDelay: "200ms" }}>
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">About Us</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Premium <span className="text-primary italic">Furniture Manufacturer</span> in Kolkata
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Al Ameen Furniture is Kolkata's trusted custom furniture maker with 50+ satisfied customers. We craft premium sofas, designer beds, wardrobes & complete home interiors.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Every piece reflects meticulous attention to detail, superior materials, and timeless craftsmanship. Your vision, our expertise.
          </p>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
          >
            View Our Portfolio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
