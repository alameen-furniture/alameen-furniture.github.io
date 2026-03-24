import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const categories = ["All", "Sofas", "Beds", "Wardrobes", "Custom Projects"] as const;

const portfolioItems = [
  { id: 1, category: "Sofas", title: "Royal Chesterfield Sofa", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" },
  { id: 2, category: "Beds", title: "Elegant King Bed", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80" },
  { id: 3, category: "Wardrobes", title: "Walk-in Wardrobe", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80" },
  { id: 4, category: "Sofas", title: "Modern L-Shape Sofa", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80" },
  { id: 5, category: "Custom Projects", title: "Custom TV Unit", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" },
  { id: 6, category: "Beds", title: "Platform Storage Bed", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80" },
  { id: 7, category: "Wardrobes", title: "Sliding Door Wardrobe", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80" },
  { id: 8, category: "Custom Projects", title: "Complete Interior", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80" },
];

const PortfolioGallery = () => {
  const [active, setActive] = useState<typeof categories[number]>("All");
  const [lightbox, setLightbox] = useState<typeof portfolioItems[number] | null>(null);
  const ref = useScrollAnimation();

  const filtered = active === "All" ? portfolioItems : portfolioItems.filter((i) => i.category === active);

  return (
    <section id="portfolio" className="py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-scroll-fade">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-sans">Portfolio</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
            Our <span className="text-primary italic">Finest</span> Creations
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-scroll-fade">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-primary text-primary-foreground gold-glow"
                  : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="animate-scroll-fade group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setLightbox(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover img-zoom"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                <div>
                  <p className="text-primary text-xs uppercase tracking-widest">{item.category}</p>
                  <p className="text-foreground font-serif text-lg font-semibold">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-4xl bg-card border-border p-2">
          {lightbox && (
            <div>
              <img
                src={lightbox.image.replace("w=800", "w=1400")}
                alt={lightbox.title}
                className="w-full rounded-lg"
              />
              <div className="p-4">
                <p className="text-primary text-xs uppercase tracking-widest">{lightbox.category}</p>
                <p className="text-foreground font-serif text-xl font-semibold">{lightbox.title}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioGallery;
