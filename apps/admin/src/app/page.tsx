import React from 'react';
import { Compass, Building, ShieldCheck, Activity, Users, ArrowUpRight } from 'lucide-react';

export default function OperationsDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#123C3A]">Live Operations Overview</h1>
          <p className="text-sm text-slate-500">Ibadan Metropolitan Network · Real-time corridor telemetry</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Grid Active: Oyo 615 Live
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase">Active MOVE Journeys</span>
            <div className="p-2 bg-emerald-50 text-[#18B88A] rounded-lg">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#123C3A] mt-2">42</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">↑ 88% seat utilization</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase">Verified STAY Listings</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
              <Building className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#123C3A] mt-2">128</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">100% Real Move-In audited</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase">PIN Verifications Today</span>
            <div className="p-2 bg-teal-50 text-teal-700 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#123C3A] mt-2">314</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">0 impersonation incidents</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase">Active Households</span>
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#123C3A] mt-2">64</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">₦2.8M co-living ledger split</p>
        </div>
      </div>

      {/* Corridor Telemetry Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-[#123C3A] text-lg">Top Ibadan Corridors (Live)</h2>
            <p className="text-xs text-slate-400">Peak commute tracking across key hubs</p>
          </div>
          <button className="text-xs font-bold text-[#18B88A] hover:underline flex items-center gap-1">
            Export Telemetry <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 text-xs uppercase">
            <tr>
              <th className="p-4">Corridor Name</th>
              <th className="p-4">Active Drivers</th>
              <th className="p-4">Seats Open</th>
              <th className="p-4">Avg Per-Seat Price</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            <tr className="hover:bg-slate-50/50">
              <td className="p-4 font-bold text-[#123C3A]">Akobo (General Gas)  Dugbe / Cocoa House</td>
              <td className="p-4">16 drivers</td>
              <td className="p-4">28 seats</td>
              <td className="p-4 font-bold">₦400</td>
              <td className="p-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  High Demand
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/50">
              <td className="p-4 font-bold text-[#123C3A]">UI Main Gate  Oyo Secretariat (Agodi)</td>
              <td className="p-4">12 drivers</td>
              <td className="p-4">19 seats</td>
              <td className="p-4 font-bold">₦300</td>
              <td className="p-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Optimal Match
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/50">
              <td className="p-4 font-bold text-[#123C3A]">Bodija Market Hub  Ring Road / High Court</td>
              <td className="p-4">9 drivers</td>
              <td className="p-4">11 seats</td>
              <td className="p-4 font-bold">₦500</td>
              <td className="p-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                  Normal
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50/50">
              <td className="p-4 font-bold text-[#123C3A]">Challenge  Dugbe / Iwo Road</td>
              <td className="p-4">5 drivers</td>
              <td className="p-4">7 seats</td>
              <td className="p-4 font-bold">₦350</td>
              <td className="p-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                  Normal
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
