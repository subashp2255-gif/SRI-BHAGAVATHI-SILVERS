"use client";

import { useState, useEffect } from "react";
import { History, Shield, Filter } from "lucide-react";

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/audit-log")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs || []);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
          <History className="w-6 h-6 text-amber-400" />
          <span>System Security & Audit Trail</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Immutable audit record of administrator actions, silver rate edits, product publications, and auth events.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300 border-collapse">
          <thead className="bg-slate-950/80 text-[10px] font-bold text-slate-400 tracking-wider uppercase border-b border-slate-800">
            <tr>
              <th className="p-4">TIMESTAMP</th>
              <th className="p-4">ADMIN EMAIL</th>
              <th className="p-4">ACTION</th>
              <th className="p-4">ENTITY</th>
              <th className="p-4">DETAILS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/40 font-mono text-[11px]">
                <td className="p-4 text-slate-400">
                  {new Date(log.timestamp).toLocaleString("en-IN")}
                </td>
                <td className="p-4 font-semibold text-white">{log.adminEmail}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-sans font-bold text-[10px]">
                    {log.action}
                  </span>
                </td>
                <td className="p-4 text-slate-400">{log.entity}</td>
                <td className="p-4 text-slate-300 max-w-sm truncate">{log.details || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
