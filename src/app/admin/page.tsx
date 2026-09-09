'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Car, 
  Users, 
  CreditCard, 
  DollarSign, 
  Lock, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { INITIAL_VEHICLES } from '@/data/initialStock';
import { StockService } from '@/lib/stockService';

export default function AdminDashboardPage() {
  const allVehicles = StockService.getVehicles().vehicles;
  const leads = StockService.getLeads();
  const reservations = StockService.getReservations();

  // Métricas
  const totalStockCount = allVehicles.length;
  const availableCount = allVehicles.filter(v => v.status === 'DISPONIBLE').length;
  const reservedCount = allVehicles.filter(v => v.status === 'RESERVADO').length;
  const totalInventoryValueUsd = allVehicles.reduce((acc, v) => acc + v.priceUsd, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 space-y-8">
      
      {/* Header del Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Portal Comercial Privado</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mt-1">
            Dashboard CARVLAK
          </h1>
          <p className="text-xs text-slate-400">
            Control de inventario, prospectos comerciales (leads) y señas de reserva activas.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/stock"
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-600/25 flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Gestionar Stock</span>
          </Link>
          <Link
            href="/admin/leads"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center space-x-1.5"
          >
            <Users className="w-4 h-4" />
            <span>Bandeja Leads ({leads.length})</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            title="Abrir sitio público"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Vehículos en Stock</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <Car className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-white">{totalStockCount}</p>
            <p className="text-xs text-slate-400 mt-1">
              <span className="text-emerald-400 font-bold">{availableCount} disponibles</span> • {reservedCount} señados
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Valor Total de Inventario</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-white">USD {(totalInventoryValueUsd / 1000).toFixed(0)}k</p>
            <p className="text-xs text-slate-400 mt-1">Capital activo en showroom</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Leads & Tasaciones</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-white">{leads.length}</p>
            <p className="text-xs text-emerald-400 font-bold mt-1">Nuevas consultas registradas</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Señas de Reserva</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-white">{reservations.length}</p>
            <p className="text-xs text-slate-400 mt-1">Garantías de 72 hs activas</p>
          </div>
        </div>

      </div>

      {/* Grid de Contenido: Últimos Leads & Stock Crítico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Bandeja Reciente de Leads */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base">Últimas Consultas y Tasaciones</h3>
            <Link href="/admin/leads" className="text-xs font-bold text-sky-400 hover:underline">
              Ver Todos
            </Link>
          </div>

          <div className="space-y-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white">{lead.name}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {lead.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{lead.message}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{lead.phone} • {lead.email}</p>
                </div>
                <a
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shrink-0"
                >
                  WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen de Stock y Oportunidades */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base">Unidades Destacadas en Showroom</h3>
            <Link href="/admin/stock" className="text-xs font-bold text-sky-400 hover:underline">
              Editar Stock
            </Link>
          </div>

          <div className="space-y-3">
            {allVehicles.slice(0, 5).map((v) => (
              <div
                key={v.id}
                className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center space-x-3"
              >
                <img
                  src={v.images[0]}
                  alt={v.model}
                  className="w-14 h-12 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{v.brand} {v.model}</p>
                  <p className="text-[11px] text-slate-400">{v.year} • {v.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-white">USD {v.priceUsd.toLocaleString()}</p>
                  <span className={`text-[10px] font-bold uppercase ${
                    v.status === 'DISPONIBLE' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {v.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
