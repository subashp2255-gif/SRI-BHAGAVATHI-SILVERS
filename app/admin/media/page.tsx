"use client";

import { useState } from "react";
import { Image as ImageIcon, Upload, Copy, CheckCircle2, Trash2 } from "lucide-react";

export default function AdminMediaPage() {
  const [toast, setToast] = useState<string | null>(null);
  const [mediaList, setMediaList] = useState([
    { id: "1", name: "Silver Cocktail Ring Macro", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW7_d9BeF9-rkPp7KgexqRyKdBpMQCDz3AWVUEkvMyjrGpcGTq29MtqyB1K1yUmFgZUphYCEqqa-LO_WQ-Jz1gMWCbcT1dCVGWHigjiseuyPScOr8dRn1_UVnP-0Qk1hehK7Z8Wid4sTnzCCA8mpZtS1t3wNWr5KLuqVZChLB4GzN5HPDszV4-1POIwGptQHw2xyO5EVcKy2XcSZfu97kwjHRZc_D1o93WzDNbzDcfWR73CNVK5G4U" },
    { id: "2", name: "Temple Jhumkas Drops", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgJ68rs5lWru0g6Ae2-YX9vCd6ySFpZYP0PRWUA4CobH6d0hPpUlCDf6URLGUluaGXTN1-AmOlxEHuuY4vbsFt0T6F7APW21vm_Fc3pWUJjGU0-FLbNqD_Xmng_rhlx-S4_E2dyqgCK7EtZDAaYxchQw43mYOjgQsmUZG6I5kuYVmqpRp4-Hl_hAUU_xnks5_ffIHHLZuiXBuMctHPuvP-QQZWWbByQ8r5BcDqulYS3StODtz2HhlP" },
    { id: "3", name: "Kamakshi Deepam Pooja Lamp", url: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85" },
    { id: "4", name: "Bridal Silver Choker Set", url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85" },
  ]);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setToast("Image URL copied to clipboard!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
            <ImageIcon className="w-6 h-6 text-purple-400" />
            <span>Media Assets Library</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload, preview, search, and copy reference links for jewellery images.
          </p>
        </div>

        <label className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl cursor-pointer transition">
          <Upload className="w-4 h-4" />
          <span>Upload New Image</span>
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaList.map((m) => (
          <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group">
            <div className="h-44 relative bg-slate-950">
              <img src={m.url} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <button
                onClick={() => copyUrl(m.url)}
                className="absolute bottom-2 right-2 p-2 bg-slate-900/80 backdrop-blur text-amber-400 rounded-xl hover:bg-slate-900 transition flex items-center space-x-1 text-[11px] font-medium"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy URL</span>
              </button>
            </div>
            <div className="p-3">
              <p className="font-semibold text-slate-200 text-xs truncate">{m.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
