'use client';

import React from 'react';
import TradeInWizard from '@/components/TradeInWizard';
import { Sparkles, ShieldCheck, Repeat, ArrowRight } from 'lucide-react';

export default function TradeInPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20 flex items-center justify-center w-fit mx-auto">
          <Sparkles className="w-3.5 h-3.5 mr-1.5" />
          Tasador Inteligente de Usados
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Entregá tu Auto como Parte de Pago
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Obtené un rango de tasación referencial en el acto según las curvas de mercado de Uruguay y utilizalo como entrega inicial de tu próximo vehículo en CARVLAK.
        </p>
      </div>

      {/* Asistente Interactivo de Tasación */}
      <TradeInWizard />

      {/* Beneficios de entregar tu usado en Carvlak */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="font-bold text-white text-sm">Sin Líos de Venta Particular</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Evitá recibir desconocidos en tu casa, llamadas molestas o riesgos de cobro. Hacé todo en un solo día con nosotros.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="font-bold text-white text-sm">Mejor Cotización del Mercado</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Valoramos si tu auto tiene historial de service oficial, pocos kilómetros y cuidado mecánico demostrable.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="font-bold text-white text-sm">Llave por Llave</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Entregás tu auto el mismo día en que te llevás el nuevo, sin quedarte ni un solo minuto a pie.
          </p>
        </div>
      </div>

    </div>
  );
}
