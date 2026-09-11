import {
  Sofa,
  BedDouble,
  DoorOpen,
  House,
  Building2,
  Wrench,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Sofa,
    title: "Custom Sofas",
    description:
      "Luxury custom sofas designed according to your home, comfort and interior style.",
    link: "https://alameenfurniture.in/alameenfurnitur/custom-sofa.php",
  },
  {
    icon: BedDouble,
    title: "Designer Beds",
    description:
      "Modern upholstered beds with premium headboards and storage options.",
    link: "https://alameenfurniture.in/alameenfurnitur/designer-beds.php",
  },
  {
    icon: DoorOpen,
    title: "Wardrobes",
    description:
      "Sliding & modular wardrobes with elegant finish and maximum storage.",
    link: "https://alameenfurniture.in/alameenfurnitur/wardrobes.php",
  },
  {
    icon: House,
    title: "Home Interior",
    description:
      "Complete interior solutions including TV units, kitchens and furniture.",
    link: "https://alameenfurniture.in/alameenfurnitur/home-interior.php",
  },
  {
    icon: Building2,
    title: "Office Furniture",
    description:
      "Premium office tables, chairs and storage cabinets built for productivity.",
    link: "https://alameenfurniture.in/alameenfurnitur/office-furniture.php",
  },
  {
    icon: Wrench,
    title: "Furniture Repair",
    description:
      "Sofa repairing, polishing and restoration by experienced craftsmen.",
    link: "https://alameenfurniture.in/alameenfurnitur/furniture-repair.php",
  },
];

const ServicesSection = () => {
  return (
    <section  id="services" className="bg-[#0b0b0b] py-20 md:py-24">
      <div className="container mx-auto px-5 md:px-8">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[5px] text-[#dca94a]">
            Our Services
          </span>

          <h2 className="font-serif text-4xl font-semibold leading-tight text-white md:text-5xl">
            Premium{" "}
            <span className="italic text-[#dca94a]">
              Furniture
            </span>{" "}
            Services
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-gray-400 md:text-base">
            Custom designed furniture crafted with premium materials and expert
            workmanship.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group relative min-h-[270px] rounded-2xl border border-[#2d2d2d] bg-[#151515] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#8f6b2c] hover:bg-[#181818] hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
              >
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#2c2417] transition-all duration-300 group-hover:bg-[#dca94a]">
                  <Icon
                    size={29}
                    strokeWidth={2}
                    className="text-[#dca94a] transition-colors duration-300 group-hover:text-[#111]"
                  />
                </div>

                {/* Title */}
                <h3 className="font-serif text-[22px] font-semibold text-white">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 max-w-[280px] text-sm leading-6 text-gray-400">
                  {service.description}
                </p>

                {/* Link */}
                <a
                  href={service.link}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#dca94a] transition-all duration-300 group-hover:gap-2.5"
                >
                  View More
                  <ArrowRight size={17} />
                </a>

                {/* Bottom hover line */}
                <span className="absolute bottom-0 left-6 right-6 h-[1px] origin-left scale-x-0 bg-[#dca94a] transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;