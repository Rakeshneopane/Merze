// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useUserContext } from "../contexts/userContext";

// export default function AddressManagement() {
//   const { user, saveUser } = useUserContext();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const params = new URLSearchParams(location.search);
//   const editId = params.get("id");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const [addressData, setAddressData] = useState({
//     area: "",
//     city: "",
//     state: "",
//     pincode: "",
//     landmark: "",
//     alternatePhone: "",
//     addressType: "",
//   });

//   // -------------------------
//   // PREFILL IF EDITING
//   // -------------------------
//   useEffect(() => {
//     if (editId && user?.addresses) {
//       const found = user.addresses.find((a) => a._id === editId);
//       if (found) {
//         setAddressData({
//           area: found.area || "",
//           city: found.city || "",
//           state: found.state || "",
//           pincode: found.pincode || "",
//           landmark: found.landmark || "",
//           alternatePhone: found.alternatePhone || "",
//           addressType: found.addressType || "",
//         });
//       }
//     }
//   }, [editId, user]);

//   const handleChange = (field, value) => {
//     setAddressData((prev) => ({ ...prev, [field]: value }));
//   };

//   // -------------------------
//   // DELETE ADDRESS
//   // -------------------------
//   const handleDelete = async () => {
   
//     try {
//       const url = `https://my-ecommerce-eta-ruby.vercel.app/api/users/${user._id}/addresses/${editId}`;

//       const res = await fetch(url, { method: "DELETE" });

//       if (!res.ok) throw new Error("Delete failed");

//       const updated = user.addresses.filter((a) => a._id !== editId);

//       saveUser({ ...user, addresses: updated });

//       if (localStorage.getItem("addressId") === editId) {
//         localStorage.removeItem("addressId");
//       }

//       navigate("/user");
//     } catch (err) {  
//       alert("Failed to delete address");
//     }
//   };

//   // -------------------------
//   // SUBMIT FORM (ADD / UPDATE)
//   // -------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!user?._id) {
//       setError("Create a user first.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const url = editId
//         ? `https://my-ecommerce-eta-ruby.vercel.app/api/users/${user._id}/addresses/${editId}`
//         : `https://my-ecommerce-eta-ruby.vercel.app/api/users/${user._id}/addresses`;

//       const method = "POST";

//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(addressData),
//       });

//       if (!res.ok) throw new Error("Save failed");

//       const data = await res.json();

//       let updatedAddresses = [...(user.addresses || [])];

//       if (editId) {
//         updatedAddresses = updatedAddresses.map((a) =>
//           a._id === editId ? data.address : a
//         );
//       } else {
//         updatedAddresses.push(data.address);
//       }

//       saveUser({ ...user, addresses: updatedAddresses });

//       localStorage.setItem("addressId", data.address._id);

//       navigate("/user");
//     } catch (err) {
//       setError("Failed to save address.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-3">
//       <div className="card p-3 shadow-sm">
//         <h4 className="mb-3">{editId ? "Edit Address" : "Add Address"}</h4>

//         <form onSubmit={handleSubmit}>
//           <textarea
//             className="form-control mb-2"
//             placeholder="Address (area / street)"
//             value={addressData.area}
//             onChange={(e) => handleChange("area", e.target.value)}
//             required
//           />

//           <input
//             className="form-control mb-2"
//             placeholder="City / District"
//             value={addressData.city}
//             required
//             onChange={(e) => handleChange("city", e.target.value)}
//           />

//           <select
//             className="form-control mb-2"
//             value={addressData.state}
//             required
//             onChange={(e) => handleChange("state", e.target.value)}
//           >
//             <option value="">Select State</option>
//             <option>Assam</option>
//             <option>Manipur</option>
//             <option>Mizoram</option>
//             <option>Meghalaya</option>
//             <option>Nagaland</option>
//             <option>Tripura</option>
//           </select>

//           <input
//             className="form-control mb-2"
//             placeholder="Pincode"
//             value={addressData.pincode}
//             required
//             onChange={(e) => handleChange("pincode", e.target.value)}
//           />

//           <input
//             className="form-control mb-2"
//             placeholder="Landmark (optional)"
//             value={addressData.landmark}
//             onChange={(e) => handleChange("landmark", e.target.value)}
//           />

//           <input
//             className="form-control mb-3"
//             placeholder="Alternate Phone (optional)"
//             value={addressData.alternatePhone}
//             onChange={(e) =>
//               handleChange("alternatePhone", e.target.value)
//             }
//           />

//           {/* ADDRESS TYPE */}
//           <div className="mb-3">
//             <label className="me-3">
//               <input
//                 type="radio"
//                 name="addressType"
//                 value="Home"
//                 checked={addressData.addressType === "Home"}
//                 onChange={(e) => handleChange("addressType", e.target.value)}
//                 required
//               />{" "}
//               Home
//             </label>

//             <label>
//               <input
//                 type="radio"
//                 name="addressType"
//                 value="Work"
//                 checked={addressData.addressType === "Work"}
//                 onChange={(e) => handleChange("addressType", e.target.value)}
//               />{" "}
//               Work
//             </label>
//           </div>
//             <div className="d-flex flex-column gap-2 mt-3">
//                 <button
//                     className="btn btn-primary btn-sm"
//                     type="submit"
//                     disabled={loading}
//                 >
//                     {loading ? "Saving..." : editId ? "Update Address" : "Save Address"}
//                 </button>
//                 <button
//                     type="button"
//                     className="btn btn-outline-secondary btn-sm"
//                     onClick={() => navigate("/user")}
//                 >
//                     Cancel
//                 </button>

