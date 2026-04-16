import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { scrollToSection } from "@/utils/scrollToSection";

const navLinks = [
  { label: "Portfolio", section: "portfolio" },
  { label: "About", section: "about" },
  { label: "Contact", section: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (section: string) => {
    setMenuOpen(false);
    scrollToSection(section, navigate);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border/50 py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl font-bold text-foreground">
          Al Ameen <span className="text-primary">Furniture</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button key={l.label} onClick={() => handleNav(l.section)} className="text-sm text-muted-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer">
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("quote")}
            className="px-5 py-2 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent cursor-pointer"
          >
            Get Quote
          </button>
        </nav>

        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border mt-2 px-6 py-6 space-y-4">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => handleNav(l.section)}
              className="block text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer text-base"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("quote")}
            className="block w-full text-center py-3 rounded-full border border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all bg-transparent cursor-pointer"
          >
            Get Quote
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
