"use client";

import { useState, useEffect } from "react";
import { MessageSquareText, CheckCircle2, Clock, Mail, Phone, User, Filter, AlertCircle } from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const url = statusFilter !== "ALL" ? `/api/admin/enquiries?status=${statusFilter}` : "/api/admin/enquiries";
      const res = await fetch(url);
      const data = await res.json();
      setEnquiries(data.enquiries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleStatusChange = async (id: string, status: "NEW" | "IN_PROGRESS" | "RESOLVED") => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status });
        }
        fetchEnquiries();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
          <MessageSquareText className="w-6 h-6 text-rose-400" />
          <span>Customer Enquiries Inbox</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage customized design enquiries, product quotes, and contact submissions.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-2 text-xs">
        <Filter className="w-4 h-4 text-slate-400 mr-2" />
        {["ALL", "NEW", "IN_PROGRESS", "RESOLVED"].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition ${
              statusFilter === st
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enquiries List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/80">
          {enquiries.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">No enquiries found in this category.</div>
          ) : (
            enquiries.map((enq) => (
              <div
                key={enq.id}
                onClick={() => setSelectedEnquiry(enq)}
                className={`p-4 hover:bg-slate-800/50 cursor-pointer transition flex items-start justify-between space-x-4 ${
                  selectedEnquiry?.id === enq.id ? "bg-slate-800/80 border-l-4 border-amber-400" : ""
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white text-xs">{enq.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">• {enq.phone}</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{enq.message}</p>
                  <p className="text-[10px] text-slate-500">
                    {new Date(enq.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <span
                  className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border shrink-0 ${
                    enq.status === "NEW"
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      : enq.status === "IN_PROGRESS"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  }`}
                >
                  {enq.status}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Selected Detail View */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          {selectedEnquiry ? (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <h3 className="font-semibold text-white text-sm">Enquiry Details</h3>
                <span className="text-[10px] text-slate-400 font-mono">ID: {selectedEnquiry.id}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-slate-300">
                  <User className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">{selectedEnquiry.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{selectedEnquiry.phone}</span>
                </div>
                {selectedEnquiry.email && (
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{selectedEnquiry.email}</span>
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Customer Message</p>
                <p className="whitespace-pre-wrap">{selectedEnquiry.message}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Update Enquiry Status
                </label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="NEW">NEW (Unread / Action Needed)</option>
                  <option value="IN_PROGRESS">IN_PROGRESS (Staff Contacted Customer)</option>
                  <option value="RESOLVED">RESOLVED (Fulfilled / Completed)</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs italic">
              Select an enquiry from the list to view full customer details and message.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
