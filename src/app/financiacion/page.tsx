'use client';

import React from 'react';
import FinancingCalculator from '@/components/FinancingCalculator';
import { ShieldCheck, CheckCircle2, Building2, HelpCircle, Phone } from 'lucide-react';
import { FINANCING_PLANS } from '@/data/initialStock';

export default function FinancingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-500/10 px-3.5 py-1 rounded-full border border-sky-500/20">
          Financiación Bancaria & Propia
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Calculá tu Cuota en Minutos
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Convenios directos con Santander, BBVA, Scotiabank e Itaú en Unidades Indexadas o Dólares, más Crédito de la Casa con aprobación en 24 hs.
        </p>
      </div>

      {/* Calculadora Interactiva */}
      <FinancingCalculator initialPrice={26000} />

      {/* Bancos y Requisitos */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Requisitos y Entidades Adheridas en Uruguay
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FINANCING_PLANS.map((plan) => (
            <div key={plan.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-white text-base">{plan.bankName}</h3>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {plan.annualInterestRate}% TEA
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{plan.description}</p>
              
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase block">Requisitos:</span>
                <ul className="space-y-1 text-[11px] text-slate-400">
                  {plan.requirements?.map((req, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA de Asesoría */}
      <div className="bg-gradient-to-r from-sky-950/60 via-slate-900 to-sky-950/60 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">¿Tenés dudas sobre cómo calificar para el crédito?</h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Nuestros oficiales comerciales analizan tu caso sin costo ante todos los bancos simultáneamente para conseguirte la menor tasa.
        </p>
        <a
          href="https://wa.me/59899123456?text=Hola%20Carvlak,%20quisiera%20asesoramiento%20personalizado%20sobre%20financiaci%C3%B3n"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-emerald-600/30"
        >
          <Phone className="w-4 h-4" />
          <span>Hablar con un Oficial Financiero</span>
        </a>
      </div>

    </div>
  );
}
