"use client";

import { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, Loader2, X, RefreshCw, CheckCircle2 } from "lucide-react";

interface ImageUploadDropzoneProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  required?: boolean;
  helpText?: string;
}

export default function ImageUploadDropzone({
  label = "Primary Image",
  value,
  onChange,
  required = false,
  helpText = "PNG, JPG, WEBP or AVIF up to 10MB",
}: ImageUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP, etc.)");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload image");

      onChange(data.url);
    } catch (err: any) {
      setError(err.message || "Failed to upload image from local system");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-medium text-slate-300">
          {label} {required && <span className="text-amber-400">*</span>}
        </label>
      )}

      {error && (
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} className="text-rose-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="relative group bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 transition hover:border-slate-700">
          <div className="relative w-28 h-28 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-amber-500/30 bg-slate-900 shrink-0 shadow-md">
            <img
              src={value}
              alt="Uploaded Preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-1.5 text-center sm:text-left truncate">
            <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Image Uploaded Successfully</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-sm font-mono">
              {value}
            </p>
            <p className="text-[10px] text-slate-500">
              Directly loaded from local system & hosted on server.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition flex items-center space-x-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${uploading ? "animate-spin" : ""}`} />
              <span>Change</span>
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2.5 ${
            isDragging
              ? "border-amber-400 bg-amber-500/10"
              : "border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950/90"
          }`}
        >
          {uploading ? (
            <div className="py-4 flex flex-col items-center space-y-2 text-amber-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xs font-medium">Uploading image from computer...</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">
                  Click to browse from local computer, or drag & drop
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{helpText}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
