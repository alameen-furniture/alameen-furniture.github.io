import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";

// Sofa imports
import sofaChesterfield from "@/assets/portfolio/sofa-chesterfield.webp";
import sofaVelvet from "@/assets/portfolio/sofa-velvet-chesterfield.webp";
import sofaBeigeSet from "@/assets/portfolio/sofa-beige-set.webp";
import sofaMint from "@/assets/portfolio/sofa-mint-sectional.webp";
import sofaCream from "@/assets/portfolio/sofa-cream-curved.webp";
import sofaGreyCorner from "@/assets/portfolio/sofa-grey-corner.webp";
import sofaSage from "@/assets/portfolio/sofa-sage-tufted.webp";
import sofaElegant from "@/assets/portfolio/sofa-elegant-living.webp";

// Bed imports
import bedQuiltedLuxury from "@/assets/portfolio/bed-quilted-luxury.webp";
import bedElegantWhite from "@/assets/portfolio/bed-elegant-white.webp";
import bedTuftedBeige from "@/assets/portfolio/bed-tufted-beige.webp";
import bedBlackDiamond from "@/assets/portfolio/bed-black-diamond.webp";
import bedGreyModern from "@/assets/portfolio/bed-grey-modern.webp";
import bedTealLuxury from "@/assets/portfolio/bed-teal-luxury.webp";
import bedClassicGrey from "@/assets/portfolio/bed-classic-grey.webp";
import bedGoldTrim from "@/assets/portfolio/bed-gold-trim.webp";

// Custom Projects
import bedGoldenWardrobe from "@/assets/portfolio/bed-golden-wardrobe.webp";

type PortfolioItem = { id: number; title: string; image: string };

type Category = {
  key: string;
  label: string;
  description: string;
  cover: string;
  items: PortfolioItem[];
};

const categories: Category[] = [
  {
    key: "sofas",
    label: "Sofas",
    description: "Handcrafted luxury sofas & seating collections",
    cover: sofaVelvet,
    items: [
      { id: 1, title: "Royal Chesterfield Sofa", image: sofaChesterfield },
      { id: 2, title: "Velvet Burgundy Chesterfield", image: sofaVelvet },
      { id: 3, title: "Gold-Accent Beige Set", image: sofaBeigeSet },
      { id: 4, title: "Mint Sectional Sofa", image: sofaMint },
      { id: 5, title: "Cream Curved Sofa", image: sofaCream },
      { id: 6, title: "Grey Corner Sofa", image: sofaGreyCorner },
      { id: 7, title: "Sage Tufted L-Shape", image: sofaSage },
      { id: 8, title: "Elegant Living Room Set", image: sofaElegant },
    ],
  },
  {
    key: "beds",
    label: "Beds",
    description: "Premium bedroom furniture & designer beds",
    cover: bedQuiltedLuxury,
    items: [
      { id: 9, title: "Quilted Luxury Bed", image: bedQuiltedLuxury },
      { id: 10, title: "Elegant White Bedroom", image: bedElegantWhite },
      { id: 11, title: "Tufted Beige Bed", image: bedTuftedBeige },
      { id: 12, title: "Black Diamond Bed", image: bedBlackDiamond },
      { id: 13, title: "Grey Modern Bed", image: bedGreyModern },
      { id: 14, title: "Teal Luxury Bed", image: bedTealLuxury },
      { id: 15, title: "Classic Grey Bedroom", image: bedClassicGrey },
      { id: 16, title: "Gold Trim Bed", image: bedGoldTrim },
    ],
  },
  {
    key: "custom",
    label: "Custom Projects",
    description: "Bespoke furniture tailored to your vision",
    cover: bedGoldenWardrobe,
    items: [
      { id: 17, title: "Golden Wardrobe & Bed Suite", image: bedGoldenWardrobe },
    ],
  },
];

const CategoryGallery = () => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Re-trigger scroll animations when view changes
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 0px 0px" }
    );

    // Small delay to ensure DOM has updated
    const timer = setTimeout(() => {
      const children = el.querySelectorAll(".animate-scroll-fade");
      children.forEach((child) => observer.observe(child));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [activeCategory]);

  return (
    <section id="portfolio" className="py-24 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-scroll-fade">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-sans">
            Portfolio
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
            Our <span className="text-primary italic">Finest</span> Creations
          </h2>
          <div className="w-16 h-[1px] bg-primary mx-auto mt-6" />
        </div>

        {/* Category Cards View */}
        {!activeCategory && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat)}
                className="animate-scroll-fade group relative overflow-hidden rounded-xl border border-border/30 hover:border-primary/50 transition-all duration-700 text-left hover:-translate-y-2 gold-glow-hover"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="aspect-[3/4] sm:aspect-[4/5] relative overflow-hidden">
                  <img
                    src={cat.cover}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="text-primary text-xs uppercase tracking-[0.25em] mb-2 font-sans">
                      {cat.items.length} {cat.items.length === 1 ? "piece" : "pieces"}
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {cat.label}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      <span>View Collection</span>
                      <span className="text-lg">→</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Category Detail View */}
        {activeCategory && (
          <div className="animate-fade-in">
            {/* Back button */}
            <button
              onClick={() => setActiveCategory(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm uppercase tracking-widest">All Collections</span>
            </button>

            {/* Category header */}
            <div className="mb-10">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                {activeCategory.label}
              </h3>
              <p className="text-muted-foreground mt-2">{activeCategory.description}</p>
              <div className="w-12 h-[1px] bg-primary mt-4" />
            </div>

            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {activeCategory.items.map((item, i) => (
                <div
                  key={item.id}
                  className="animate-scroll-fade group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer border border-border/20 hover:border-primary/40 hover:-translate-y-1 transition-all duration-500"
                  style={{ transitionDelay: `${i * 80}ms` }}
                  onClick={() => setLightbox(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <p className="text-foreground font-serif text-sm sm:text-base font-semibold">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl bg-transparent border-none p-0 shadow-none [&>button]:text-white [&>button]:bg-black/60 [&>button]:rounded-full [&>button]:p-1.5 [&>button]:top-2 [&>button]:right-2">
          {lightbox && (
            <div className="flex flex-col items-center">
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="w-full bg-card/90 backdrop-blur-sm rounded-b-lg px-4 py-3 -mt-1">
                <p className="text-foreground font-serif text-lg font-semibold">
                  {lightbox.title}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CategoryGallery;
