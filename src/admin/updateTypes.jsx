import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function UpdateTypes() {
  const API = import.meta.env.VITE_BASE_URI;

  const [sections, setSections] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeSection, setNewTypeSection] = useState("");

  async function loadData() {
    try {
      setLoading(true);

      const secRes = await fetch(`${API}/sections`);
      const typeRes = await fetch(`${API}/types`);

      const secData = await secRes.json();
      const typeData = await typeRes.json();

      setSections(secData.sections || []);
      setTypes(typeData.types || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load types.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function updateTypeImage(typeId, image) {
    if (!image.trim()) {
      toast.warning("Enter an image URL.");
      return;
    }

    try {
      await fetch(`${API}/types/${typeId}/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
        }),
      });

      toast.success("Type image updated.");
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update type image.");
    }
  }

  async function createType() {
    if (!newTypeName.trim()) {
      toast.warning("Type name is required.");
      return;
    }

    if (!newTypeSection) {
      toast.warning("Select a section.");
      return;
    }

    try {
      await fetch(`${API}/types`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newTypeName,
          section: newTypeSection,
          images: [""],
        }),
      });

      toast.success("Type created successfully.");

      setNewTypeName("");
      setNewTypeSection("");

      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create type.");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Loading Types...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-10 border-b border-zinc-200 pb-8">

          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Administration
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight text-zinc-900">
            Manage Types
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
            Create product types, assign them to sections, and update their
            display images.
          </p>

        </div>

        {/* Create Type */}

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-light">
            Create New Type
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                Type Name
              </label>

              <input
                type="text"
                placeholder="Type name"
                value={newTypeName}
                onChange={(e) => setNewTypeName(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
              />

            </div>

            <div>

              <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-500">
                Section
              </label>

              <select
                value={newTypeSection}
                onChange={(e) => setNewTypeSection(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-black"
              >
                <option value="">Select Section</option>

                {sections.map((section) => (
                  <option key={section._id} value={section._id}>
                    {section.name}
                  </option>
                ))}

              </select>

            </div>

          </div>

          <button
            onClick={createType}
            className="mt-8 rounded-full bg-black px-8 py-3 text-xs font-medium uppercase tracking-[0.3em] text-white transition hover:bg-zinc-800"
          >
            Create Type
          </button>

        </div>

        {/* Types grouped by section */}

        <div className="mt-12 space-y-12">
                    {sections.map((sec) => {
            const filtered = types.filter(
              (t) =>
                t.section === sec._id ||
                t.section?._id === sec._id
            );

            return (
              <section key={sec._id}>

                <div className="mb-6 flex items-center justify-between border-b border-zinc-200 pb-4">

                  <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                      Section
                    </p>

                    <h2 className="mt-2 text-3xl font-light text-zinc-900">
                      {sec.name}
                    </h2>

                  </div>

                  <span className="rounded-full bg-zinc-100 px-4 py-2 text-xs uppercase tracking-[0.25em] text-zinc-600">
                    {filtered.length} Types
                  </span>

                </div>

                {filtered.length === 0 ? (

                  <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center">

                    <p className="text-zinc-500">
                      No product types available for this section.
                    </p>

                  </div>

                ) : (

                  <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {filtered.map((type) => (

                      <div
                        key={type._id}
                        className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-lg"
                      >

                        <img
                          src={
                            type.images?.[0] ||
                            "https://placehold.co/600x600?text=No+Image"
                          }
                          alt={type.name}
                          className="aspect-square w-full object-cover"
                        />

                        <div className="p-6">

                          <h3 className="text-xl font-light text-zinc-900">
                            {type.name}
                          </h3>

                          <p className="mt-2 text-sm text-zinc-500">
                            Update the image shown for this product type.
                          </p>

                          <input
                            id={`type-img-${type._id}`}
                            type="text"
                            placeholder="Paste image URL..."
                            className="mt-6 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                          />

                          <button
                            onClick={() =>
                              updateTypeImage(
                                type._id,
                                document.getElementById(
                                  `type-img-${type._id}`
                                ).value
                              )
                            }
                            className="mt-5 w-full rounded-full bg-black px-6 py-3 text-xs font-medium uppercase tracking-[0.3em] text-white transition hover:bg-zinc-800"
                          >
                            Save Image
                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </section>
            );
          })}

        </div>

      </div>
    </div>
  );
}