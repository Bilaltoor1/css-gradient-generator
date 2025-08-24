export default function HeroSection() {
  return (
    <section
      className="w-full"
      style={{
        background: 'linear-gradient(45deg, #1A047F 0% 9.09%, #2A079A 9.09% 18.18%, #3A0BAF 18.18% 27.27%, #4A0FC4 27.27% 36.36%, #5A14D6 36.36% 45.45%, #8F4CFF 45.45% 54.54%, #C47BFF 54.54% 63.63%, #D6A6FF 63.63% 72.72%, #E2C2FF 72.72% 81.81%, #EDD9FF 81.81% 90.9%, #F4EBFF 90.9% 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white/90 drop-shadow">
          Explore Colors
        </h1>
        <p className="mt-3 text-white/80 max-w-2xl">
          Discover beautiful color shades and palettes. Copy CSS, Tailwind classes, or export as images for your design projects.
        </p>
      </div>
    </section>
  );
}
