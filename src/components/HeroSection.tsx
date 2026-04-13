import heroBg from "@/assets/hero-bg.webp";
import { Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Urgency banner */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm mb-8 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-primary text-sm font-semibold tracking-wide">
            🔥 Limited Time — 20% OFF for Online Customers
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight tracking-tight">
          Custom Sofa & Bed Maker in{" "}
          <span className="text-primary italic">Kolkata</span>
        </h1>

        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-6 font-light">
          Premium handcrafted sofas & designer beds — built to your style.
        </p>

        {/* Pricing highlight */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="px-5 py-2.5 rounded-lg bg-card/80 border border-primary/30 backdrop-blur-sm">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Sofa Starting</p>
            <p className="text-2xl font-bold text-primary font-serif">₹4,999</p>
          </div>
          <div className="px-5 py-2.5 rounded-lg bg-card/80 border border-primary/30 backdrop-blur-sm">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Bed Starting</p>
            <p className="text-2xl font-bold text-primary font-serif">₹6,999</p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-10">
          <span className="flex items-center gap-1.5">
            <span className="text-primary">✓</span> 70+ Happy Customers
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-primary">✓</span> Same Day Visit Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-primary">✓</span> 5-Star Google Rated
          </span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+918910724040"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base gold-glow transition-all duration-300 hover:scale-105"
          >
            <Phone className="w-5 h-5" />
            Call Now for Instant Price
          </a>
          <a
            href="https://wa.me/918910724040?text=I%20want%20custom%20sofa%20or%20bed%20quote"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-green-500 text-green-400 font-semibold text-base transition-all duration-300 hover:bg-green-500/10 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp for Quick Quote
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-primary/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
