import { useState, useEffect } from "react";
import { useProductContext } from "../contexts/productContext";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ProductCard from "../components/productCard";
import {
  Heart,
  ShoppingBag,
  Star,
  Minus,
  Plus,
  Check,
} from "lucide-react";

export default function ProductDetails() {
  const { products, wishlist, addToCart, toggleWishList } =
    useProductContext();

  const { productId } = useParams();
  const navigate = useNavigate();

  const product = products?.find(
    (p) => p.id?.toString() === productId
  );

  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images?.[0]);
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    if (!product) return;

    setSelectedSize(null);
    setQty(1);
    setMainImage(product.images?.[0]);

    window.scrollTo({ top: 0, behavior: "smooth" });

    const r = products
      .filter((p) => p.id !== product.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    setRelatedItems(r);
  }, [productId]);

  if (!product)
    return <div className="py-24 text-center">Loading...</div>;

  const SIZE_MAP = {
    Apparel: ["S", "M", "L", "XL", "XXL"],
    Footwear: ["40", "41", "42", "43", "44"],
    Electronics: ["8GB RAM", "16GB RAM", "32GB RAM"],
    Eyewear: ["140", "145", "150", "155"],
    Toys: ["S", "M"],
    default: [],
  };

  const sizes = SIZE_MAP[product.category] || SIZE_MAP.Apparel;

  const handleWishList = (e, productId, title) => {
    e.preventDefault();
    e.stopPropagation();

    const isNowIn = !wishlist?.includes(productId);
    toggleWishList(productId);

    toast.info(
      `❤️ ${title} ${isNowIn ? "added to" : "removed from"} wishlist`
    );
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedSize) {
      toast.warning("⚠️ Please select a size.");
      return;
    }

    addToCart(product, selectedSize, qty);
    toast.success(`🛒 ${product.title} added to cart`);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedSize) {
      toast.warning("⚠️ Please select a size first.");
      return;
    }

    addToCart(product, selectedSize, qty);
    navigate("/cart");
  };

  return (
    <div className="bg-white">

      {/* PRODUCT DETAIL — constrained width */}
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">

          {/* LEFT */}
          <div>
            <div className="overflow-hidden rounded-3xl bg-zinc-100">
              <img
                src={mainImage || "https://placehold.co/800x900"}
                alt={product.title}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="mt-5 flex gap-3 overflow-auto">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`overflow-hidden rounded-xl border transition ${
                    mainImage === img
                      ? "border-black"
                      : "border-zinc-200 hover:border-zinc-500"
                  }`}
                >
                  <img src={img} alt="" className="h-20 w-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              {product.sectionName}
            </p>

            <h1 className="mt-3 text-4xl font-light leading-tight text-zinc-900">
              {product.title}
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star size={18} fill="currentColor" className="text-yellow-500" />
                <span className="font-medium">{product.rating}</span>
              </div>

              <span className="text-zinc-400">|</span>

              <span className="text-sm text-zinc-500">Premium Quality</span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <p className="text-4xl font-light">
                ₹{product.price.toLocaleString()}
              </p>

              <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm">
                10% OFF
              </span>
            </div>

            <p className="mt-3 flex items-center gap-2 text-sm text-green-700">
              <Check size={16} />
              Inclusive of all taxes
            </p>

            <div className="mt-8 border-t border-zinc-200 pt-8">

              {/* Size */}
              {sizes.length > 0 && (
                <div>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-800">
                    Select Size
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[52px] rounded-xl border px-5 py-3 text-sm font-medium transition ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-zinc-300 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-10">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-800">
                  Quantity
                </p>

                <div className="inline-flex items-center overflow-hidden rounded-xl border border-zinc-300">
                  <button
                    onClick={() => setQty((q) => (q > 1 ? q - 1 : 1))}
                    className="flex h-12 w-12 items-center justify-center transition hover:bg-zinc-100"
                  >
                    <Minus size={18} />
                  </button>

                  <div className="flex h-12 w-14 items-center justify-center border-x border-zinc-300 text-lg font-medium">
                    {qty}
                  </div>

                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex h-12 w-12 items-center justify-center transition hover:bg-zinc-100"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 rounded-xl bg-black px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition hover:bg-zinc-800"
                >
                  Buy Now
                </button>

                <button
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-black px-8 py-4 text-sm font-medium uppercase tracking-wider transition hover:bg-black hover:text-white"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
              </div>

              {/* Wishlist */}
              <button
                onClick={(e) => handleWishList(e, product.id, product.title)}
                className={`mt-4 flex items-center justify-center gap-2 rounded-xl border px-8 py-4 text-sm font-medium uppercase tracking-wider transition ${
                  wishlist?.includes(product.id)
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-zinc-300 hover:border-black"
                }`}
              >
                <Heart
                  size={18}
                  fill={wishlist?.includes(product.id) ? "currentColor" : "none"}
                />
                {wishlist?.includes(product.id)
                  ? "Saved to Wishlist"
                  : "Add to Wishlist"}
              </button>

              {/* Description */}
              <div className="mt-12 border-t border-zinc-200 pt-8">
                <h2 className="text-lg font-medium">Product Details</h2>

                <div className="mt-6 space-y-4 leading-7 text-zinc-600">
                  <p>
                    Designed for everyday comfort with a timeless aesthetic
                    that complements both casual and elevated wardrobes.
                  </p>

                  <ul className="space-y-2">
                    <li>• Stylish and comfortable fit</li>
                    <li>• Premium quality materials</li>
                    <li>• All-weather design</li>
                    <li>• Durable everyday essential</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS — full-width band, not constrained to product-detail container */}
      <section className="mt-16 border-t border-zinc-200 bg-zinc-50 py-14 sm:mt-24 sm:py-20">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">

          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                Discover More
              </p>

              <h2 className="mt-2 text-2xl font-light text-zinc-900 sm:text-3xl">
                You May Also Like
              </h2>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="hidden shrink-0 rounded-full border border-zinc-300 px-5 py-2 text-sm transition hover:border-black hover:bg-black hover:text-white md:block"
            >
              View All
            </button>
          </div>

          {relatedItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 xl:grid-cols-4">
              {relatedItems.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  wishlist={wishlist}
                  onWishlist={handleWishList}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-300 py-16 text-center text-zinc-500">
              No related products found.
            </div>
          )}

          <div className="mt-8 md:hidden">
            <button
              onClick={() => navigate("/products")}
              className="w-full rounded-xl border border-zinc-300 py-3 transition hover:border-black hover:bg-black hover:text-white"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}