import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export default function FinanceDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#123C3A]">Finance & Double-Entry Ledger</h1>
          <p className="text-sm text-slate-500">
            Immutable Audit Trail · Paystack Payout Queue · Platform Fee & Safety Fund Custody
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#123C3A] hover:bg-[#123C3A]/90 text-white font-bold rounded-xl text-sm transition-colors">
            Reconcile Paystack Balance
          </button>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Gross Platform Volume (24h)</span>
          <p className="text-3xl font-extrabold text-[#123C3A] mt-2">₦1,420,000</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">MOVE + STAY transactions</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Platform Fees Collected</span>
          <p className="text-3xl font-extrabold text-[#18B88A] mt-2">₦142,000</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">10% standard take rate</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Oyo Safety Fund Reserve</span>
          <p className="text-3xl font-extrabold text-teal-700 mt-2">₦45,000</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">₦50 per completed ride</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">Pending Driver Payouts</span>
          <p className="text-3xl font-extrabold text-amber-700 mt-2">₦68,400</p>
          <p className="text-xs text-amber-600 font-semibold mt-1">6 withdrawals awaiting approval</p>
        </div>
      </div>

      {/* Payout Approval Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-[#123C3A] text-lg">Bank Withdrawal Requests (Paystack NUBAN)</h2>
            <p className="text-xs text-slate-400">Driver commute cost offsets ready for disbursement</p>
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 text-xs uppercase">
            <tr>
              <th className="p-4">Recipient Name</th>
              <th className="p-4">Bank & Account</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Source</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            <tr className="hover:bg-slate-50/50">
              <td className="p-4 font-bold text-slate-900">Dr. Kunle Alabi</td>
              <td className="p-4 text-xs">
                Access Bank · <code>0123456789</code><br />
                <span className="text-emerald-700 font-semibold">Name Match Verified</span>
              </td>
              <td className="p-4 font-black text-[#123C3A]">₦12,400</td>
              <td className="p-4 text-xs text-slate-500">4 Shared Journeys (Akobo  Dugbe)</td>
              <td className="p-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1 w-fit">
                  <Clock className="w-3.5 h-3.5" /> Ready for Transfer
                </span>
              </td>
              <td className="p-4 text-right">
                <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs">
                  Execute Payout
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
