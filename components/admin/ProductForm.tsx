"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  Save,
  Eye,
  ArrowLeft,
  Sparkles,
  Tag,
  Calendar,
  Image as ImageIcon,
  DollarSign,
  Info,
  Globe,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";

interface ProductFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "rings");
  const [categoryLabel, setCategoryLabel] = useState(initialData?.categoryLabel || "Silver Rings");
  const [collection, setCollection] = useState(initialData?.collection || "Royal Silver Heritage");
  const [description, setDescription] = useState(initialData?.description || "");
  const [story, setStory] = useState(initialData?.story || "");
  const [careInstructions, setCareInstructions] = useState(initialData?.careInstructions || "");

  // Media
  const [image, setImage] = useState(initialData?.image || "");
  const [secondaryImages, setSecondaryImages] = useState<string[]>(initialData?.secondaryImages || []);
  const [newImageInput, setNewImageInput] = useState("");

  // Pricing Mode
  const [pricingMode, setPricingMode] = useState<"FIXED" | "RATE_BASED">(initialData?.pricingMode || "FIXED");
  const [fixedPrice, setFixedPrice] = useState<string>(initialData?.price ? initialData.price.toString() : "4500");
  const [weightGrams, setWeightGrams] = useState<string>(initialData?.weightGrams ? initialData.weightGrams.toString() : "18.5");
  const [purity, setPurity] = useState<string>(initialData?.purity || "925");
  const [makingCharge, setMakingCharge] = useState<string>(initialData?.makingCharge ? initialData.makingCharge.toString() : "150");

  // Multi-select Occasions
  const availableOccasions = [
    "Wedding",
    "Housewarming",
    "Baby",
    "Pooja",
    "Festival",
    "Anniversary",
    "Birthday",
    "Gifting",
  ];
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(initialData?.occasions || ["Wedding"]);

  // Style tags
  const availableStyles = ["Traditional", "Temple", "Floral", "Minimal", "Contemporary", "Divine"];
  const [selectedStyles, setSelectedStyles] = useState<string[]>(initialData?.style || ["Traditional"]);

  // Status & Flags
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED" | "ARCHIVED">(initialData?.status || "DRAFT");
  const [inStock, setInStock] = useState<boolean>(initialData?.inStock !== false);
  const [featured, setFeatured] = useState<boolean>(initialData?.featured || false);
  const [isNewArrival, setIsNewArrival] = useState<boolean>(initialData?.isNewArrival || false);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(initialData?.isBestSeller || false);

  // SEO
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || "");

  // Auto-generate slug from name if creating
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit && !slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
    }
  };

  const toggleOccasion = (occ: string) => {
    if (selectedOccasions.includes(occ)) {
      setSelectedOccasions(selectedOccasions.filter((o) => o !== occ));
    } else {
      setSelectedOccasions([...selectedOccasions, occ]);
    }
  };

  const toggleStyle = (st: string) => {
    if (selectedStyles.includes(st)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== st));
    } else {
      setSelectedStyles([...selectedStyles, st]);
    }
  };

  const addSecondaryImage = () => {
    if (newImageInput.trim()) {
      setSecondaryImages([...secondaryImages, newImageInput.trim()]);
      setNewImageInput("");
    }
  };

  const removeSecondaryImage = (idx: number) => {
    setSecondaryImages(secondaryImages.filter((_, i) => i !== idx));
  };

  const calculateDynamicPrice = () => {
    if (pricingMode === "FIXED") {
      return parseFloat(fixedPrice) || 0;
    }
    const weight = parseFloat(weightGrams) || 0;
    const making = parseFloat(makingCharge) || 0;
    const rate = purity === "999" ? 247.04 : 247.04 * 0.925;
    const base = weight * rate + weight * making;
    return Math.round(base * 1.03); // 3% GST
  };

  const handleSubmit = async (targetStatus: "DRAFT" | "PUBLISHED") => {
    setError(null);
    if (!name || !image) {
      setError("Product Name and Primary Image URL are required.");
      return;
    }

    const calculatedPrice = calculateDynamicPrice();
    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const payload = {
      id: initialData?.id,
      name,
      slug: finalSlug,
      category,
      categoryLabel: category === "rings" ? "Silver Rings" : category === "chains" ? "Silver Chains" : category === "anklets" ? "Silver Anklets" : category === "earrings" ? "Silver Earrings" : category === "pooja" ? "Pooja Collection" : "Silver Jewellery",
      collection,
      description,
      story,
      careInstructions,
      image,
      secondaryImages,
      pricingMode,
      price: calculatedPrice,
      formattedPrice: `₹${calculatedPrice.toLocaleString("en-IN")}`,
      netWeight: `${weightGrams}g`,
      weightGrams: parseFloat(weightGrams) || 0,
      purity,
      makingCharge: parseFloat(makingCharge) || 0,
      purityBadge: purity === "999" ? "999 FINE" : "92.5 SILVER",
      badgeType: purity === "999" ? "gold" : "primary",
      occasions: selectedOccasions,
      style: selectedStyles,
      status: targetStatus,
      inStock,
      featured,
      isNewArrival,
      isBestSeller,
      seoTitle: seoTitle || `${name} | Sri Bhagavathi Silvers`,
      seoDescription: seoDescription || description,
    };

    setLoading(true);
    try {
      const url = isEdit ? `/api/admin/products/${initialData.id}` : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setToast(`Product successfully ${targetStatus === "PUBLISHED" ? "published" : "saved as draft"}!`);
      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-serif font-bold text-white">
              {isEdit ? `Edit Product: ${initialData?.name}` : "Add New Jewellery / Silver Ornament"}
            </h1>
            <p className="text-xs text-slate-400">
              Configure product specs, pricing mode, multi-occasion tags, and status.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleSubmit("DRAFT")}
            disabled={loading}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs rounded-xl transition"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit("PUBLISHED")}
            disabled={loading}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition shadow flex items-center space-x-1.5"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Publish Product</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Grid Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Basic Details & Pricing */}
        <div className="lg:col-span-2 space-y-6">
          {/* SECTION 1: BASIC INFORMATION */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Package className="w-4 h-4 text-amber-400" />
              <span>1. Basic Product Information</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Classic Antique Silver Cocktail Ring"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="classic-antique-silver-cocktail-ring"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-slate-400 font-mono focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="rings">Silver Rings</option>
                    <option value="chains">Silver Chains</option>
                    <option value="bracelets">Silver Bracelets</option>
                    <option value="anklets">Silver Anklets (Kolusu)</option>
                    <option value="earrings">Silver Earrings (Jhumkas)</option>
                    <option value="necklaces">Silver Necklaces</option>
                    <option value="pooja">Pooja Collection</option>
                    <option value="articles">Silver Articles & Dining</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Collection Assignment
                  </label>
                  <select
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="Royal Silver Heritage">Royal Silver Heritage</option>
                    <option value="Sanctum & Temple">Sanctum & Temple</option>
                    <option value="Modern Silver">Modern Silver</option>
                    <option value="Divine Keepsakes">Divine Keepsakes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Product Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed description of craftsmanship, design, and finish..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Heritage Story / Story Snippet (Optional)
                </label>
                <textarea
                  rows={2}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Inspiration behind this piece..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: PRICING CONFIGURATION */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>2. Product Pricing Mode</span>
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setPricingMode("FIXED")}
                className={`p-3 rounded-xl border text-left transition ${
                  pricingMode === "FIXED"
                    ? "bg-amber-500/20 border-amber-500 text-amber-300"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <p className="text-xs font-bold">MODE 1: FIXED RETAIL PRICE</p>
                <p className="text-[10px] opacity-70">Fixed retail amount (e.g. ₹4,500)</p>
              </button>

              <button
                type="button"
                onClick={() => setPricingMode("RATE_BASED")}
                className={`p-3 rounded-xl border text-left transition ${
                  pricingMode === "RATE_BASED"
                    ? "bg-amber-500/20 border-amber-500 text-amber-300"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <p className="text-xs font-bold">MODE 2: RATE-BASED FORMULA</p>
                <p className="text-[10px] opacity-70">Weight × Live Rate + Charges</p>
              </button>
            </div>

            {pricingMode === "FIXED" ? (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Fixed Retail Price (₹) *
                </label>
                <input
                  type="number"
                  value={fixedPrice}
                  onChange={(e) => setFixedPrice(e.target.value)}
                  placeholder="4500"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none"
                />
              </div>
            ) : (
              <div className="space-y-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Silver Weight (grams)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={weightGrams}
                      onChange={(e) => setWeightGrams(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Purity Grade
                    </label>
                    <select
                      value={purity}
                      onChange={(e) => setPurity(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-1.5 text-xs"
                    >
                      <option value="999">999 Fine Silver</option>
                      <option value="925">92.5 Sterling Silver</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Making Charge (₹/g)
                    </label>
                    <input
                      type="number"
                      value={makingCharge}
                      onChange={(e) => setMakingCharge(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-xs text-amber-300 flex items-center justify-between">
                  <span>Calculated Dynamic Customer Price:</span>
                  <span className="font-bold text-base font-mono">
                    ₹{calculateDynamicPrice().toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 3: MEDIA MANAGEMENT */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <ImageIcon className="w-4 h-4 text-purple-400" />
              <span>3. Product Images & Gallery</span>
            </h2>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Primary Image URL *
              </label>
              <input
                type="text"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
              />
              {image && (
                <div className="mt-3 flex items-center space-x-3">
                  <img
                    src={image}
                    alt="Primary Preview"
                    className="w-20 h-20 rounded-xl object-cover border border-slate-700"
                  />
                  <span className="text-xs text-emerald-400 font-medium">✓ Primary Image Set</span>
                </div>
              )}
            </div>

            {/* Additional Images */}
            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Additional Gallery Images
              </label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={newImageInput}
                  onChange={(e) => setNewImageInput(e.target.value)}
                  placeholder="Paste secondary image URL..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={addSecondaryImage}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {secondaryImages.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {secondaryImages.map((img, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-800">
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-20 object-cover" />
                      <button
                        type="button"
                        onClick={() => removeSecondaryImage(idx)}
                        className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Occasions, Styles & Status */}
        <div className="space-y-6">
          {/* PUBLICATION STATUS */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Status & Feature Flags</span>
            </h2>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Publication Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
              >
                <option value="DRAFT">DRAFT (Admin Only)</option>
                <option value="PUBLISHED">PUBLISHED (Visible to Public)</option>
                <option value="ARCHIVED">ARCHIVED (Soft Deleted)</option>
              </select>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <label className="flex items-center space-x-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="rounded text-amber-500 bg-slate-950 border-slate-800"
                />
                <span>In Stock & Available</span>
              </label>

              <label className="flex items-center space-x-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded text-amber-500 bg-slate-950 border-slate-800"
                />
                <span>Featured on Homepage</span>
              </label>

              <label className="flex items-center space-x-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={isNewArrival}
                  onChange={(e) => setIsNewArrival(e.target.checked)}
                  className="rounded text-amber-500 bg-slate-950 border-slate-800"
                />
                <span>Tag as New Arrival</span>
              </label>

              <label className="flex items-center space-x-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={isBestSeller}
                  onChange={(e) => setIsBestSeller(e.target.checked)}
                  className="rounded text-amber-500 bg-slate-950 border-slate-800"
                />
                <span>Tag as Best Seller</span>
              </label>
            </div>
          </div>

          {/* OCCASIONS MULTI-SELECT */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Occasions (Multi-Select)</span>
            </h2>

            <div className="flex flex-wrap gap-2">
              {availableOccasions.map((occ) => {
                const active = selectedOccasions.includes(occ);
                return (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => toggleOccasion(occ)}
                    className={`px-3 py-1 rounded-xl text-xs font-medium border transition ${
                      active
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {active ? `✓ ${occ}` : `+ ${occ}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STYLES TAGS */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Style Tags</span>
            </h2>

            <div className="flex flex-wrap gap-2">
              {availableStyles.map((st) => {
                const active = selectedStyles.includes(st);
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => toggleStyle(st)}
                    className={`px-3 py-1 rounded-xl text-xs font-medium border transition ${
                      active
                        ? "bg-amber-500/20 border-amber-500 text-amber-300"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {active ? `✓ ${st}` : `+ ${st}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SEO SETTINGS */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Product SEO Metadata</span>
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={`${name || "Product Title"} | Sri Bhagavathi Silvers`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Meta description for Google search snippet..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
