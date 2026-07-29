import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">

        <div className="w-full rounded-3xl border border-zinc-200 bg-white p-12 text-center shadow-sm">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.35em] text-zinc-500">
            Order Confirmed
          </p>

          <h1 className="mt-4 text-5xl font-light tracking-tight text-zinc-900">
            Thank You
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-zinc-600">
            Your order has been placed successfully.
            <br />
            We've received your purchase and will begin processing it shortly.
          </p>

          <div className="my-12 border-t border-zinc-200"></div>

          <div className="space-y-4 text-sm text-zinc-600">

            <div className="flex items-center justify-between">
              <span>Order Status</span>
              <span className="font-medium text-zinc-900">
                Confirmed
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Payment</span>
              <span className="font-medium text-zinc-900">
                Pending
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium text-zinc-900">
                Processing
              </span>
            </div>

          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">

            <Link
              to="/orders"
              className="flex-1 rounded-full bg-black px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.3em] text-white transition hover:bg-zinc-800"
            >
              View Orders
            </Link>

            <Link
              to="/products"
              className="flex-1 rounded-full border border-zinc-300 px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.3em] transition hover:border-black"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}