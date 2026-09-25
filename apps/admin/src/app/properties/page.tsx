import React from 'react';
import { Building, ShieldCheck, AlertOctagon, CheckCircle2, XCircle, Droplets, Zap } from 'lucide-react';

export default function PropertyReviewPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#123C3A]">Property & Fraud Prevention Review</h1>
          <p className="text-sm text-slate-500">
            Perceptual Image Hashing · Real Move-In Breakdown Auditing · Lister Verification
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 text-amber-900">
            3 Pending Verification
          </span>
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-100 text-rose-900">
            1 Duplicate Photo Flag
          </span>
        </div>
      </div>

      {/* Review Queue Cards */}
      <div className="space-y-4">
        {/* Listing 1: With Fraud Flag */}
        <div className="bg-white rounded-2xl border-2 border-rose-200 p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  Duplicate Image Hash Match (94% match)
                </span>
                <span className="text-xs text-slate-400">ID: prop-8291 · Agbowo / UI</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                2-Bedroom Flat behind UI Conference Centre
              </h2>
              <p className="text-xs text-slate-500">
                Lister: QuickRent Oyo Ltd (Unverified Agent) · Phone: +234 814 ••• ••90
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 uppercase font-bold">Claimed Move-In Total</span>
              <p className="text-xl font-black text-[#123C3A]">₦650,000</p>
              <p className="text-xs text-slate-500">Rent ₦450k + Agency ₦100k + Legal ₦50k + Caution ₦50k</p>
            </div>
          </div>

          <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3 my-4 text-xs text-rose-800 flex items-center justify-between">
            <p>
              <strong>Fraud Alert:</strong> Exterior and parlor images match an existing verified listing
              (<code>prop-1049</code>) registered by Bodija Estates Trust. Possible duplicate agent repost.
            </p>
            <button className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs">
              View Image Diff
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors">
              Request Agent Video Walkthrough
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors">
              <XCircle className="w-4 h-4" />
              Reject & Suspend Lister
            </button>
          </div>
        </div>

        {/* Listing 2: Standard Inspection Pending Approval */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  Physical Inspection Passed
                </span>
                <span className="text-xs text-slate-400">ID: prop-9412 · Samonda, Ibadan</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Self-Contain Apartment with Inverter & Solar Backup
              </h2>
              <p className="text-xs text-slate-500">
                Lister: Alhaji Jimoh Realty (Verified Landlord) · Phone: +234 802 ••• ••33
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 uppercase font-bold">Real Move-In Total</span>
              <p className="text-xl font-black text-[#123C3A]">₦480,000</p>
              <p className="text-xs text-slate-500">Rent ₦350k + Legal ₦35k + Caution ₦45k + Service ₦50k</p>
            </div>
          </div>

          {/* Amenities verified by inspector */}
          <div className="flex gap-4 my-4 p-3 bg-slate-50 rounded-xl text-xs">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Droplets className="w-3.5 h-3.5 text-blue-600" /> Borehole Functional
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Zap className="w-3.5 h-3.5 text-amber-600" /> Dedicated IBEDC Prepaid Meter
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Gated Estate Security
            </span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors">
              <CheckCircle2 className="w-4 h-4" />
              Approve & Publish Verified Badge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
