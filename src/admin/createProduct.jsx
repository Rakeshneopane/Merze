// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function CreateProduct() {
//   const { productId } = useParams();
//   const isEdit = Boolean(productId);

//   const API = import.meta.env.VITE_BASE_URI;

//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     category: "",
//     rating: "",
//     sellerId: "",
//     stock: "",
//     section: "",
//     types: "",
//     images: "",
//   });

//   const [sections, setSections] = useState([]);
//   const [types, setTypes] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false);

//   // Load Sections + Types
//   useEffect(() => {
//     async function loadLists() {
//       const secRes = await fetch(`${API}/sections`);
//       const typeRes = await fetch(`${API}/types`);

//       const secData = await secRes.json();
//       const typeData = await typeRes.json();

//       setSections(secData.sections || []);
//       setTypes(typeData.types || []);
//     }

//     loadLists();
//   }, [API]);

//   // Load product if editing
//   useEffect(() => {
//     if (!isEdit) return;

//     async function loadProduct() {
//       setFetching(true);

//       try {
//         const res = await fetch(`${API}/api/products/${productId}`);
//         const json = await res.json();
//         const p = json.data;

//         setFormData({
//           title: p.title,
//           price: p.price,
//           category: p.category,
//           rating: p.rating,
//           sellerId: p.sellerId,
//           stock: p.stock,
//           section: p.section?._id || "",
//           types: p.types?._id || "",
//           images: p.images?.join(", ") || "",
//         });
//       } finally {
//         setFetching(false);
//       }
//     }

//     loadProduct();
//   }, [API, isEdit, productId]);

//   // FILTER TYPES based on section selection
//   const filteredTypes = formData.section
//     ? types.filter((t) => t.section === formData.section || t.section?._id === formData.section)
//     : [];

//   // SUBMIT
//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);

//     const payload = {
//       title: formData.title,
//       price: Number(formData.price),
//       category: formData.category,
//       rating: Number(formData.rating),
//       sellerId: formData.sellerId,
//       stock: Number(formData.stock),
//       section: formData.section, // <-- ID
//       types: formData.types,     // <-- ID
//       images: formData.images
//         .split(",")
//         .map((i) => i.trim())
//         .filter((i) => i !== ""),
//     };

//     try {
//       const url = isEdit
//         ? `${API}/api/products/${productId}`
//         : `${API}/api/create-products`;

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const json = await res.json();

//       if (!res.ok) {
//         toast.error("Error: " + json.error);
//       } else {
//         toast.success(isEdit ? "Product updated!" : "Product created!");
//       }

//       if (!isEdit) {
//         setFormData({
//           title: "",
//           price: "",
//           category: "",
//           rating: "",
//           sellerId: "",
//           stock: "",
//           section: "",
//           types: "",
//           images: "",
//         });
//       }
//     } catch (err) {
//       toast.error("Failed to submit.");
//       console.error(err);
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="container my-4">
//       <h2>{isEdit ? "Edit Product" : "Create Product"}</h2>

//       {fetching && <p>Loading product…</p>}

//       <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light mt-3">

//         {/* TITLE */}
//         <div className="mb-3">
//           <label className="form-label">Title</label>
//           <input className="form-control"
//             value={formData.title}
//             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             required
//           />
//         </div>

//         {/* PRICE */}
//         <div className="mb-3">
//           <label className="form-label">Price</label>
//           <input type="number"
//             className="form-control"
//             value={formData.price}
//             onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//             required
//           />
//         </div>

//         {/* CATEGORY */}
//         <div className="mb-3">
//           <label className="form-label">Category</label>
//           <input className="form-control"
//             value={formData.category}
//             onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//             required
//           />
//         </div>

//         {/* SECTION (dropdown) */}
//         <div className="mb-3">
//           <label className="form-label">Section</label>
//           <select className="form-control"
//             value={formData.section}
//             onChange={(e) => setFormData({ ...formData, section: e.target.value, types: "" })}
//             required
//           >
//             <option value="">Select Section</option>
//             {sections.map((sec) => (
//               <option key={sec._id} value={sec._id}>
//                 {sec.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* TYPES (filtered dropdown) */}
//         <div className="mb-3">
//           <label className="form-label">Type</label>
//           <select className="form-control"
//             value={formData.types}
//             onChange={(e) => setFormData({ ...formData, types: e.target.value })}
//             required
//           >
//             <option value="">Select Type</option>
//             {filteredTypes.map((t) => (
//               <option key={t._id} value={t._id}>
//                 {t.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* SELLER */}
//         <div className="mb-3">
//           <label className="form-label">Seller ID</label>
//           <input className="form-control"
//             value={formData.sellerId}
//             onChange={(e) => setFormData({ ...formData, sellerId: e.target.value })}
//             required
//           />
//         </div>

//         {/* STOCK */}
//         <div className="mb-3">
//           <label className="form-label">Stock</label>
//           <input type="number"
//             className="form-control"
//             value={formData.stock}
//             onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//             required
//           />
//         </div>

//         {/* RATING */}
//         <div className="mb-3">
//           <label className="form-label">Rating</label>
//           <input type="number" step="0.1" max="5" min="0"
//             className="form-control"
//             value={formData.rating}
//             onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
//             required
//           />
//         </div>

