import { useProductContext } from "../contexts/productContext";
import { toast, ToastContainer } from "react-toastify";
import { Heart, ShoppingBag } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function WishList() {
  const { products, wishlist, toggleWishList, addToCart } = useProductContext();

  const wishListItems = products.filter((p) => wishlist.includes(p.id));

  // Remove
  const handleRemove = (id, title) => {
    toggleWishList(id);
    toast.info(`❌ Removed "${title}" from wishlist`);
  };

  // Add to Cart
  const handleAddToCart = (product) => {
    const size = "Default";

    addToCart(product, size, 1);

    toast.success(`🛒 Added "${product.title}" to cart`);
  };

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
      />

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">

        {/* Heading */}

        <div className="mb-12">

          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Saved Items
          </p>

          <h1 className="mt-2 text-4xl font-light text-zinc-900">
            My Wishlist
          </h1>

          <p className="mt-3 text-zinc-500">
            {wishListItems.length} item
            {wishListItems.length !== 1 && "s"} saved for later
          </p>

        </div>

        {/* Empty State */}

        {wishListItems.length === 0 ? (

          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 py-28 text-center">

            <Heart
              size={56}
              className="mb-6 text-zinc-300"
            />

            <h2 className="text-2xl font-light">
              Your wishlist is empty
            </h2>

            <p className="mt-3 max-w-md text-zinc-500">
              Save products you love and they'll
              appear here for quick access later.
            </p>

          </div>

        ) : (

         <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
            {wishListItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlist={wishlist}
                onWishlist={(e, id, title) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemove(id, title);
                }}
                variant="wishlist"
              />
            ))}
          </div>

        )}

      </div>
    </div>
  );
}