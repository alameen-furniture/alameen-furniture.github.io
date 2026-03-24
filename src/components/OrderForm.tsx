import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const OrderForm = () => {
  const ref = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string || "").trim();
    const phone = (data.get("phone") as string || "").trim();
    const email = (data.get("email") as string || "").trim();
    const requirement = (data.get("requirement") as string || "").trim();

    if (!name || !phone) {
      toast({ title: "Please fill in your name and phone number.", variant: "destructive" });
      return;
    }

    const subject = encodeURIComponent("Custom Furniture Enquiry from " + name);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nRequirement: ${requirement}`
    );
    window.open(`mailto:akbarkhan891071@gmail.com?subject=${subject}&body=${body}`, "_self");

    setSubmitted(true);
    toast({ title: "Thank you! We will contact you shortly." });
  };

  return (
    <section id="quote" className="py-24 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-scroll-fade">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Get a Quote</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
            Request a <span className="text-primary italic">Custom</span> Order
          </h2>
        </div>

        {submitted ? (
          <div className="animate-scroll-fade visible text-center py-16 border border-border rounded-xl bg-card p-8">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="font-serif text-2xl text-foreground mb-3">Thank You!</h3>
            <p className="text-muted-foreground mb-6">We will contact you shortly. You can also send your design on WhatsApp for a faster response.</p>
            <a
              href="https://wa.me/918910724040?text=I%20want%20custom%20furniture%20design"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold gold-glow transition-all duration-300 hover:scale-105"
            >
              Chat on WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="animate-scroll-fade space-y-5 border border-border rounded-xl bg-card p-8 sm:p-10">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Name *</label>
                <Input name="name" required placeholder="Your name" className="bg-secondary border-border focus:border-primary" maxLength={100} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Phone *</label>
                <Input name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" className="bg-secondary border-border focus:border-primary" maxLength={20} />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
              <Input name="email" type="email" placeholder="your@email.com" className="bg-secondary border-border focus:border-primary" maxLength={255} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Your Requirement</label>
              <Textarea name="requirement" rows={4} placeholder="Describe what you're looking for..." className="bg-secondary border-border focus:border-primary" maxLength={1000} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Upload Reference Image</label>
              <Input name="image" type="file" accept="image/*" className="bg-secondary border-border file:text-primary file:font-medium" />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base gold-glow gold-glow-hover transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Submit Enquiry
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default OrderForm;
