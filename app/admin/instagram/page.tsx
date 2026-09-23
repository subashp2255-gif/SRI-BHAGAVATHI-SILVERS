"use client";

import { useState } from "react";
import { Instagram, Save, Plus, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminInstagramPage() {
  const [username, setUsername] = useState("@sbs_sribhagavathisilvers");
  const [profileUrl, setProfileUrl] = useState("https://instagram.com/sbs_sribhagavathisilvers");
  const [toast, setToast] = useState<string | null>(null);

  const [posts, setPosts] = useState([
    { id: "1", postUrl: "https://www.instagram.com/p/DF12345", caption: "Heritage Temple Jhumkas collection preview" },
    { id: "2", postUrl: "https://www.instagram.com/p/DF67890", caption: "Consecrated 999 Fine Silver Kamakshi Deepam" },
  ]);

  const [newPostUrl, setNewPostUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");

  const addPost = () => {
    if (newPostUrl.trim()) {
      setPosts([...posts, { id: Date.now().toString(), postUrl: newPostUrl.trim(), caption: newCaption }]);
      setNewPostUrl("");
      setNewCaption("");
    }
  };

  const removePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast("Instagram showcase settings updated!");
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
          <Instagram className="w-6 h-6 text-pink-500" />
          <span>Instagram Showcase Management</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage Instagram handle, profile link, and featured social media post URLs.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Instagram Handle</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Profile URL</label>
            <input
              type="text"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
            />
          </div>
        </div>

        {/* Featured Posts List */}
        <div className="space-y-4 pt-2">
          <h2 className="text-xs font-semibold text-slate-300 border-b border-slate-800 pb-2">
            Featured Public Post URLs & Reels
          </h2>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newPostUrl}
              onChange={(e) => setNewPostUrl(e.target.value)}
              placeholder="Paste Instagram post URL..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
            />
            <input
              type="text"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="Optional caption..."
              className="sm:w-48 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            />
            <button
              type="button"
              onClick={addPost}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium shrink-0"
            >
              + Add
            </button>
          </div>

          <div className="space-y-2">
            {posts.map((p) => (
              <div key={p.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <a href={p.postUrl} target="_blank" rel="noreferrer" className="text-pink-400 hover:underline font-mono">
                    {p.postUrl}
                  </a>
                  {p.caption && <p className="text-slate-400 text-[11px] mt-0.5">{p.caption}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => removePost(p.id)}
                  className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition shadow flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Instagram Configuration</span>
        </button>
      </form>
    </div>
  );
}
