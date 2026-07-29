import { useState } from "react";
import { useProductContext } from "../contexts/productContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    removeCartItem,
    changeCartQuantity,
    toggleWishList,
    clearCart
  } = useProductContext();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ------------------------
  // PLACE ORDER
  // ------------------------
  async function handlePlaceOrder() {
    console.log("Place Order clicked");
    const userId = localStorage.getItem("userId");
    const addressId = localStorage.getItem("addressId");

     console.log({
    userId,
    addressId,
    cartItems,
  });
    if (!userId) {
      toast.warn("⚠️ Please log in before placing an order.");
      return;
    }

    if (!addressId) {
      toast.warn("⚠️ Please select a delivery address before placing an order.");
      return;
    }

    if (cartItems.length === 0) {
      toast.info("🛒 Your cart is empty!");
      return;
    }

    setLoading(true);
    setOrderStatus(null);

    try {
      const orderData = {
        user: userId,
        item: cartItems.map((item) => ({
          productId: item.productId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
        })),
        address: addressId,
        payment: {
          method: "cod",
          status: "pending",
        },
      };

      console.log("Sending order", orderData);

      const response = await fetch(
        "https://my-ecommerce-eta-ruby.vercel.app/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) throw new Error(`Failed to place order (${response.status})`);

      setOrderStatus("success");
      toast.success("🎉 Order placed successfully!");
      clearCart();                    
      localStorage.removeItem("cartItems"); 
    } catch (err) {
      console.error(err);
      console.error("Order error:", err);
      setOrderStatus("error");
      toast.error("❌ Failed to place order. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  // ------------------------
  // REMOVE ITEM
  // ------------------------
  const handleRemove = (productId, size, title) => {
    removeCartItem(productId, size);
    toast.info(`🗑️ Removed ${title} (${size})`);
  };

return (
  <div className="min-h-screen bg-white">
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">

      {/* Heading */}

      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          Shopping Bag
        </p>

        <h1 className="mt-2 text-4xl font-light text-zinc-900">
          Your Cart
        </h1>

        <p className="mt-3 text-zinc-500">
          {totalItems} item{totalItems !== 1 && "s"} in your bag
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">

        {/* LEFT */}

        <div className="lg:col-span-2">

          {cartItems.length === 0 ? (

            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 py-28 text-center">

              <div className="mb-6 text-6xl">
                🛍️
              </div>

              <h2 className="text-2xl font-light">
                Your shopping bag is empty
              </h2>

              <p className="mt-3 max-w-md text-zinc-500">
                Browse our latest collections and
                discover timeless essentials for your wardrobe.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {cartItems.map((item) => (

                <div
                  key={`${item.productId}-${item.size}`}
                  className="rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:shadow-xl"
                >

                  <div className="flex flex-col gap-6 sm:flex-row">

                    {/* Image */}

                    <div className="overflow-hidden rounded-2xl bg-zinc-100">

                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-36 w-full object-cover sm:h-36 sm:w-32"
                      />

                    </div>

                    {/* Content */}

                    <div className="flex flex-1 flex-col">

                      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                        Premium Collection
                      </p>

                      <h3 className="mt-2 text-xl font-medium text-zinc-900">
                        {item.title}
                      </h3>

                      <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-zinc-600">

                        <span>
                          <strong>Size:</strong> {item.size}
                        </span>

                        <span>
                          <strong>Price:</strong> ₹{item.price}
                        </span>

                      </div>

                      {/* Quantity */}

                      <div className="mt-6">

                        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                          Quantity
                        </p>

                        <div className="inline-flex items-center overflow-hidden rounded-xl border border-zinc-300">

                          <button
                            onClick={() =>
                              changeCartQuantity(
                                item.productId,
                                item.size,
                                -1
                              )
                            }
                            className="flex h-11 w-11 items-center justify-center transition hover:bg-zinc-100"
                          >
                            −
                          </button>

                          <div className="flex h-11 w-14 items-center justify-center border-x border-zinc-300 font-medium">
                            {item.quantity}
                          </div>

                          <button
                            onClick={() =>
                              changeCartQuantity(
                                item.productId,
                                item.size,
                                1
                              )
                            }
                            className="flex h-11 w-11 items-center justify-center transition hover:bg-zinc-100"
                          >
                            +
                          </button>

                        </div>

                      </div>

                      {/* Actions */}

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                        <button
                          onClick={() =>
                            handleRemove(
                              item.productId,
                              item.size,
                              item.title
                            )
                          }
                          className="rounded-xl border border-red-300 px-6 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Remove
                        </button>

                        <button
                          onClick={() => {
                            toggleWishList(item.productId);

                            handleRemove(
                              item.productId,
                              item.size,
                              item.title
                            );
                          }}
                          className="rounded-xl border border-zinc-300 px-6 py-3 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white"
                        >
                          Move to Wishlist
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>
                {/* RIGHT SECTION */}

        {cartItems.length > 0 && (
          <div className="lg:col-span-1">

            <div className="sticky top-24 rounded-3xl border border-zinc-200 bg-zinc-50 p-8">

              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                Order Summary
              </p>

              <h2 className="mt-2 text-3xl font-light">
                Price Details
              </h2>

              <div className="mt-10 space-y-5">

                <div className="flex items-center justify-between text-zinc-600">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex items-center justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-zinc-600">
                  <span>Shipping</span>

                  <span className="font-medium text-green-600">
                    Free
                  </span>
                </div>

                <div className="flex items-center justify-between text-zinc-600">
                  <span>Taxes</span>
                  <span>Included</span>
                </div>

              </div>

              <div className="my-8 border-t border-zinc-300"></div>

              <div className="flex items-center justify-between">

                <span className="text-lg font-medium">
                  Total
                </span>

                <span className="text-3xl font-light">
                  ₹{totalPrice.toLocaleString()}
                </span>

              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-8 w-full rounded-xl bg-black py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-900 hover:shadow-xl"
              >
                Proceed to Checkout
              </button>

              {orderStatus === "success" && (
                <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-center text-green-700">
                  ✅ Your order has been placed successfully.
                </div>
              )}

              {orderStatus === "error" && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-700">
                  ❌ Unable to place your order.
                </div>
              )}

              <div className="mt-8 rounded-xl bg-white p-5">

                <p className="text-sm font-medium">
                  Why shop with us?
                </p>

                <ul className="mt-4 space-y-3 text-sm text-zinc-500">

                  <li>✓ Premium quality products</li>

                  <li>✓ Secure checkout</li>

                  <li>✓ Free delivery across India</li>

                  <li>✓ Easy returns</li>

                </ul>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>

  </div>
);

}
