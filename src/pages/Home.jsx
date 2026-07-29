import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../contexts/productContext";

export default function Home() {
  const { sectionTypeMap, products } = useProductContext();

  // Sections (keys)
  const sections = Object.keys(sectionTypeMap || {});

  // Flatten all types into array { name, image } and dedupe by name
  const typesMap = {};
  sections.forEach((sec) => {
    const typesArr = sectionTypeMap[sec].types || [];
    typesArr.forEach((t) => {
      if (!typesMap[t.name]) typesMap[t.name] = t.image || "https://placehold.co/400";
    });
  });
  const types = Object.entries(typesMap).map(([name, image]) => ({ name, image }));

  // Helper fallbacks
  function getSectionImage(name) {
    return sectionTypeMap?.[name]?.image || "https://placehold.co/600x400?text=No+Image";
  }

  function getTypeImage(typeName) {
    return typesMap[typeName] || "https://placehold.co/400x400";
  }

  const carouselImages = [
    "https://marketplace.canva.com/EAFqA4K13MM/1/0/1600w/canva-69gdt76LZg0.jpg",
    "https://marketplace.canva.com/EAGr1G0eTn0/1/0/640w/canva-8_PjovReKxY.jpg",
    "https://images.pexels.com/photos/26180889/pexels-photo-26180889.jpeg?_gl=1*o15l05*_ga*NTQwOTgxNjI0LjE3ODUzNDcyNzA.*_ga_8JE65Q40S6*czE3ODUzNDcyNzAkbzEkZzEkdDE3ODUzNDc2MDQkajQzJGwwJGgw",
    "https://images.pexels.com/photos/26180889/pexels-photo-26180889.jpeg?_gl=1*o15l05*_ga*NTQwOTgxNjI0LjE3ODUzNDcyNzA.*_ga_8JE65Q40S6*czE3ODUzNDcyNzAkbzEkZzEkdDE3ODUzNDc2MDQkajQzJGwwJGgw"
  ];

  const newArrivals = products.slice(0, 4);

 return (
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

    {/* SECTIONS HORIZONTAL SCROLL */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-light tracking-wide text-zinc-900">
            Shop by Section
          </h2>
          <div className="mt-2 h-px w-20 bg-zinc-900" />
        </div>

        <div
          className="flex gap-5 overflow-x-auto pb-3"
          style={{ scrollbarWidth: "thin" }}
        >
          {sections.map((sec) => (
            <Link
              key={sec}
              to={`/products?section=${encodeURIComponent(sec)}`}
              className="group w-[140px] flex-none focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            >
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-300 group-hover:border-zinc-300 group-hover:shadow-sm">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={getSectionImage(sec)}
                    alt={sec}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <p className="mt-3 text-center text-sm font-medium tracking-wide text-zinc-800">
                {sec}
              </p>
            </Link>
          ))}

          {sections.length === 0 && (
            <div className="text-sm text-zinc-500">
              No sections available yet.
            </div>
          )}
        </div>
      </section>

    {/* HERO SECTION */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={`${carouselImages[3]}`}
            alt="New Season Collection"
            className="h-[420px] w-full object-cover md:h-[560px] lg:h-[680px]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl px-8 md:px-14">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-white/80">
                New Season 2026
              </p>

              <h1 className="text-4xl font-light leading-tight text-white md:text-6xl">
                Timeless Fashion
                <br />
                Essentials
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/80 md:text-base">
                Discover curated collections designed with elegance, simplicity,
                and everyday sophistication.
              </p>

              <Link
                to="/products"
                className="mt-8 inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

    {/* BROWSE BY TYPE */}
      <section className="mb-20">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Explore More
          </p>

          <h2 className="mt-3 text-3xl font-light text-zinc-900">
            Browse by Type
          </h2>
        </div>

        {types.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {types.map((t) => (
              <Link
                key={t.name}
                to={`/products?type=${encodeURIComponent(t.name)}`}
                className="group relative overflow-hidden rounded-3xl"
              >
                <img
                  src={getTypeImage(t.name)}
                  alt={t.name}
                  className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-light tracking-wide text-white">
                    {t.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-500">
            No types to show.
          </p>
        )}
      </section>

    {/* NEW ARRIVALS */}
      <section className="mb-24">
        <div className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-zinc-500">
            Latest Edit
          </p>

          <h2 className="mt-3 text-3xl font-light text-zinc-900">
            New Arrivals
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
            Discover the newest additions to our collection, selected for timeless
            style and everyday sophistication.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <Link
              key={product.id}
              to={`/product-detail/${product.id}`}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl bg-zinc-100">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {product.sectionName || "Collection"}
                </p>

                <h3 className="mt-2 line-clamp-2 text-lg font-medium text-zinc-900 transition group-hover:text-zinc-600">
                  {product.title}
                </h3>

                <p className="mt-3 text-lg font-light text-zinc-900">
                  ₹{product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center border-b border-zinc-900 pb-1 text-sm font-medium tracking-wide text-zinc-900 transition hover:text-zinc-600 hover:border-zinc-600"
          >
            View All Products →
          </Link>
        </div>
      </section>

    {/* FEATURED COLLECTIONS */}
      <section className="mb-20">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Curated Selection
          </p>

          <h2 className="mt-3 text-3xl font-light text-zinc-900">
            Featured Collections
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">

          <Link
            to="/products"
            className="group relative overflow-hidden rounded-3xl"
          >
            <img
              src="https://images.pexels.com/photos/9476367/pexels-photo-9476367.jpeg?_gl=1*1fuij5u*_ga*NTQwOTgxNjI0LjE3ODUzNDcyNzA.*_ga_8JE65Q40S6*czE3ODUzNDcyNzAkbzEkZzEkdDE3ODUzNDc1NDAkajI3JGwwJGgw"
              alt="Summer Collection"
              className="h-[500px] w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
              <p className="text-xs uppercase tracking-[0.3em]">
                New Arrival
              </p>

              <h3 className="mt-4 text-4xl font-light">
                Summer
                <br />
                Collection
              </h3>

              <span className="mt-8 border-b border-white pb-1 text-sm tracking-wide">
                Explore
              </span>
            </div>
          </Link>

          <Link
            to="/products"
            className="group relative overflow-hidden rounded-3xl"
          >
            <img
              src="https://images.pexels.com/photos/7256350/pexels-photo-7256350.jpeg?_gl=1*168qblm*_ga*NTQwOTgxNjI0LjE3ODUzNDcyNzA.*_ga_8JE65Q40S6*czE3ODUzNDcyNzAkbzEkZzEkdDE3ODUzNDc3NTUkajMzJGwwJGgw"
              alt="Winter Collection"
              className="h-[500px] w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
              <p className="text-xs uppercase tracking-[0.3em]">
                Seasonal Edit
              </p>

              <h3 className="mt-4 text-4xl font-light">
                Winter
                <br />
                Collection
              </h3>

              <span className="mt-8 border-b border-white pb-1 text-sm tracking-wide">
                Explore
              </span>
            </div>
          </Link>

        </div>
      </section>

      {/* BRAND STORY */}
        <section className="my-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-zinc-500">
              Our Philosophy
            </p>

            <h2 className="mt-4 text-4xl font-light tracking-tight text-zinc-900">
              Crafted for Everyday Elegance
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-600">
              We believe great style comes from simplicity, quality, and thoughtful
              craftsmanship. Every piece is selected to fit seamlessly into your
              wardrobe, offering timeless designs you'll reach for season after season.
            </p>

            <Link
              to="/products"
              className="mt-10 inline-flex items-center border-b border-zinc-900 pb-1 text-sm font-medium tracking-wide text-zinc-900 transition hover:border-zinc-600 hover:text-zinc-600"
            >
              Explore Collection →
            </Link>
          </div>
        </section>
  </div>
);
}
