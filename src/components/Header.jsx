import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProductContext } from "../contexts/productContext";
import { useUserContext } from "../contexts/userContext";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingBag,
  User,
} from "lucide-react";

export default function Header() {
  const { setSearchTerm, cartItems, wishlist } = useProductContext();
  const { user, logout } = useUserContext();

  const [showNav, setShowNav] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const wishCount = wishlist.length;
  const cartCount = cartItems.length;

  // Sync search input with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";

    if (query !== searchInput) {
      setSearchInput(query);
      setSearchTerm(query);
    }
  }, [location.search]);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowNav(false);
  }, [location.pathname]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchInput(term);
    setSearchTerm(term);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const term = searchInput.trim();

    navigate(
      `/products${term ? `?search=${encodeURIComponent(term)}` : ""}`
    );
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">

        {/* Logo */}
        <Link
          to="/home"
          className="text-lg font-light tracking-[0.25em] text-zinc-900 sm:text-xl sm:tracking-[0.3em] lg:text-2xl lg:tracking-[0.35em]"
        >
          MERZE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex lg:gap-8">
          <Link
            to="/home"
            className="text-sm uppercase tracking-[0.2em] text-zinc-700 transition hover:text-black"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-sm uppercase tracking-[0.2em] text-zinc-700 transition hover:text-black"
          >
            Shop
          </Link>

          <Link
            to="/orders"
            className="text-sm uppercase tracking-[0.2em] text-zinc-700 transition hover:text-black"
          >
            Orders
          </Link>

          {user && (
            <Link
              to="/admin"
              className="text-sm uppercase tracking-[0.2em] text-zinc-700 transition hover:text-black"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">

          {/* Desktop Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden xl:block"
          >
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-44 rounded-full border border-zinc-300 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-black focus:w-56 2xl:w-56"
            />
          </form>

          {/* Wishlist */}
          <Link
            to="/wish-list"
            className="relative hidden text-zinc-700 transition hover:text-black sm:block"
          >
            <Heart size={20} strokeWidth={1.8} />

            {wishCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {wishCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-zinc-700 transition hover:text-black"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          <Link
            to="/user"
            className="hidden text-zinc-700 transition hover:text-black lg:block"
          >
            <User size={20} strokeWidth={1.8} />
          </Link>

          {/* Login / Logout */}
          {!user ? (
            <Link
              to="/login"
              className="hidden text-sm uppercase tracking-[0.2em] text-zinc-700 transition hover:text-black lg:block"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden text-sm uppercase tracking-[0.2em] text-zinc-700 transition hover:text-black lg:block"
            >
              Logout
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setShowNav((prev) => !prev)}
            className="text-zinc-700 lg:hidden"
            aria-label={showNav ? "Close menu" : "Open menu"}
            aria-expanded={showNav}
          >
            {showNav ? (
              <X size={24} strokeWidth={1.8} className="sm:size-7" />
            ) : (
              <Menu size={24} strokeWidth={1.8} className="sm:size-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showNav && (
        <div className="border-t border-zinc-200 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-4 p-4 sm:space-y-5 sm:p-6">

            {/* Mobile Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative"
            >
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={handleSearchChange}
                className="w-full rounded-full border border-zinc-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-black"
              />
            </form>

            <nav className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm uppercase tracking-[0.15em] text-zinc-700 sm:text-base">
              <Link to="/home" className="block">
                Home
              </Link>

              <Link to="/products" className="block">
                Shop
              </Link>

              <Link to="/orders" className="block">
                Orders
              </Link>

              <Link to="/wish-list" className="block">
                Wishlist ({wishCount})
              </Link>

              <Link to="/cart" className="block">
                Cart ({cartCount})
              </Link>

              <Link to="/user" className="block">
                Account
              </Link>

              {user && (
                <Link to="/admin" className="block">
                  Admin
                </Link>
              )}
            </nav>

            <div className="border-t border-zinc-200 pt-4">
              {!user ? (
                <Link
                  to="/login"
                  className="block text-sm uppercase tracking-[0.2em] text-zinc-700"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block text-left text-sm uppercase tracking-[0.2em] text-zinc-700"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}