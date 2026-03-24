const Footer = () => {
  const links = [
    { label: "Portfolio", href: "#portfolio" },
    { label: "About", href: "#about" },
    { label: "Get Quote", href: "#quote" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="font-serif text-xl font-bold text-foreground">
            Al Ameen <span className="text-primary">Furniture</span>
          </h3>
          <p className="text-muted-foreground text-sm mt-1">Premium Custom Furniture · Kolkata</p>
        </div>

        <nav className="flex gap-6">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="text-sm text-muted-foreground">
          <a href="tel:+918910724040" className="hover:text-primary transition-colors">+91 89107 24040</a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Al Ameen Furniture. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
