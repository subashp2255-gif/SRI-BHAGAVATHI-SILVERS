"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Save, CheckCircle2, Globe } from "lucide-react";

export default function AdminStorePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [directionsUrl, setDirectionsUrl] = useState("");
  const [heroImage, setHeroImage] = useState("");

  const fetchStore = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/store");
      const data = await res.json();
      if (data.store) {
        setName(data.store.name);
        setAddress(data.store.address);
        setPhone(data.store.phone);
        setWhatsapp(data.store.whatsapp);
        setEmail(data.store.email);
        setOpeningHours(data.store.openingHours);
        setGoogleMapsUrl(data.store.googleMapsUrl);
        setDirectionsUrl(data.store.directionsUrl);
        setHeroImage(data.store.heroImage || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/store", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          address,
          phone,
          whatsapp,
          email,
          openingHours,
          googleMapsUrl,
          directionsUrl,
          heroImage,
        }),
      });

      if (res.ok) {
        showToast("Showroom contact & location info updated!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      <div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
          <MapPin className="w-6 h-6 text-amber-400" />
          <span>Store & Showroom Management</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Central management of showroom address, phone numbers, WhatsApp, opening hours, and Google Maps location.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">
          Showroom Public Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Business Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp Number</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Showroom Full Address</label>
          <textarea
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Opening Hours & Schedule</label>
          <input
            type="text"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Google Maps Embed / Search URL</label>
            <input
              type="text"
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Directions Link URL</label>
            <input
              type="text"
              value={directionsUrl}
              onChange={(e) => setDirectionsUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Showroom Hero Image URL</label>
          <input
            type="text"
            value={heroImage}
            onChange={(e) => setHeroImage(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition shadow flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Store Configuration</span>
        </button>
      </form>
    </div>
  );
}