//         {/* IMAGES */}
//         <div className="mb-3">
//           <label className="form-label">Images (comma separated)</label>
//           <input className="form-control"
//             value={formData.images}
//             onChange={(e) => setFormData({ ...formData, images: e.target.value })}
//             required
//           />
//         </div>

//         <button className="btn btn-success w-100" type="submit" disabled={loading}>
//           {loading ? "Saving…" : isEdit ? "Update Product" : "Create Product"}
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateProduct() {
  const { productId } = useParams();
  const isEdit = Boolean(productId);

  const API = import.meta.env.VITE_BASE_URI;

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    rating: "",
    sellerId: "",
    stock: "",
    section: "",
    types: "",
    images: "",
  });

  const [sections, setSections] = useState([]);
  const [types, setTypes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Load Sections & Types
  useEffect(() => {
    async function loadLists() {
      try {
        const secRes = await fetch(`${API}/sections`);
        const typeRes = await fetch(`${API}/types`);

        const secData = await secRes.json();
        const typeData = await typeRes.json();

        setSections(secData.sections || []);
        setTypes(typeData.types || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load sections or types");
      }
    }

    loadLists();
  }, [API]);

  // Load Product (Edit Mode)
  useEffect(() => {
    if (!isEdit) return;

    async function loadProduct() {
      setFetching(true);

      try {
        const res = await fetch(`${API}/api/products/${productId}`);
        const json = await res.json();

        const p = json.data;

        setFormData({
          title: p.title || "",
          price: p.price || "",
          category: p.category || "",
          rating: p.rating || "",
          sellerId: p.sellerId || "",
          stock: p.stock || "",
          section: p.section?._id || "",
          types: p.types?._id || "",
          images: p.images?.join(", ") || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Unable to load product.");
      } finally {
        setFetching(false);
      }
    }

    loadProduct();
  }, [API, isEdit, productId]);

  // Filter types by selected section
  const filteredTypes = formData.section
    ? types.filter(
        (t) =>
          t.section === formData.section ||
          t.section?._id === formData.section
      )
    : [];

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const payload = {
      title: formData.title,
      price: Number(formData.price),
      category: formData.category,
      rating: Number(formData.rating),
      sellerId: formData.sellerId,
      stock: Number(formData.stock),
      section: formData.section,
      types: formData.types,
      images: formData.images
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean),
    };

    try {
      const url = isEdit
        ? `${API}/api/products/${productId}`
        : `${API}/api/create-products`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error || "Failed to save product.");
      } else {
        toast.success(
          isEdit
            ? "Product updated successfully."
            : "Product created successfully."
        );

        if (!isEdit) {
          setFormData({
            title: "",
            price: "",
            category: "",
            rating: "",
            sellerId: "",
            stock: "",
            section: "",
            types: "",
            images: "",
          });
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit.");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Loading Product...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-12">

        <div className="mb-10 border-b border-zinc-200 pb-8">

          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Administration
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight text-zinc-900">
            {isEdit ? "Edit Product" : "Create Product"}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
            Fill in the product information below. All fields are required.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
        >

          <div className="grid gap-8 md:grid-cols-2">
                        {/* Title */}

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                Product Title
              </label>

              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Price */}

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                Price
              </label>

              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Category */}

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                Category
              </label>

              <input
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Seller */}

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                Seller ID
              </label>

              <input
                value={formData.sellerId}
                onChange={(e) =>
                  setFormData({ ...formData, sellerId: e.target.value })
                }
                required
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Stock */}

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                Stock
              </label>

              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                required
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Rating */}

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                Rating
              </label>

              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
                required
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Section */}

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                Section
              </label>

              <select
                value={formData.section}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    section: e.target.value,
                    types: "",
                  })
                }
                required
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-black"
              >
                <option value="">Select Section</option>

                {sections.map((sec) => (
                  <option key={sec._id} value={sec._id}>
                    {sec.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                Product Type
              </label>

              <select
                value={formData.types}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    types: e.target.value,
                  })
                }
                required
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-black"
              >
                <option value="">Select Type</option>

                {filteredTypes.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Images */}

          <div className="mt-8">

            <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
              Image URLs (comma separated)
            </label>

            <textarea
              rows={4}
              value={formData.images}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  images: e.target.value,
                })
              }
              placeholder="https://...jpg, https://...jpg"
              required
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
            />

          </div>

          {/* Preview */}

          {formData.images.trim() && (
            <div className="mt-10">

              <h2 className="mb-5 text-lg font-light">
                Image Preview
              </h2>

              <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

                {formData.images
                  .split(",")
                  .map((img) => img.trim())
                  .filter(Boolean)
                  .map((img, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-2xl border border-zinc-200"
                    >
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="aspect-[3/4] w-full object-cover"
                      />
                    </div>
                  ))}

              </div>

            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="mt-10 w-full rounded-full bg-black px-8 py-4 text-xs font-medium uppercase tracking-[0.3em] text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Product"
              : "Create Product"}
          </button>

        </form>

      </div>
    </div>
  );
}