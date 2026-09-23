"use client";

import { useState, useEffect } from "react";
import { Calendar, Plus, Edit, Image as ImageIcon } from "lucide-react";

export default function AdminOccasionsPage() {
  const [occasions, setOccasions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOcc, setEditingOcc] = useState<any>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [featured, setFeatured] = useState(true);

  const fetchOccasions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/occasions");
      const data = await res.json();
      setOccasions(data.occasions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOccasions();
  }, []);

  const handleEdit = (occ: any) => {
    setEditingOcc(occ);
    setName(occ.name);
    setDescription(occ.description);
    setHeroImage(occ.heroImage);
    setFeatured(occ.featured);
    setModalOpen(true);
  };

  const handleNew = () => {
    setEditingOcc(null);
    setName("");
    setDescription("");
    setHeroImage("");
    setFeatured(true);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !heroImage) return;

    try {
      const res = await fetch("/api/admin/occasions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingOcc?.id,
          name,
          description,
          heroImage,
          thumbnail: heroImage,
          featured,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchOccasions();
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
            <Calendar className="w-6 h-6 text-amber-400" />
            <span>Occasion Categories Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage Wedding, Housewarming, Baby, Pooja, Festival, Anniversary, and Gifting showcase pages.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Occasion</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {occasions.map((occ) => (
          <div key={occ.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group flex flex-col justify-between">
            <div>
              <div className="h-40 relative bg-slate-950">
                <img src={occ.heroImage} alt={occ.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <button
                  onClick={() => handleEdit(occ)}
                  className="absolute top-3 right-3 p-2 bg-slate-900/80 backdrop-blur text-amber-400 rounded-xl hover:bg-slate-900 transition"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-serif font-bold text-white text-base">{occ.name}</h3>
                <p className="text-xs text-slate-300">{occ.description}</p>
              </div>
            </div>
            <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 text-[10px] text-slate-500 font-mono">
              SLUG: {occ.slug}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-semibold text-white">
              {editingOcc ? `Edit Occasion: ${editingOcc.name}` : "Add Occasion"}
            </h3>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Occasion Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Wedding"
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
                Save Occasion
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
