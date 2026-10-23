'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Clock, ShieldCheck, DollarSign, Filter } from 'lucide-react';
import { RoleSystemKit } from '@/types';

interface RoleSearchProps {
  roles: RoleSystemKit[];
}

export default function RoleSearch({ roles }: RoleSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(roles.map((r) => r.category)));
    return ['All', ...cats];
  }, [roles]);

  const filteredRoles = useMemo(() => {
    return roles.filter((r) => {
      const matchesSearch =
        r.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.badge.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [roles, searchTerm, selectedCategory]);

  return (
    <div id="roles" className="space-y-8">
      {/* Search Bar & Category Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by role, industry, or compliance standard (e.g. M&A, SOC 2, HIPAA)..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-inner"
          />
        </div>

        {/* Count Indicator */}
        <div className="text-xs font-medium text-slate-400 shrink-0">
          Showing <span className="font-bold text-emerald-400">{filteredRoles.length}</span> of {roles.length} Accredited AI Systems
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRoles.map((role) => (
          <Link
            key={role.slug}
            href={`/${role.slug}`}
            className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition duration-200 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-emerald-500/5"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 text-[11px] mb-3">
                <span className="rounded bg-slate-800 px-2.5 py-0.5 font-medium text-slate-400 border border-slate-700/50">
                  {role.category}
                </span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-400 border border-emerald-500/20 flex items-center gap-1 line-clamp-1">
                  <ShieldCheck className="h-3 w-3 shrink-0" />
                  <span className="truncate">{role.badge.split('&')[0]}</span>
                </span>
              </div>

              {/* Role Title */}
              <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition line-clamp-1">
                {role.role}
              </h4>
              <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                {role.overview}
              </p>

              {/* Metrics */}
              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-800/80 pt-4 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span>Saves ~{role.hoursSavedWeekly} hrs/wk</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>+${role.monthlyValueCreated.toLocaleString()}/mo</span>
                </div>
              </div>
            </div>

            {/* Bottom Link Action */}
            <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              <span>View System Playbook</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      {filteredRoles.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl p-8 space-y-3">
          <Filter className="h-8 w-8 text-slate-600 mx-auto" />
          <h4 className="text-base font-semibold text-white">No matching role systems found</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms or filter selection. We offer 50+ specialized role systems across all major professional sectors.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="text-xs font-semibold text-emerald-400 underline hover:text-emerald-300"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
