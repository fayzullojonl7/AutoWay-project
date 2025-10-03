const partners = [
  "/images/pages/home/brands/BMW-logo.png",
  "/images/pages/home/brands/MERC-logo.png",
  "/images/pages/home/brands/AUDI-logo.png",
  "/images/pages/home/brands/OPEL-logo.png",
  "/images/pages/home/brands/PORSH-logo.png",
  "/images/pages/home/brands/TOYOTA-logo.png",
];

export default function PartnersMarquee() {
  // Дублируем массив 3 раза для плавного бесконечного эффекта
  const logos = [...partners, ...partners, ...partners];

  return (
    <section className="py-[50px] bg-gray-100 dark:bg-[#0f0f0f] rounded-[20px] overflow-hidden">
      <h1 className="text-center text-[30px] font-bold mb-[30px]">
        OUR PARTNERS
      </h1>
      <div className="relative">
        <div className="flex gap-[50px] animate-marquee">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`partner-${index}`}
              className="h-[60px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          display: flex;
          gap: 50px;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
