import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function UpdateSection() {
  const API = import.meta.env.VITE_BASE_URI;

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSectionName, setNewSectionName] = useState("");

  async function loadSections() {
    try {
      setLoading(true);

      const res = await fetch(`${API}/sections`);
      const data = await res.json();

      setSections(data.sections || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch sections");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSections();
  }, []);

  async function updateImage(id, image) {
    if (!image.trim()) {
      toast.warning("Enter an image URL.");
      return;
    }

    try {
      await fetch(`${API}/sections/${id}/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
        }),
      });

      toast.success("Image updated successfully.");
      loadSections();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update image.");
    }
  }

  async function createSection() {
    if (!newSectionName.trim()) {
      toast.warning("Section name is required.");
      return;
    }

    try {
      await fetch(`${API}/sections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newSectionName,
          images: [""],
        }),
      });

      toast.success("Section created successfully.");

      setNewSectionName("");

      loadSections();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create section.");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Loading Sections...
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
            Manage Sections
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
            Create new sections and update their display images.
          </p>

        </div>

        {/* Create Section */}

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-light">
            Create Section
          </h2>

          <div className="mt-6 flex flex-col gap-4 md:flex-row">

            <input
              type="text"
              placeholder="Section name"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
            />

            <button
              onClick={createSection}
              className="rounded-full bg-black px-8 py-3 text-xs font-medium uppercase tracking-[0.3em] text-white transition hover:bg-zinc-800"
            >
              Create
            </button>

          </div>

        </div>

        {/* Section Grid */}

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {sections.map((sec) => (
            <div
              key={sec._id}
              className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <img
                src={
                  sec.images?.[0] ||
                  "https://placehold.co/600x600?text=No+Image"
                }
                alt={sec.name}
                className="aspect-square w-full object-cover"
              />

              <div className="p-6">

                <h2 className="text-xl font-light text-zinc-900">
                  {sec.name}
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  Update the display image for this section.
                </p>

                <input
                  id={`img-${sec._id}`}
                  type="text"
                  placeholder="Paste image URL..."
                  className="mt-6 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                />

                <button
                  onClick={() =>
                    updateImage(
                      sec._id,
                      document.getElementById(`img-${sec._id}`).value
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

        {!loading && sections.length === 0 && (
          <div className="py-20 text-center">

            <h2 className="text-3xl font-light text-zinc-900">
              No Sections Found
            </h2>

            <p className="mt-4 text-zinc-500">
              Create your first section to begin organizing products.
            </p>

          </div>
        )}

      </div>
    </div>
  );
}