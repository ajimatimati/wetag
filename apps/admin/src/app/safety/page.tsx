import React from 'react';
import { ShieldAlert, PhoneCall, AlertTriangle, CheckCircle, Navigation, MapPin } from 'lucide-react';

export default function SafetyConsolePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#123C3A]">Safety Command & Emergency Console</h1>
          <p className="text-sm text-slate-500">
            Oyo State 615 Citizens' Emergency Integration · Live Route Anomaly Engine
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm shadow-sm transition-colors">
            <PhoneCall className="w-4 h-4" />
            Dispatch Direct Oyo 615
          </button>
        </div>
      </div>

      {/* Active Incidents & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <ShieldAlert className="w-5 h-5" />
            Active SOS Triggers
          </div>
          <p className="text-3xl font-black text-rose-900 mt-2">0</p>
          <p className="text-xs text-rose-600 mt-1">All active journeys safe and verified</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            Route Deviations (&gt;2km)
          </div>
          <p className="text-3xl font-black text-amber-900 mt-2">1</p>
          <p className="text-xs text-amber-700 mt-1">Akobo bypass due to Iwo Road traffic</p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle className="w-5 h-5" />
            Active Viewing Check-Ins
          </div>
          <p className="text-3xl font-black text-emerald-900 mt-2">8</p>
          <p className="text-xs text-emerald-700 mt-1">All seekers safely monitored on premises</p>
        </div>
      </div>

      {/* Safety Incident Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-bold text-[#123C3A] text-lg">Real-Time Telemetry & Safety Events</h2>
          <p className="text-xs text-slate-400">Automated checks triggered within the last 2 hours</p>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 text-xs uppercase">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Domain</th>
              <th className="p-4">Event Type</th>
              <th className="p-4">Participants</th>
              <th className="p-4">Location / Route</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            <tr className="hover:bg-slate-50/50">
              <td className="p-4 text-xs text-slate-500">07:42 AM</td>
              <td className="p-4">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                  MOVE
                </span>
              </td>
              <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-amber-500" />
                Route Anomaly (+3 min detour)
              </td>
              <td className="p-4">Driver: Dr. Kunle · Rider: Tolu O.</td>
              <td className="p-4 text-xs">General Gas  Total Filling Station</td>
              <td className="p-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Rider Confirmed OK
                </span>
              </td>
            </tr>

            <tr className="hover:bg-slate-50/50">
              <td className="p-4 text-xs text-slate-500">07:30 AM</td>
              <td className="p-4">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">
                  STAY
                </span>
              </td>
              <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                Physical Viewing Check-In
              </td>
              <td className="p-4">Seeker: Mary A. · Agent: Femi B.</td>
              <td className="p-4 text-xs">Old Bodija Estate, Plot 14</td>
              <td className="p-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                  In Progress (35 min)
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
