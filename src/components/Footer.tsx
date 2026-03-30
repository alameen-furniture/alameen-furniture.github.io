import { Phone, Mail, MapPin, Clock, ChevronRight } from "lucide-react";

const quickLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "About Us", href: "#about" },
  { label: "Get a Quote", href: "#quote" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Custom Sofas & Sectionals",
  "Designer Beds & Headboards",
  "Wardrobes & Closets",
  "Complete Home Interiors",
  "Office Furniture",
  "Furniture Restoration",
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
              Al Ameen <span className="text-primary">Furniture</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Kolkata's trusted manufacturer of premium custom furniture. From luxurious sofas to bespoke wardrobes, we bring your vision to life with master craftsmanship.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-xs">★</span>
                ))}
              </div>
              <span className="text-muted-foreground">5.0 · 50+ Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-base font-semibold text-foreground mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="text-sm text-muted-foreground">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-base font-semibold text-foreground mb-4">Get in Touch</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+918910724040" className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                  <Phone className="w-4 h-4 mt-0.5 text-primary/70 group-hover:text-primary transition-colors" />
                  <span>+91 89107 24040</span>
                </a>
              </li>
              <li>
                <a href="mailto:akbarkhan891071@gmail.com" className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                  <Mail className="w-4 h-4 mt-0.5 text-primary/70 group-hover:text-primary transition-colors" />
                  <span>akbarkhan891071@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary/70 shrink-0" />
                <span>7/2 Ekbalpore Road, Near Khidirpur, Kolkata 700023</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mt-0.5 text-primary/70" />
                <span>Mon – Sat: 10 AM – 8 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Al Ameen Furniture. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Custom Furniture Manufacturer in Kolkata · Sofas · Beds · Wardrobes · Home Interiors
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
