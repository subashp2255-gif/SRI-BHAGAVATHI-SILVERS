"use client";

import { useState, useEffect } from "react";
import { Grid, Plus, Edit, Image as ImageIcon, Save, CheckCircle2 } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<any>(null);

  // Form
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (cat: any) => {
    setEditingCat(cat);
    setName(cat.name);
    setImage(cat.image);
    setDescription(cat.description || "");
    setModalOpen(true);
  };

  const handleNew = () => {
    setEditingCat(null);
    setName("");
    setImage("");
    setDescription("");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) return;

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingCat?.id || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          name,
          image,
          description,
        }),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchCategories();
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
            <Grid className="w-6 h-6 text-amber-400" />
            <span>Category Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, edit, and organize public product categories.
          </p>
        </div>

        <button
          onClick={handleNew}
          className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group">
            <div className="h-36 relative overflow-hidden bg-slate-950">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <button
                onClick={() => handleEdit(cat)}
                className="absolute top-2 right-2 p-2 bg-slate-900/80 backdrop-blur text-amber-400 rounded-xl hover:bg-slate-900 transition"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-semibold text-white text-sm">{cat.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{cat.description || "No description provided."}</p>
              <div className="pt-2 text-[10px] text-amber-400 font-mono">ID: {cat.id}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-semibold text-white">
              {editingCat ? `Edit Category: ${editingCat.name}` : "Add Category"}
            </h3>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Category Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Silver Rings"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Image URL *</label>
              <input
                type="text"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
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
                Save Category
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
