import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useProductContext } from "../contexts/productContext";
import { toast } from "react-toastify";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/productCard";

export default function Products() {
  const {
    allProducts,
    products,
    sectionTypeMap,
    toggleWishList,
    wishlist,
    addToCart,
  } = useProductContext();

  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const selectedSection = query.get("section");
  const selectedType = query.get("type");

  const sections = Object.keys(sectionTypeMap);

  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    sections: [],
    types: [],
    price: [],
    rating: [],
    sort: "",
  });

  // ---------------- CLEAR ALL FILTERS ----------------
  const clearFilters = () => {
    setFilters({
      sections: [],
      types: [],
      price: [],
      rating: [],
      sort: "",
    });

    setPriceRange([0, 20000]);

    window.history.replaceState({}, "", "/products");
  };

  // ---------------- UPDATE QUERY PARAMS ----------------
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.sections.length)
      params.set("section", filters.sections.join(","));

    if (filters.types.length)
      params.set("type", filters.types.join(","));

    if (filters.sort) params.set("sort", filters.sort);

    const queryString = params.toString();
    window.history.replaceState({}, "", queryString ? `?${queryString}` : "");
  }, [filters]);

  // ---------------- APPLY INITIAL QUERY FILTERS ----------------
  useEffect(() => {
    const initialSections = selectedSection ? [selectedSection] : [];
    const initialTypes = selectedType ? [selectedType] : [];

    setFilters((prev) => ({
      ...prev,
      sections: initialSections,
      types: initialTypes,
    }));
  }, [selectedSection, selectedType]);

  // ---------------- HANDLE CHECKBOXES ----------------
  const handleCheck = (e) => {
    const { name, value, checked } = e.target;

    const numericValue =
      name === "price"
        ? Number(value)
        : name === "rating"
        ? Number(value)
        : value;

    setFilters((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], numericValue]
        : prev[name].filter((v) => v !== numericValue),
    }));
  };

  // ---------------- FILTER LOGIC ----------------
  function match(p) {
    if (filters.sections.length && !filters.sections.includes(p.sectionName))
      return false;

    if (filters.types.length && !filters.types.includes(p.typeName))
      return false;

    if (filters.price.length) {
      const maxPrice = Math.max(...filters.price);
      if (p.price > maxPrice) return false;
    }

    if (p.price > priceRange[1]) return false;

    if (filters.rating.length) {
      if (!filters.rating.some((r) => p.rating >= r)) return false;
    }

    return true;
  }

  // ---------------- SORT ----------------
  function sortTheFiltered(products) {
    let sorted = [...products];

    switch (filters.sort) {
      case "low-high":
        return sorted.sort((a, b) => a.price - b.price);

      case "high-low":
        return sorted.sort((a, b) => b.price - a.price);

      case "best-rated":
        return sorted.sort((a, b) => b.rating - a.rating);

      case "relevance":
        return sorted.sort((a, b) => {
          const scoreA =
            (filters.sections.includes(a.sectionName) ? 1 : 0) +
            (filters.types.includes(a.typeName) ? 1 : 0);

          const scoreB =
            (filters.sections.includes(b.sectionName) ? 1 : 0) +
            (filters.types.includes(b.typeName) ? 1 : 0);

          return scoreB - scoreA;
        });

      default:
        return sorted;
    }
  }

  let filtered = sortTheFiltered(products.filter(match));

  // ---------------- BUTTON HANDLERS ----------------
  const handleWishList = (e, productId, title) => {
    e.preventDefault();
    e.stopPropagation();

    const isNowInList = !wishlist.includes(productId);
    toggleWishList(productId);

    toast.info(`❤️ ${title} ${isNowInList ? "added to" : "removed from"} wishlist`);
  };

  const handleCart = (e, productId, title) => {
    e.preventDefault();
    e.stopPropagation();

    const product = allProducts.find((p) => p.id === productId);
    if (!product) return;

    addToCart(product, "Default", 1);

    toast.success(`🛒 ${title} added to cart`);
  };

  const activeFilterCount =
    filters.sections.length +
    filters.types.length +
    filters.price.length +
    filters.rating.length +
    (filters.sort ? 1 : 0);

  // Shared filter panel content, reused for desktop sidebar + mobile drawer
  const filterPanel = (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-wide text-zinc-900">
          Filters
        </h2>

        <button
          onClick={clearFilters}
          className="text-sm text-zinc-500 transition hover:text-black"
        >
          Clear all
        </button>
      </div>

      {/* Sections */}
      <div className="border-b border-zinc-200 pb-6">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-900">
          Sections
        </h3>

        <div className="space-y-2.5">
          {sections.map((sec) => (
            <label
              key={sec}
              className="flex cursor-pointer items-center gap-3 text-sm text-zinc-700 me-2"
            >
              <input
                type="checkbox"
                name="sections"
                value={sec}
                checked={filters.sections.includes(sec)}
                onChange={handleCheck}
                className="h-4 w-4 shrink-0 accent-black me-1"
              />
              {sec}
            </label>
          ))}
        </div>
      </div>

      {/* Types */}
      <div className="border-b border-zinc-200 py-6">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-900">
          Types
        </h3>

        <div className="max-h-48 space-y-2.5 overflow-y-auto pr-2">
          {sections.flatMap((sec) =>
            sectionTypeMap[sec].types.map((t) => (
              <label
                key={t.name}
                className="flex cursor-pointer items-center gap-3 text-sm text-zinc-700 me-2"
              >
                <input
                  type="checkbox"
                  name="types"
                  value={t.name}
                  checked={filters.types.includes(t.name)}
                  onChange={handleCheck}
                  className="h-4 w-4 shrink-0 accent-black me-1"
                />
                {t.name}
              </label>
            ))
          )}
        </div>
      </div>

      {/* Price */}
      <div className="border-b border-zinc-200 py-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-900">
          Price
        </h3>

        <input
          type="range"
          min="0"
          max="200000"
          step="500"
          value={priceRange[1]}
          onChange={(e) => {
            const newMax = Number(e.target.value);
            setPriceRange([0, newMax]);
            setFilters((prev) => ({
              ...prev,
              price: [newMax],
            }));
          }}
          className="w-full accent-black"
        />

        <p className="mt-2 text-sm text-zinc-500">
          Up to ₹{priceRange[1].toLocaleString()}
        </p>

        <div className="mt-4 space-y-2.5">
          {[500, 2000, 5000, 10000].map((p) => (
            <label
              key={p}
              className="flex cursor-pointer items-center gap-3 text-sm text-zinc-700 me-2"
            >
              <input
                type="checkbox"
                name="price"
                value={p}
                checked={filters.price.includes(p)}
                onChange={handleCheck}
                className="h-4 w-4 shrink-0 accent-black me-1"
              />
              Up to ₹{p.toLocaleString()}
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="border-b border-zinc-200 py-6">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-900">
          Rating
        </h3>

        <div className="space-y-2.5">
          {[4, 3, 2, 1].map((r) => (
            <label
              key={r}
              className="flex cursor-pointer items-center gap-3 text-sm text-zinc-700 me-2"
            >
              <input
                type="checkbox"
                name="rating"
                value={r}
                checked={filters.rating.includes(r)}
                onChange={handleCheck}
                className="h-4 w-4 shrink-0 accent-black me-1"
              />
              {r} ★ & above
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="pt-6">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-900">
          Sort By
        </h3>

        <select
          name="sort"
          value={filters.sort}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              sort: e.target.value,
            }))
          }
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-black"
        >
          <option value="">All</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
          <option value="relevance">Relevance</option>
          <option value="best-rated">Best Rated</option>
        </select>
      </div>
    </>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">

        {/* Mobile filter trigger */}
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-800 transition hover:border-black lg:hidden"
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* DESKTOP SIDEBAR — fixed proportion, doesn't stretch or shrink */}
        <aside className="hidden w-72 shrink-0 lg:block lg:sticky lg:top-24 rounded-2xl border border-zinc-200 bg-white p-6 lg:sticky lg:top-24 lg:block xl:w-80">
          {filterPanel}
        </aside>

        {/* MOBILE FILTER DRAWER */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowFilters(false)}
            />

            <div className="absolute inset-y-0 left-0 w-full max-w-xs overflow-y-auto bg-white p-6 shadow-xl">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-900">
                  Filter products
                </span>

                <button
                  onClick={() => setShowFilters(false)}
                  className="text-zinc-500 transition hover:text-black"
                  aria-label="Close filters"
                >
                  <X size={22} />
                </button>
              </div>

              {filterPanel}

              <button
                onClick={() => setShowFilters(false)}
                className="mt-6 w-full rounded-lg bg-black py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Show {filtered.length} results
              </button>
            </div>
          </div>
        )}

        {/* PRODUCT GRID */}
        <section className="min-w-0 flex-1">
          <div className="mb-8 flex items-end justify-between border-b border-zinc-200 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Collection
              </p>

              <h1 className="mt-2 text-3xl font-light">
                Shop
              </h1>
            </div>

            <p className="text-sm text-zinc-500">
              {filtered.length} products
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                wishlist={wishlist}
                onWishlist={handleWishList}
                onCart={handleCart}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}