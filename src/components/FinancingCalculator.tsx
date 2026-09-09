'use client';

import React, { useState } from 'react';
import { FINANCING_PLANS } from '../data/initialStock';
import { Calculator, CheckCircle2, ShieldAlert, ArrowRight, Building2 } from 'lucide-react';

interface FinancingCalculatorProps {
  initialPrice?: number;
  vehicleTitle?: string;
}

export default function FinancingCalculator({
  initialPrice = 25000,
  vehicleTitle
}: FinancingCalculatorProps) {
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [termMonths, setTermMonths] = useState(48);
  const [selectedPlanId, setSelectedPlanId] = useState(FINANCING_PLANS[0].id);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', income: '' });
  const [submitted, setSubmitted] = useState(false);

  const selectedPlan = FINANCING_PLANS.find(p => p.id === selectedPlanId) || FINANCING_PLANS[0];

  const downPaymentAmount = Math.round((price * downPaymentPercent) / 100);
  const loanAmount = Math.max(0, price - downPaymentAmount);

  // Cuota mensual con amortización francesa
  const monthlyRate = (selectedPlan.annualInterestRate / 100) / 12;
  const monthlyInstallment = loanAmount > 0 
    ? Math.round((loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths)))
    : 0;

  const handlePreApprovalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'FINANCIACION',
          name: leadForm.name,
          phone: leadForm.phone,
          email: leadForm.email,
          message: `Solicitud de pre-aprobación de crédito: ${vehicleTitle || 'Monto USD ' + price}. Entrega inicial: USD ${downPaymentAmount} (${downPaymentPercent}%). Plazo: ${termMonths} cuotas con ${selectedPlan.bankName}. Ingreso aproximado: ${leadForm.income}.`
        })
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Simulador de Financiación Bancaria</h3>
          <p className="text-xs text-slate-400">
            {vehicleTitle ? `Simulación personalizada para ${vehicleTitle}` : 'Calculá tu cuota mensual en base a planes bancarios reales de Uruguay'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controles de Entrada */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Precio del Vehículo */}
          {!vehicleTitle && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase">Valor del Vehículo (USD)</label>
                <span className="text-sm font-bold text-white">USD {price.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={8000}
                max={90000}
                step={500}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
          )}

          {/* Entrega Inicial (Down Payment) */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase">
                Entrega Inicial ({downPaymentPercent}%)
              </label>
              <div className="text-right">
                <span className="text-sm font-bold text-sky-400">USD {downPaymentAmount.toLocaleString()}</span>
                <span className="text-[11px] text-slate-400 block">(Efectivo o tu vehículo usado)</span>
              </div>
            </div>
            <input
              type="range"
              min={20}
              max={70}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Mínimo 20%</span>
              <span>35% Sugerido</span>
              <span>Máximo 70%</span>
            </div>
          </div>

          {/* Plazo en Meses */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase block mb-2">
              Plazo de Financiación: {termMonths} Meses
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[12, 24, 36, 48, 60].map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => setTermMonths(months)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    termMonths === months
                      ? 'bg-sky-600 border-sky-500 text-white shadow-md shadow-sky-600/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {months}m
                </button>
              ))}
            </div>
          </div>

          {/* Selector de Banco / Plan */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase block mb-2">
              Entidad Financiera en Convenio
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FINANCING_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedPlanId === plan.id
                      ? 'bg-sky-950/40 border-sky-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-white">{plan.bankName}</span>
                    <span className="text-[11px] font-bold text-emerald-400">{plan.annualInterestRate}% TEA</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{plan.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Resumen & Resultado de Cuota */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950 border border-slate-800/80 rounded-2xl p-6">
          
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800 pb-2">
              Resumen de la Simulación
            </h4>

            <div className="flex justify-between text-xs text-slate-300">
              <span>Valor Vehículo:</span>
              <span className="font-bold text-white">USD {price.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-xs text-slate-300">
              <span>Entrega Inicial ({downPaymentPercent}%):</span>
              <span className="font-bold text-sky-400">USD {downPaymentAmount.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-xs text-slate-300">
              <span>Saldo a Financiar:</span>
              <span className="font-bold text-white">USD {loanAmount.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-xs text-slate-300">
              <span>Plan Seleccionado:</span>
              <span className="font-semibold text-white">{selectedPlan.bankName}</span>
            </div>

            <div className="flex justify-between text-xs text-slate-300">
              <span>Tasa Preferencial TEA:</span>
              <span className="font-semibold text-emerald-400">{selectedPlan.annualInterestRate}% anual</span>
            </div>

            {/* Caja de Cuota Mensual Destacada */}
            <div className="bg-gradient-to-br from-sky-950/80 to-slate-900 border border-sky-500/30 p-4 rounded-xl text-center my-4">
              <p className="text-[11px] uppercase font-bold text-sky-400 tracking-wider">Cuota Mensual Estimada</p>
              <div className="flex items-baseline justify-center space-x-1 mt-1">
                <span className="text-3xl font-black text-white">USD {monthlyInstallment}</span>
                <span className="text-xs text-slate-400">/ mes</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                En {termMonths} cuotas fijas en dólares o su equivalente en UI
              </p>
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <button
              onClick={() => setShowLeadModal(true)}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-sky-600/30 flex items-center justify-center space-x-2"
            >
              <span>Solicitar Pre-Aprobación</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/59899123456?text=Hola%20Carvlak,%20quisiera%20asesoramiento%20para%20financiar%20${encodeURIComponent(vehicleTitle || 'un vehículo')}%20por%20USD%20${price}%20con%20una%20cuota%20estimada%20de%20USD%20${monthlyInstallment}%20en%20${termMonths}%20meses`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold text-center border border-slate-800 transition-colors block"
            >
              Consultar con Oficial de Crédito vía WhatsApp
            </a>
          </div>

        </div>

      </div>

      {/* Modal de Solicitud de Pre-Aprobación */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in duration-200">
            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">¡Solicitud Registrada con Éxito!</h4>
                <p className="text-xs text-slate-300">
                  Un oficial del departamento financiero de CARVLAK se comunicará contigo en menos de 24 horas para gestionar la pre-aprobación del crédito con {selectedPlan.bankName}.
                </p>
                <button
                  onClick={() => {
                    setShowLeadModal(false);
                    setSubmitted(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handlePreApprovalSubmit} className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h4 className="font-bold text-white text-sm">Solicitud de Pre-Aprobación Bancaria</h4>
                  <button
                    type="button"
                    onClick={() => setShowLeadModal(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs text-slate-400">
                  Completá tus datos para que ingresemos tu consulta crediticia ante {selectedPlan.bankName} sin costo.
                </p>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                    placeholder="Ej: Juan Pérez"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Teléfono Móvil (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                    placeholder="Ej: 099 123 456"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                    placeholder="ejemplo@correo.com"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Ingreso Mensual Aproximado (UYU o USD)</label>
                  <input
                    type="text"
                    value={leadForm.income}
                    onChange={(e) => setLeadForm({ ...leadForm, income: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                    placeholder="Ej: $ 60.000 UYU o USD 1.500"
                  />
                </div>

                <div className="pt-2 flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowLeadModal(false)}
                    className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
                  >
                    Enviar Solicitud
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
