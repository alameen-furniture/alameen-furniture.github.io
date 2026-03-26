import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import sofaChesterfield from "@/assets/portfolio/sofa-chesterfield.webp";
import bedQuiltedLuxury from "@/assets/portfolio/bed-quilted-luxury.webp";
import bedGoldenWardrobe from "@/assets/portfolio/bed-golden-wardrobe.webp";
import bedElegantWhite from "@/assets/portfolio/bed-elegant-white.webp";
import bedTuftedBeige from "@/assets/portfolio/bed-tufted-beige.webp";
import bedBlackDiamond from "@/assets/portfolio/bed-black-diamond.webp";
import bedGreyModern from "@/assets/portfolio/bed-grey-modern.webp";
import bedTealLuxury from "@/assets/portfolio/bed-teal-luxury.webp";
import bedClassicGrey from "@/assets/portfolio/bed-classic-grey.webp";
import bedGoldTrim from "@/assets/portfolio/bed-gold-trim.webp";

const categories = ["All", "Sofas", "Beds", "Custom Projects"] as const;

const portfolioItems = [
  { id: 1, category: "Sofas", title: "Royal Chesterfield Sofa", image: sofaChesterfield },
  { id: 2, category: "Beds", title: "Quilted Luxury Bed", image: bedQuiltedLuxury },
  { id: 3, category: "Custom Projects", title: "Golden Wardrobe & Bed Suite", image: bedGoldenWardrobe },
  { id: 4, category: "Beds", title: "Elegant White Bedroom", image: bedElegantWhite },
  { id: 5, category: "Beds", title: "Tufted Beige Bed", image: bedTuftedBeige },
  { id: 6, category: "Beds", title: "Black Diamond Bed", image: bedBlackDiamond },
  { id: 7, category: "Beds", title: "Grey Modern Bed", image: bedGreyModern },
  { id: 8, category: "Beds", title: "Teal Luxury Bed", image: bedTealLuxury },
  { id: 9, category: "Beds", title: "Classic Grey Bedroom", image: bedClassicGrey },
  { id: 10, category: "Beds", title: "Gold Trim Bed", image: bedGoldTrim },
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
          <div className="w-16 h-[1px] bg-primary mx-auto mt-6" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-14 animate-scroll-fade">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="animate-scroll-fade group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer border border-border/30 hover:border-primary/40 transition-all duration-500"
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => setLightbox(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                <div>
                  <p className="text-primary text-xs uppercase tracking-widest mb-1">{item.category}</p>
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
                src={lightbox.image}
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
