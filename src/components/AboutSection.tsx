import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const ref = useScrollAnimation();

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="animate-scroll-fade">
          <div className="relative rounded-lg overflow-hidden aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80"
              alt="Al Ameen Furniture craftsmanship"
              className="w-full h-full object-cover img-zoom"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-8">
              <div className="flex gap-8">
                <div>
                  <p className="font-serif text-3xl font-bold text-primary">50+</p>
                  <p className="text-muted-foreground text-sm">Happy Customers</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-primary">5★</p>
                  <p className="text-muted-foreground text-sm">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-scroll-fade" style={{ transitionDelay: "200ms" }}>
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">About Us</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
            A Legacy of <span className="text-primary italic">Fine Craftsmanship</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Al Ameen Furniture is a trusted furniture manufacturer in Kolkata with 50+ satisfied customers and 5-star reviews. We specialize in crafting premium custom furniture including sofas, beds, wardrobes, and complete home interiors.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Every piece we create is a reflection of meticulous attention to detail, superior materials, and the timeless art of furniture making. Your vision, our craftsmanship.
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