//                 {editId && (
//                     <button
//                     type="button"
//                     className="btn btn-danger btn-sm"
//                     onClick={handleDelete}
//                     >
//                     Delete Address
//                     </button>
//                 )}
//             </div>
//           {error && <p className="text-danger mt-2">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

export default function AddressManagement() {
  const { user, saveUser } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const editId = params.get("id");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [addressData, setAddressData] = useState({
    area: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    alternatePhone: "",
    addressType: "",
  });

  useEffect(() => {
    if (editId && user?.addresses) {
      const found = user.addresses.find((a) => a._id === editId);

      if (found) {
        setAddressData({
          area: found.area || "",
          city: found.city || "",
          state: found.state || "",
          pincode: found.pincode || "",
          landmark: found.landmark || "",
          alternatePhone: found.alternatePhone || "",
          addressType: found.addressType || "",
        });
      }
    }
  }, [editId, user]);

  const handleChange = (field, value) => {
    setAddressData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      const url = `https://my-ecommerce-eta-ruby.vercel.app/api/users/${user._id}/addresses/${editId}`;

      const res = await fetch(url, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      const updated = user.addresses.filter((a) => a._id !== editId);

      saveUser({
        ...user,
        addresses: updated,
      });

      if (localStorage.getItem("addressId") === editId) {
        localStorage.removeItem("addressId");
      }

      navigate("/user");
    } catch (err) {
      alert("Failed to delete address");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    if (!user?._id) {
      setError("Create a user first.");
      setLoading(false);
      return;
    }

    try {
      const url = editId
        ? `https://my-ecommerce-eta-ruby.vercel.app/api/users/${user._id}/addresses/${editId}`
        : `https://my-ecommerce-eta-ruby.vercel.app/api/users/${user._id}/addresses`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });

      if (!res.ok) throw new Error("Save failed");

      const data = await res.json();

      let updatedAddresses = [...(user.addresses || [])];

      if (editId) {
        updatedAddresses = updatedAddresses.map((a) =>
          a._id === editId ? data.address : a
        );
      } else {
        updatedAddresses.push(data.address);
      }

      saveUser({
        ...user,
        addresses: updatedAddresses,
      });

      localStorage.setItem("addressId", data.address._id);

      navigate("/user");
    } catch (err) {
      setError("Failed to save address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16">

        <div className="mb-12 border-b border-zinc-200 pb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Address
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight">
            {editId ? "Edit Address" : "Add Address"}
          </h1>

          <p className="mt-3 text-sm leading-7 text-zinc-600">
            Save your delivery address for faster checkout.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
        >

          <div className="space-y-6">

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                Street / Area
              </label>

              <textarea
                required
                rows={4}
                value={addressData.area}
                onChange={(e) =>
                  handleChange("area", e.target.value)
                }
                className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                  City
                </label>

                <input
                  required
                  value={addressData.city}
                  onChange={(e) =>
                    handleChange("city", e.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                  State
                </label>

                <select
                  required
                  value={addressData.state}
                  onChange={(e) =>
                    handleChange("state", e.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
                >
                  <option value="">Select State</option>
                  <option>Assam</option>
                  <option>Manipur</option>
                  <option>Mizoram</option>
                  <option>Meghalaya</option>
                  <option>Nagaland</option>
                  <option>Tripura</option>
                </select>
              </div>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                  Pincode
                </label>

                <input
                  required
                  value={addressData.pincode}
                  onChange={(e) =>
                    handleChange("pincode", e.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                  Landmark
                </label>

                <input
                  value={addressData.landmark}
                  onChange={(e) =>
                    handleChange("landmark", e.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                Alternate Phone
              </label>

              <input
                value={addressData.alternatePhone}
                onChange={(e) =>
                  handleChange("alternatePhone", e.target.value)
                }
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
                Address Type
              </p>

              <div className="flex gap-8">

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="Home"
                    name="addressType"
                    checked={addressData.addressType === "Home"}
                    onChange={(e) =>
                      handleChange("addressType", e.target.value)
                    }
                    className="accent-black"
                    required
                  />
                  Home
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="Work"
                    name="addressType"
                    checked={addressData.addressType === "Work"}
                    onChange={(e) =>
                      handleChange("addressType", e.target.value)
                    }
                    className="accent-black"
                  />
                  Work
                </label>

              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4 pt-6 sm:flex-row">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-full bg-black px-8 py-4 text-xs font-medium uppercase tracking-[0.3em] text-white transition hover:bg-zinc-800 disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editId
                  ? "Update Address"
                  : "Save Address"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/user")}
                className="rounded-full border border-zinc-300 px-8 py-4 text-xs font-medium uppercase tracking-[0.3em] transition hover:border-black"
              >
                Cancel
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="rounded-full border border-red-300 px-8 py-4 text-xs font-medium uppercase tracking-[0.3em] text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>
              )}

            </div>

          </div>

        </form>

      </div>
    </div>
  );
}