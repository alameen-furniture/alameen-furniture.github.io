import { useState, useRef, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source?: string;
};

const placeholderReviews: Review[] = [
  {
    id: "1",
    author: "Rajesh Kumar",
    rating: 5,
    text: "Absolutely stunning craftsmanship! The Chesterfield sofa they made for our living room is the centerpiece of our home. Every guest compliments it. Truly premium quality.",
    date: "2 weeks ago",
    source: "Google",
  },
  {
    id: "2",
    author: "Priya Sharma",
    rating: 5,
    text: "We got a custom king-size bed with tufted headboard. The attention to detail is remarkable. Al Ameen Furniture delivered exactly what we envisioned, on time and within budget.",
    date: "1 month ago",
    source: "Google",
  },
  {
    id: "3",
    author: "Amit Banerjee",
    rating: 5,
    text: "Best furniture maker in Kolkata! Got our entire bedroom set custom-made. The wood quality and finishing are outstanding. Highly recommend for anyone looking for premium furniture.",
    date: "3 weeks ago",
    source: "Google",
  },
  {
    id: "4",
    author: "Sneha Das",
    rating: 4,
    text: "Beautiful L-shaped sofa in sage green velvet. The fabric quality is excellent and the design is exactly what I wanted. Great communication throughout the process.",
    date: "1 month ago",
    source: "Google",
  },
  {
    id: "5",
    author: "Mohammad Iqbal",
    rating: 5,
    text: "Third time ordering from Al Ameen and they never disappoint. This time we got a complete wardrobe system with gold accents. Absolutely world-class work!",
    date: "2 months ago",
    source: "Google",
  },
  {
    id: "6",
    author: "Ananya Mukherjee",
    rating: 5,
    text: "The quality of their beds is exceptional. Got a diamond-tufted bed in black velvet — it looks like it belongs in a five-star hotel. Worth every penny.",
    date: "3 months ago",
    source: "Google",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${
          star <= rating
            ? "fill-primary text-primary"
            : "fill-muted text-muted"
        }`}
      />
    ))}
  </div>
);

const ReviewCard = ({ review, index }: { review: Review; index: number }) => (
  <div
    className="flex-shrink-0 w-[85vw] sm:w-[380px] snap-center"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="h-full bg-card border border-border/40 rounded-xl p-6 sm:p-8 flex flex-col gap-4 hover:border-primary/30 transition-colors duration-500">
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-primary/30" />

      {/* Review text */}
      <p className="text-muted-foreground text-sm leading-relaxed flex-1 italic">
        "{review.text}"
      </p>

      {/* Rating + Author */}
      <div className="pt-4 border-t border-border/30">
        <StarRating rating={review.rating} />
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-foreground font-semibold text-sm">{review.author}</p>
            <p className="text-muted-foreground text-xs mt-0.5">{review.date}</p>
          </div>
          {review.source && (
            <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">
              {review.source}
            </span>
          )}
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

  const reviews = placeholderReviews;

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

  // Scroll animation observer
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
    const amount = direction === "left" ? -340 : 340;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Average rating
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 animate-scroll-fade">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4 font-sans">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
            What Our <span className="text-primary italic">Clients</span> Say
          </h2>
          <div className="w-16 h-[1px] bg-primary mx-auto mt-6" />

          {/* Average rating badge */}
          <div className="inline-flex items-center gap-3 mt-8 px-6 py-3 bg-card border border-border/40 rounded-full">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-foreground font-semibold">{avgRating}</span>
            <span className="text-muted-foreground text-sm">
              · {reviews.length} reviews
            </span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative animate-scroll-fade">
          {/* Navigation arrows — desktop only */}
          <button
            onClick={() => scroll("left")}
            className={`hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 ${
              canScrollLeft
                ? "opacity-100 hover:border-primary hover:text-primary"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 ${
              canScrollRight
                ? "opacity-100 hover:border-primary hover:text-primary"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
