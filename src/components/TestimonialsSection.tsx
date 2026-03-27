import { useRef, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, ExternalLink, CheckCircle } from "lucide-react";
import { useState } from "react";

const reviews = [
  { author: "Md. Arman Khan", text: "Good behaviour and fast service." },
  { author: "Ayaan Ali", text: "Very good furniture work and finishing." },
  { author: "Saif Ahmed", text: "Nice design and quality is very good." },
  { author: "Imran Hussain", text: "Professional work and timely delivery." },
  { author: "Faizan Khan", text: "Very satisfied with the custom sofa work." },
];

const Stars = () => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} className="w-4 h-4 fill-primary text-primary" />
    ))}
  </div>
);

const ReviewCard = ({ review, index }: { review: typeof reviews[0]; index: number }) => (
  <div
    className="flex-shrink-0 w-[85vw] sm:w-[320px] snap-center"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    <div className="h-full bg-card border border-border/30 rounded-2xl p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-500">
      <Stars />
      <p className="text-foreground text-sm leading-relaxed">
        "{review.text}"
      </p>
      <div className="mt-auto pt-3 border-t border-border/20">
        <p className="text-foreground font-semibold text-sm">– {review.author}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary text-xs font-medium">Verified Customer</span>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );
    const children = el.querySelectorAll(".animate-scroll-fade");
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 animate-scroll-fade">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-sans">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
            Rated 5<span className="text-primary">⭐</span> by 50+ Happy Customers on Google
          </h2>
          <div className="w-16 h-[1px] bg-primary mx-auto mt-6" />
        </div>

        {/* Carousel */}
        <div className="relative animate-scroll-fade">
          <button
            onClick={() => scroll("left")}
            className={`hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 ${
              canScrollLeft ? "opacity-100 hover:border-primary hover:text-primary" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 ${
              canScrollRight ? "opacity-100 hover:border-primary hover:text-primary" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} index={i} />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10 animate-scroll-fade">
          <a
            href="https://share.google/nnaV7LoYXubIFYTg8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
          >
            View All Reviews on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
