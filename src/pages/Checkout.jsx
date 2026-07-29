import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import { useProductContext } from "../contexts/ProductContext";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_BASE_URI;

export default function Checkout() {
  const navigate = useNavigate();

  const { user } = useUserContext();

  const { cartItems, clearCart } = useProductContext();

  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const addressId = localStorage.getItem("addressId");

  const selectedAddress = useMemo(() => {
    if (!user?.addresses) return null;

    return user.addresses.find((a) => a._id === addressId);
  }, [user, addressId]);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const shipping = 0;

  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (!user?._id) {
      toast.error("Please login first.");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      navigate("/user");
      return;
    }

    if (!cartItems.length) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
            user: user._id,
            item: cartItems,
            address: addressId,
            payment: {
                method: paymentMethod,
                status: "pending",
            },
        };

      const res = await fetch(
        `${API_BASE_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

        console.log("Order response:", data);

        if (!res.ok) {
        throw new Error(data.error || data.message || "Order failed");
        }

      
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/order-success");
    } catch (err) {
        console.error(err);
       toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="border-b border-zinc-200 pb-8">

          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Checkout
          </p>

          <h1 className="mt-3 text-5xl font-light tracking-tight">
            Secure Checkout
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
            Review your delivery details before placing your order.
          </p>

        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">

          {/* LEFT COLUMN */}

          <div className="space-y-10">

            {/* ADDRESS */}

            <div className="rounded-3xl border border-zinc-200 p-8">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Delivery Address
                  </p>

                  <h2 className="mt-3 text-2xl font-light">
                    Deliver To
                  </h2>

                </div>

                <Link
                  to="/user"
                  className="text-xs uppercase tracking-[0.25em] text-zinc-600 transition hover:text-black"
                >
                  Change →
                </Link>

              </div>

              {!selectedAddress ? (

                <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 p-6">

                  <p className="text-zinc-600">
                    No address selected.
                  </p>

                  <Link
                    to="/user"
                    className="mt-5 inline-flex rounded-full border border-black px-6 py-3 text-xs uppercase tracking-[0.25em] transition hover:bg-black hover:text-white"
                  >
                    Select Address
                  </Link>

                </div>

              ) : (

                <div className="mt-8 space-y-3 text-zinc-700">

                  <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-[10px] uppercase tracking-[0.3em]">
                    {selectedAddress.addressType}
                  </span>

                  <p>{selectedAddress.area}</p>

                  <p>
                    {selectedAddress.city},{" "}
                    {selectedAddress.state}
                  </p>

                  <p>{selectedAddress.pincode}</p>

                  {selectedAddress.landmark && (
                    <p>
                      Landmark: {selectedAddress.landmark}
                    </p>
                  )}

                  {selectedAddress.alternatePhone && (
                    <p>
                      Phone: {selectedAddress.alternatePhone}
                    </p>
                  )}

                </div>

              )}

            </div>

            {/* PAYMENT */}

            <div className="rounded-3xl border border-zinc-200 p-8">

              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Payment
              </p>

              <h2 className="mt-3 text-2xl font-light">
                Payment Method
              </h2>

              <div className="mt-8 space-y-4">
                                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-300 p-5 transition hover:border-black">

                  <div>
                    <p className="font-medium">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      Pay when your order arrives.
                    </p>
                  </div>

                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="accent-black"
                  />
                </label>

                <label className="flex cursor-not-allowed items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 p-5 opacity-60">

                  <div>
                    <p className="font-medium">
                      Razorpay
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      Coming soon
                    </p>
                  </div>

                  <input
                    type="radio"
                    disabled
                    className="accent-black"
                  />
                </label>

              </div>

            </div>

          </div>

          {/* RIGHT COLUMN */}

          <div>

            <div className="sticky top-28 rounded-3xl border border-zinc-200 bg-white p-8">

              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Summary
              </p>

              <h2 className="mt-3 text-2xl font-light">
                Order Summary
              </h2>

              <div className="mt-8 divide-y divide-zinc-100">

                {cartItems.map((item, index) => (
                  <div
                    key={`${item.productId}-${item.size}-${index}`}
                    className="flex gap-4 py-5"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-16 rounded-xl object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-medium">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        Size {item.size}
                      </p>

                      <p className="mt-1 text-sm text-zinc-500">
                        Qty {item.quantity}
                      </p>

                    </div>

                    <div className="font-medium">
                      ₹{item.price * item.quantity}
                    </div>

                  </div>
                ))}

              </div>

              <div className="mt-8 space-y-4 border-t border-zinc-200 pt-8">

                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-zinc-600">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>

                <div className="flex justify-between border-t border-zinc-200 pt-5 text-xl font-light">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={
                  loading ||
                  !selectedAddress ||
                  cartItems.length === 0
                }
                className="mt-10 w-full rounded-full bg-black px-8 py-4 text-xs font-medium uppercase tracking-[0.3em] text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              <p className="mt-5 text-center text-xs leading-6 text-zinc-500">
                By placing your order you agree to our terms and
                confirm that your delivery information is correct.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}