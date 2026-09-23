"use client";

import { useState, useEffect } from "react";
import { Layers, Plus, Edit, Image as ImageIcon } from "lucide-react";

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCol, setEditingCol] = useState<any>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [story, setStory] = useState("");
  const [featured, setFeatured] = useState(false);

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/collections");
      const data = await res.json();
      setCollections(data.collections || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleEdit = (col: any) => {
    setEditingCol(col);
    setName(col.name);
    setDescription(col.description);
    setHeroImage(col.heroImage);
    setStory(col.story || "");
    setFeatured(col.featured);
    setModalOpen(true);
  };

  const handleNew = () => {
    setEditingCol(null);
    setName("");
    setDescription("");
    setHeroImage("");
    setStory("");
    setFeatured(false);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !heroImage) return;

    try {
      const res = await fetch("/api/admin/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingCol?.id,
          name,
          description,
          heroImage,
          thumbnail: heroImage,
          story,
          featured,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchCollections();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
            <Layers className="w-6 h-6 text-amber-400" />
            <span>Collections Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage heritage themes, stories, hero banner media, and featured status.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Collection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div key={col.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
            <div>
              <div className="h-44 relative bg-slate-950">
                <img src={col.heroImage} alt={col.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => handleEdit(col)}
                  className="absolute top-3 right-3 p-2 bg-slate-900/80 backdrop-blur text-amber-400 rounded-xl hover:bg-slate-900 transition"
                >
                  <Edit className="w-4 h-4" />
                </button>
                {col.featured && (
                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-slate-950">
                    FEATURED
                  </span>
                )}
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-serif font-bold text-white text-base">{col.name}</h3>
                <p className="text-xs text-slate-300">{col.description}</p>
                {col.story && <p className="text-[11px] text-slate-400 italic mt-2">"{col.story}"</p>}
              </div>
            </div>
            <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 text-[10px] text-slate-500 font-mono">
              SLUG: {col.slug}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-semibold text-white">
              {editingCol ? `Edit Collection: ${editingCol.name}` : "Add Collection"}
            </h3>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Collection Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Silver Heritage"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Hero Image URL *</label>
              <input
                type="text"
                required
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Heritage Story</label>
              <textarea
                rows={2}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Story snippet behind this collection..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-300">
              <input
                type="checkbox"
                id="featCol"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded text-amber-500 bg-slate-950 border-slate-800"
              />
              <label htmlFor="featCol">Feature on Customer Homepage</label>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-semibold hover:bg-amber-400"
              >
                Save Collection
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
