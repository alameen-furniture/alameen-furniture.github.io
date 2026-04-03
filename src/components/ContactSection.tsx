import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  const ref = useScrollAnimation();
  const [showMap, setShowMap] = useState(false);

  return (
    <section id="contact" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-scroll-fade">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Get in Touch</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-foreground mb-3">
            Visit Our <span className="text-primary italic">Workshop</span> in Kolkata
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Call now for a free consultation. Serving all areas of Kolkata.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-scroll-fade space-y-8">
            {[
              { icon: Phone, label: "Phone", value: "+91 89107 24040", href: "tel:+918910724040", highlight: true },
              { icon: Mail, label: "Email", value: "akbarkhan891071@gmail.com", href: "mailto:akbarkhan891071@gmail.com", highlight: false },
              { icon: MapPin, label: "Address", value: "36, 4/3, Behari Mondal Rd, Shanti Pally, Ramlal Bazar, Haltu, Kolkata, West Bengal 700078", href: "https://maps.google.com/?q=36,+4/3,+Behari+Mondal+Rd,+Haltu,+Kolkata+700078", highlight: false },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "Address" ? "_blank" : undefined}
                rel={item.label === "Address" ? "noopener noreferrer" : undefined}
                className="flex gap-5 group"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${item.highlight ? 'bg-primary/20 group-hover:bg-primary/30' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <p className={`group-hover:text-primary transition-colors ${item.highlight ? 'text-primary font-semibold text-lg' : 'text-foreground'}`}>{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="animate-scroll-fade rounded-xl overflow-hidden border border-border" style={{ transitionDelay: "200ms" }}>
            {showMap ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.046456648257!2d88.38840100000002!3d22.5024401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277f38a4c1f75%3A0x69e50d076b20ed9a!2sAl-%20Ameen%20Furniture!5e0!3m2!1sen!2sin!4v1774712213617!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Al Ameen Furniture — Custom Furniture Manufacturer in Kolkata"
              />
            ) : (
              <button
                onClick={() => setShowMap(true)}
                className="w-full h-[400px] bg-secondary/50 flex flex-col items-center justify-center gap-4 hover:bg-secondary/70 transition-colors duration-300"
              >
                <MapPin className="w-10 h-10 text-primary" />
                <span className="text-foreground font-serif text-lg font-semibold">View on Map</span>
                <span className="text-muted-foreground text-sm">Tap to load Google Maps</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
