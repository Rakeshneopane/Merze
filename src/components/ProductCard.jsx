import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function ProductCard({
  product,
  wishlist,
  onWishlist,
  variant = "default",
}) {
 const inWishlist = (wishlist ?? []).includes(product.id);

 const isWishlist = variant === "wishlist";

  return (
    <Link
      to={`/product-detail/${product.id}`}
      className="group block"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl bg-zinc-100">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button
          onClick={(e) => onWishlist(e, product.id, product.title)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-all ${
            inWishlist
              ? "bg-black text-white"
              : "bg-white/80 text-black hover:bg-white"
          }`}
        >
          <Heart
            size={16}
            fill={inWishlist ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Info */}
      <div className="mt-3">
        <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
          {product.sectionName}
        </p>

        <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-5 text-zinc-900">
          {product.title}
        </h3>

        <div className="mt-3 flex items-center justify-between">
            <span className="text-base font-semibold text-zinc-900">
                ₹{product.price.toLocaleString()}
            </span>

            {isWishlist ? (
                <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onWishlist(e, product.id, product.title);
                }}
                className="rounded-full border border-red-300 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
                >
                Remove
                </button>
            ) : (
                <span className="translate-x-0 text-xs uppercase tracking-[0.2em] text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-black">
                View Details →
                </span>
            )}
            </div>
      </div>
    </Link>
  );
}