import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const API = import.meta.env.VITE_BASE_URI;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/products`);
        const json = await res.json();

        setProducts(json.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
  }, [API]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Loading Products...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-6 border-b border-zinc-200 pb-8 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Administration
            </p>

            <h1 className="mt-3 text-4xl font-light tracking-tight text-zinc-900">
              Product Dashboard
            </h1>

            <p className="mt-4 text-sm text-zinc-600">
              Manage products, categories, sections and types.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <Link
              to="/update-sections"
              className="rounded-full border border-zinc-300 px-5 py-3 text-xs font-medium uppercase tracking-[0.25em] transition hover:border-black hover:bg-black hover:text-white"
            >
              Update Sections
            </Link>

            <Link
              to="/update-types"
              className="rounded-full border border-zinc-300 px-5 py-3 text-xs font-medium uppercase tracking-[0.25em] transition hover:border-black hover:bg-black hover:text-white"
            >
              Update Types
            </Link>

            <Link
              to="/admin/create-product"
              className="rounded-full bg-black px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] text-white transition hover:bg-zinc-800"
            >
              + Create Product
            </Link>

          </div>

        </div>

        {/* Desktop Table */}

        <div className="hidden overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm lg:block">

          <div className="overflow-x-auto">

            <table className="min-w-full text-sm">

              <thead className="border-b border-zinc-200 bg-zinc-100">

                <tr className="text-left text-xs uppercase tracking-[0.25em] text-zinc-600">

                  <th className="px-6 py-5">Product</th>
                  <th className="px-6 py-5">Title</th>
                  <th className="px-6 py-5">Category</th>
                  <th className="px-6 py-5">Price</th>
                  <th className="px-6 py-5">Stock</th>
                  <th className="px-6 py-5">Section</th>
                  <th className="px-6 py-5">Type</th>
                  <th className="px-6 py-5 text-center">Action</th>

                </tr>

              </thead>

              <tbody>

                {products.map((p) => (

                  <tr
                    key={p._id}
                    className="border-b border-zinc-100 transition hover:bg-zinc-50"
                  >

                    <td className="px-6 py-5">

                      <img
                        src={p.images?.[0] || "https://placehold.co/80x100"}
                        alt={p.title}
                        className="h-20 w-16 rounded-xl object-cover"
                      />

                    </td>

                    <td className="px-6 py-5 font-medium">
                      {p.title}
                    </td>

                    <td className="px-6 py-5 capitalize">
                      {p.category}
                    </td>

                    <td className="px-6 py-5">
                      ₹{p.price}
                    </td>

                    <td className="px-6 py-5">
                      {p.stock}
                    </td>

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <img
                          src={
                            p.section?.images?.[0] ||
                            "https://placehold.co/50x50"
                          }
                          alt=""
                          className="h-10 w-10 rounded-lg object-cover"
                        />

                        <span>
                          {p.section?.name || "-"}
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <img
                          src={
                            p.types?.images?.[0] ||
                            "https://placehold.co/50x50"
                          }
                          alt=""
                          className="h-10 w-10 rounded-lg object-cover"
                        />

                        <span>
                          {p.types?.name || "-"}
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-5 text-center">

                      <Link
                        to={`/admin/edit-product/${p._id}`}
                        className="inline-flex rounded-full border border-black px-5 py-2 text-xs font-medium uppercase tracking-[0.25em] transition hover:bg-black hover:text-white"
                      >
                        Edit
                      </Link>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Mobile Cards */}

        <div className="space-y-6 lg:hidden">

          {products.map((p) => (

            <div
              key={p._id}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >

              <div className="flex gap-5">

                <img
                  src={p.images?.[0] || "https://placehold.co/100x120"}
                  alt={p.title}
                  className="h-28 w-24 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h2 className="text-lg font-medium">
                    {p.title}
                  </h2>

                  <p className="mt-2 text-sm text-zinc-600">
                    {p.category}
                  </p>

                  <p className="mt-2 text-sm">
                    Price: ₹{p.price}
                  </p>

                  <p className="text-sm">
                    Stock: {p.stock}
                  </p>

                </div>

              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-zinc-100 p-4">

                  <img
                    src={
                      p.section?.images?.[0] ||
                      "https://placehold.co/60x60"
                    }
                    alt=""
                    className="mb-3 h-12 w-12 rounded-lg object-cover"
                  />

                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Section
                  </p>

                  <p className="mt-2">
                    {p.section?.name || "-"}
                  </p>

                </div>

                <div className="rounded-2xl bg-zinc-100 p-4">

                  <img
                    src={
                      p.types?.images?.[0] ||
                      "https://placehold.co/60x60"
                    }
                    alt=""
                    className="mb-3 h-12 w-12 rounded-lg object-cover"
                  />

                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Type
                  </p>

                  <p className="mt-2">
                    {p.types?.name || "-"}
                  </p>

                </div>

              </div>

              <Link
                to={`/admin/edit-product/${p._id}`}
                className="mt-6 inline-flex w-full justify-center rounded-full bg-black px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] text-white transition hover:bg-zinc-800"
              >
                Edit Product
              </Link>

            </div>

          ))}

        </div>

        {!loading && products.length === 0 && (
          <div className="py-20 text-center">

            <h2 className="text-2xl font-light text-zinc-800">
              No Products Found
            </h2>

            <p className="mt-3 text-zinc-500">
              Create your first product to get started.
            </p>

          </div>
        )}

      </div>
    </div>
  );
}