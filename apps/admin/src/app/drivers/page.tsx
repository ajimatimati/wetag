import React from 'react';
import { Users, ShieldCheck, Car, FileCheck2, CheckCircle, XCircle } from 'lucide-react';

export default function DriverKYCPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#123C3A]">Driver KYC & Vehicle Compliance Queue</h1>
          <p className="text-sm text-slate-500">
            NIN Verification (Smile ID) · Driver's License · Vehicle Roadworthiness · Inspection Expiries
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-900">
            52 Approved Commuters
          </span>
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 text-amber-900">
            4 Applications In Review
          </span>
        </div>
      </div>

      {/* Driver Queue */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-bold text-[#123C3A] text-lg">Pending Verification Queue</h2>
          <p className="text-xs text-slate-400">Applications submitted for commute route sharing</p>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 text-xs uppercase">
            <tr>
              <th className="p-4">Applicant</th>
              <th className="p-4">Route Corridor</th>
              <th className="p-4">Vehicle Details</th>
              <th className="p-4">NIN / Liveness</th>
              <th className="p-4">License Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            <tr className="hover:bg-slate-50/50">
              <td className="p-4">
                <p className="font-bold text-[#123C3A]">Engr. Babatunde Lawal</p>
                <p className="text-xs text-slate-400">+234 803 ••• ••12 · UI Lecturer</p>
              </td>
              <td className="p-4 text-xs font-semibold">
                Akobo ➔ Secretariat (Mon–Fri 7:15 AM)
              </td>
              <td className="p-4 text-xs">
                <span className="font-bold">Toyota Corolla (2014)</span> · Silver<br />
                <span className="text-slate-500">Plate: OYO-412-BDJ · AC: Yes</span>
              </td>
              <td className="p-4">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit">
                  <ShieldCheck className="w-3.5 h-3.5" /> Passed
                </span>
              </td>
              <td className="p-4">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit">
                  <FileCheck2 className="w-3.5 h-3.5" /> Valid (2028)
                </span>
              </td>
              <td className="p-4 text-right space-x-2">
                <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs">
                  Approve Driver
                </button>
                <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs">
                  View Docs
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
