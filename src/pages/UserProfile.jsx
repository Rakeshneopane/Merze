import { useUserContext } from "../contexts/userContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { user, saveUser, logout } = useUserContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    gender: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        surname: user.surname || "",
        gender: user.gender || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleSelectAddress = (addressId) => {
    localStorage.setItem("addressId", addressId);
    setSuccess("Address selected!");
    setTimeout(() => setSuccess(null), 1200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://my-ecommerce-eta-ruby.vercel.app/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      saveUser(data.user);

      localStorage.setItem("userId", data.user._id);
      localStorage.removeItem("addressId");

      setSuccess("Profile created!");
    } catch (err) {
      setError("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("userId");
    localStorage.removeItem("addressId");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">

        {user ? (
          <>
            {/* HERO */}
            <div className="border-b border-zinc-200 pb-10">
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                Account
              </p>

              <h1 className="mt-4 text-5xl font-light tracking-tight text-zinc-900">
                My Account
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
                Manage your personal details, saved delivery addresses,
                and account preferences.
              </p>
            </div>

            {/* PROFILE */}
            <div className="mt-14 rounded-3xl border border-zinc-200 bg-white p-8">

              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Profile
              </p>

              <div className="mt-8 grid gap-8 md:grid-cols-2">

                <div>
                  <h2 className="text-3xl font-light text-zinc-900">
                    {user.name} {user.surname}
                  </h2>

                  <div className="mt-8 space-y-6">

                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                        Email
                      </p>

                      <p className="mt-2 text-zinc-700">
                        {user.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                        Phone
                      </p>

                      <p className="mt-2 text-zinc-700">
                        {user.phone}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                        Gender
                      </p>

                      <p className="mt-2 capitalize text-zinc-700">
                        {user.gender}
                      </p>
                    </div>

                  </div>
                </div>

                <div className="flex items-end justify-start md:justify-end">
                  <button
                    onClick={handleLogout}
                    className="rounded-full border border-zinc-900 px-8 py-3 text-xs font-medium uppercase tracking-[0.25em] transition duration-300 hover:bg-zinc-900 hover:text-white"
                  >
                    Logout
                  </button>
                </div>

              </div>

            </div>

            {/* ADDRESS HEADER */}
            <div className="mt-20 flex flex-col gap-6 border-b border-zinc-200 pb-8 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                  Delivery
                </p>

                <h2 className="mt-3 text-4xl font-light tracking-tight">
                  Saved Addresses
                </h2>
              </div>

              <Link
                to="/address"
                className="inline-flex items-center justify-center rounded-full border border-zinc-900 px-8 py-3 text-xs font-medium uppercase tracking-[0.25em] transition duration-300 hover:bg-zinc-900 hover:text-white"
              >
                Add Address
              </Link>

            </div>

            {/* ADDRESS LIST */}
            <div className="mt-10 grid gap-8 md:grid-cols-2">
                            {user.addresses?.map((address) => {
                const isSelected =
                  localStorage.getItem("addressId") === address._id;

                return (
                  <div
                    key={address._id}
                    onClick={() => handleSelectAddress(address._id)}
                    className={`group cursor-pointer rounded-3xl border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      isSelected
                        ? "border-black"
                        : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <div className="flex items-start justify-between">

                      <div className="flex items-start gap-4">

                        <div className="mt-1">
                          <input
                            type="radio"
                            name="address"
                            checked={isSelected}
                            onChange={() => handleSelectAddress(address._id)}
                            onClick={(e) => e.stopPropagation()}
                            className="h-4 w-4 accent-black"
                          />
                        </div>

                        <div>

                          <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-700">
                            {address.addressType}
                          </span>

                          <div className="mt-6 space-y-2 text-sm leading-7 text-zinc-600">

                            <p>{address.area}</p>

                            <p>
                              {address.city}, {address.state}
                            </p>

                            <p>{address.pincode}</p>

                            {address.landmark && (
                              <p>
                                Landmark: {address.landmark}
                              </p>
                            )}

                            {address.alternatePhone && (
                              <p>
                                Alt Phone: {address.alternatePhone}
                              </p>
                            )}

                          </div>

                        </div>

                      </div>

                      <Link
                        to={`/address?id=${address._id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 transition hover:text-black"
                      >
                        Edit →
                      </Link>

                    </div>

                    <div className="mt-8 border-t border-zinc-200 pt-6">

                      {isSelected ? (
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900">
                          <span className="h-2 w-2 rounded-full bg-black"></span>
                          Selected for delivery
                        </span>
                      ) : (
                        <span className="text-sm text-zinc-500 transition group-hover:text-zinc-900">
                          Click to use this address
                        </span>
                      )}

                    </div>

                  </div>
                );
              })}
            </div>

            {success && (
              <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-4 text-sm text-zinc-700">
                {success}
              </div>
            )}

          </>
        ) : (
                    <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
            <div className="mb-10 border-b border-zinc-200 pb-8">
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                Welcome
              </p>

              <h1 className="mt-3 text-4xl font-light tracking-tight text-zinc-900">
                Create Your Profile
              </h1>

              <p className="mt-4 text-sm leading-7 text-zinc-600">
                Complete your profile to start shopping and manage your
                delivery addresses.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
                    First Name
                  </label>

                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={formData.surname}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        surname: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
                    placeholder="Doe"
                  />
                </div>

              </div>

              <div>
                <label className="mb-4 block text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
                  Gender
                </label>

                <div className="flex gap-8">

                  <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-700">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                      className="accent-black"
                    />

                    Male
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-700">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                      className="accent-black"
                    />

                    Female
                  </label>

                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
                  Email
                </label>

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
                  Phone
                </label>

                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
                  placeholder="+91 9876543210"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-black px-8 py-4 text-xs font-medium uppercase tracking-[0.3em] text-white transition duration-300 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating Profile..." : "Create Profile"}
              </button>

              {success && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

            </form>
          </div>
        )}
      </div>
    </div>
  );
}