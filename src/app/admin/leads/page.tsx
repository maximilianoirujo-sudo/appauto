'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Phone, 
  Mail, 
  Car, 
  Calendar, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Repeat,
  DollarSign
} from 'lucide-react';
import { StockService } from '@/lib/stockService';
import { Lead } from '@/types';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(StockService.getLeads());

  const handleStatusChange = (id: string, status: Lead['status']) => {
    StockService.updateLeadStatus(id, status);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <Link href="/admin" className="text-xs text-slate-400 hover:text-white flex items-center mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Volver al Dashboard</span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">Bandeja de Leads & CRM Comercial</h1>
          <p className="text-xs text-slate-400">Consultas, solicitudes de Test Drive y Tasaciones de Usados entrantes.</p>
        </div>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-sky-500/40 transition-colors"
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                  lead.type === 'TRADE_IN'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : lead.type === 'TEST_DRIVE'
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                }`}>
                  {lead.type}
                </span>
                <h3 className="font-bold text-white text-base">{lead.name}</h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400 font-medium">Estado Comercial:</span>
                <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                  className="bg-slate-950 text-white text-xs font-bold rounded-xl px-3 py-1.5 border border-slate-800 focus:border-sky-500"
                >
                  <option value="NUEVO">NUEVO</option>
                  <option value="CONTACTADO">CONTACTADO</option>
                  <option value="EN_NEGOCIACION">EN NEGOCIACIÓN</option>
                  <option value="CERRADO">CERRADO / VENDIDO</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block font-medium">WhatsApp / Teléfono:</span>
                <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="font-bold text-emerald-400 hover:underline">
                  {lead.phone}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Correo Electrónico:</span>
                <span className="font-semibold text-white">{lead.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Fecha de Ingreso:</span>
                <span className="text-slate-400">{new Date(lead.createdAt).toLocaleString()}</span>
              </div>
            </div>

            {lead.message && (
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-300">
                <p className="font-bold text-sky-400 mb-1">Mensaje del Cliente:</p>
                <p>{lead.message}</p>
              </div>
            )}

            {/* Datos adicionales de Trade-In si aplica */}
            {lead.tradeInData && (
              <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-2xl space-y-2 text-xs">
                <p className="font-bold text-emerald-400 flex items-center">
                  <Repeat className="w-4 h-4 mr-1.5" />
                  Vehículo a Entregar: {lead.tradeInData.brand} {lead.tradeInData.model} ({lead.tradeInData.year})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
                  <div>Km: <strong>{lead.tradeInData.mileage.toLocaleString()}</strong></div>
                  <div>Rango Mín: <strong>USD {lead.tradeInData.estimatedValueMin.toLocaleString()}</strong></div>
                  <div>Rango Máx: <strong>USD {lead.tradeInData.estimatedValueMax.toLocaleString()}</strong></div>
                  <div>Mercado Ref: <strong>USD {lead.tradeInData.marketReferencePrice.toLocaleString()}</strong></div>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <a
                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(lead.name)},%20te%20contacto%20de%20CARVLAK%20por%20tu%20consulta`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-600/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contactar por WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
