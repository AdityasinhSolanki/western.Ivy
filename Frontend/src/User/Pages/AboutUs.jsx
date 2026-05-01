
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-20 flex justify-center">
      <div className="max-w-5xl w-full space-y-14 font-serif">

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-black">
            Where Comfort Meets Crazy
          </h1>
          <h2 className="text-xl text-gray-600">
            The Western Ivy Revolution
          </h2>
        </div>

        <div className="space-y-6 text-gray-700 leading-relaxed max-w-4xl">
          <p>
            Western Ivy was born from a simple idea — clothing should feel as good
            as it looks. In a world full of fast fashion and forgettable trends,
            we wanted to create something different. Something bold. Something
            comfortable. Something unapologetically expressive.
          </p>

          <p>
            We believe fashion isn’t just about what you wear, but how you feel
            when you wear it. Whether you’re stepping out, staying in, or making
            a statement without saying a word, Western Ivy is designed to move
            with you — effortlessly.
          </p>

          <p>
            Inspired by modern street culture and everyday comfort, our designs
            blend premium fabrics, clean silhouettes, and a hint of chaos —
            because boring was never our thing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-gray-50 rounded-2xl p-8 space-y-4 shadow-sm">
            <h3 className="text-xl font-semibold text-black">
              What We Stand For
            </h3>

            <p className="text-gray-700">
              • Comfort-first designs without compromising on style
            </p>
            <p className="text-gray-700">
              • Quality materials made to last
            </p>
            <p className="text-gray-700">
              • Clothing that lets you be you — loud, calm, bold, or chill
            </p>
            <p className="text-gray-700">
              • A community that celebrates individuality
            </p>
          </div>

          <div className="bg-black text-white rounded-2xl p-8 space-y-4">
            <h3 className="text-xl font-semibold tracking-wide">
              Our Mission
            </h3>

            <p className="text-gray-200 leading-relaxed">
              To redefine everyday fashion by creating clothing that blends
              comfort, confidence, and creativity — empowering people to express
              themselves freely, every single day.
            </p>
          </div>

        </div>

        <div className="text-center pt-10">
          <p className="text-lg text-black font-medium tracking-wide">
            Western Ivy isn’t just a brand.
          </p>
          <p className="text-gray-600">
            It’s a vibe. It’s a mindset. It’s comfort with character.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
