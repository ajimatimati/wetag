import React from 'react';
import './globals.css';
import Link from 'next/link';
import {
  Compass,
  Building,
  ShieldAlert,
  Users,
  Wallet,
  Activity,
  LogOut,
} from 'lucide-react';

export const metadata = {
  title: 'weTag Ops & Command Centre — Ibadan',
  description: 'Operations, Safety, Fraud Prevention & Financial Ledger Console',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 flex h-screen antialiased">
        {/* Sidebar */}
        <aside className="w-64 bg-[#123C3A] text-white flex flex-col justify-between shrink-0">
          <div>
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#18B88A] flex items-center justify-center font-black text-[#123C3A]">
                  W
                </div>
                <div>
                  <h1 className="font-extrabold tracking-tight text-lg leading-none">weTag Ops</h1>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                    Ibadan Command
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1 text-sm font-medium">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-100 hover:bg-white/10 transition-colors"
              >
                <Activity className="w-4 h-4 text-[#18B88A]" />
                Live Operations
              </Link>

              <Link
                href="/safety"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-100 hover:bg-white/10 transition-colors"
              >
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Safety & SOS (615)
              </Link>

              <Link
                href="/properties"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-100 hover:bg-white/10 transition-colors"
              >
                <Building className="w-4 h-4 text-amber-300" />
                Property & Fraud Review
              </Link>

              <Link
                href="/drivers"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-100 hover:bg-white/10 transition-colors"
              >
                <Users className="w-4 h-4 text-emerald-300" />
                Driver KYC & Vehicles
              </Link>

              <Link
                href="/finance"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-100 hover:bg-white/10 transition-colors"
              >
                <Wallet className="w-4 h-4 text-teal-300" />
                Finance & Payouts
              </Link>
            </nav>
          </div>

          {/* User / Logout */}
          <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <div>
              <p className="font-bold text-white">Supervisor Dispatch</p>
              <p className="text-[11px] text-slate-400">Oyo State Grid</p>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </body>
    </html>
  );
}
