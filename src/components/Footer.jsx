import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              to="/home"
              className="text-2xl font-light tracking-[0.35em] text-zinc-900"
            >
              MERZE
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-zinc-600">
              Timeless fashion designed for everyday elegance. Discover pieces
              that blend comfort, quality, and modern style.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-900">
              Shop
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/products"
                className="text-sm text-zinc-600 transition hover:text-black"
              >
                All Products
              </Link>

              <Link
                to="/home"
                className="text-sm text-zinc-600 transition hover:text-black"
              >
                Collections
              </Link>

              <Link
                to="/wish-list"
                className="text-sm text-zinc-600 transition hover:text-black"
              >
                Wishlist
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-900">
              Account
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/orders"
                className="text-sm text-zinc-600 transition hover:text-black"
              >
                Orders
              </Link>

              <Link
                to="/cart"
                className="text-sm text-zinc-600 transition hover:text-black"
              >
                Cart
              </Link>

              <Link
                to="/user"
                className="text-sm text-zinc-600 transition hover:text-black"
              >
                My Account
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-900">
              Connect
            </h3>

            <div className="mt-5 flex items-center gap-4">
                <a href="#" aria-label="Instagram" className="text-zinc-600 transition hover:text-black">
                    <FaInstagram size={20} />
                </a>

                <a href="#" aria-label="Facebook" className="text-zinc-600 transition hover:text-black">
                    <FaFacebookF size={18} />
                </a>

                <a
                    href="mailto:support@merze.com"
                    aria-label="Email"
                    className="text-zinc-600 transition hover:text-black"
                >
                    <Mail size={20} />
                </a>
            </div>

            <p className="mt-6 text-sm text-zinc-600">
              support@merze.com
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-zinc-200 pt-6">
          <p className="text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} MERZE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}