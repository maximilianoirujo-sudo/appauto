'use client';

import React, { useState } from 'react';
import { TradeInForm, TradeInResult } from '../types';
import { 
  Car, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Camera, 
  Sparkles, 
  Phone, 
  ShieldCheck 
} from 'lucide-react';

export default function TradeInWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TradeInResult | null>(null);

  const [formData, setFormData] = useState<TradeInForm>({
    brand: '',
    model: '',
    version: '',
    year: 2019,
    mileage: 55000,
    transmission: 'Manual',
    fuel: 'Nafta',
    bodyCondition: 'Bueno',
    hasOfficialService: true,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    comments: '',
    photoUrls: []
  });

  const years = Array.from({ length: 16 }, (_, i) => new Date().getFullYear() - i);

  const handleNext = () => {
    if (step === 1 && (!formData.brand || !formData.model || !formData.year)) {
      alert('Por favor ingresá la marca, modelo y año de tu vehículo');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactName || !formData.contactPhone || !formData.contactEmail) {
      alert('Por favor completá tus datos de contacto');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/trade-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.valuation);
        setStep(4);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto">
      
      {/* Barra de Progreso */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
          <span className={step >= 1 ? 'text-sky-400 font-bold' : ''}>1. Datos del Auto</span>
          <span className={step >= 2 ? 'text-sky-400 font-bold' : ''}>2. Estado & Fotos</span>
          <span className={step >= 3 ? 'text-sky-400 font-bold' : ''}>3. Tus Datos</span>
          <span className={step === 4 ? 'text-emerald-400 font-bold' : ''}>4. Valuación</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* PASO 1: Datos del Vehículo */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Car className="w-5 h-5 mr-2 text-sky-400" />
              ¿Qué vehículo querés entregar como parte de pago?
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Ingresá los datos técnicos principales de tu usado para calibrar la curva de valuación de mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Marca *</label>
              <input
                type="text"
                required
                placeholder="Ej: Volkswagen, Toyota, Chevrolet..."
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Modelo *</label>
              <input
                type="text"
                required
                placeholder="Ej: Gol, Onix, Corolla, Hilux..."
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Versión / Cilindrada</label>
              <input
                type="text"
                placeholder="Ej: 1.6 Trendline, LTZ, SRV..."
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Año de Fabricación *</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Kilometraje Aproximado</label>
                <span className="text-xs font-bold text-sky-400">{formData.mileage.toLocaleString()} km</span>
              </div>
              <input
                type="range"
                min={5000}
                max={200000}
                step={5000}
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors flex items-center space-x-2"
            >
              <span>Continuar al Paso 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PASO 2: Estado y Fotos */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Camera className="w-5 h-5 mr-2 text-sky-400" />
              Estado Mecánico y Visual
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              La transparencia nos ayuda a darte una estimación más precisa antes de la inspección técnica.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Transmisión</label>
              <select
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value as any })}
                className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
              >
                <option value="Manual">Manual</option>
                <option value="Automática">Automática</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Combustible</label>
              <select
                value={formData.fuel}
                onChange={(e) => setFormData({ ...formData, fuel: e.target.value as any })}
                className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
              >
                <option value="Nafta">Nafta</option>
                <option value="Diésel">Diésel</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Eléctrico">Eléctrico</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Estado de Carrocería / Pintura</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Excelente', 'Bueno', 'Detalles menores', 'Regular'].map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setFormData({ ...formData, bodyCondition: cond as any })}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                      formData.bodyCondition === cond
                        ? 'bg-sky-600 border-sky-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="flex items-center space-x-3 p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasOfficialService}
                  onChange={(e) => setFormData({ ...formData, hasOfficialService: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-600 bg-slate-900 border-slate-700"
                />
                <span className="text-xs text-slate-300">
                  Tiene historial de mantenimiento en service oficial o libreta de services al día (+ valor de tasación)
                </span>
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Fotos del Vehículo (Opcional)</label>
              <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center bg-slate-950/60 hover:border-sky-500/50 transition-colors">
                <Camera className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-300 font-medium">Subí o arrastrá fotos de tu vehículo</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Frente, lateral, interior y odómetro de kilometraje</p>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  className="hidden" 
                  id="tradein-photos" 
                  onChange={() => alert('Fotos seleccionadas para el informe de tasación')}
                />
                <label 
                  htmlFor="tradein-photos"
                  className="inline-block mt-3 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors"
                >
                  Seleccionar Imágenes
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors flex items-center space-x-2"
            >
              <span>Continuar al Paso 3</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PASO 3: Datos de Contacto */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-sky-400" />
              ¿A dónde te enviamos la valuación detallada?
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Nuestro algoritmo procesará el rango de valor en el acto y un asesor te esperará en el showroom si querés inspeccionarlo.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Tu Nombre y Apellido *</label>
              <input
                type="text"
                required
                placeholder="Ej: Marcelo Castro"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">WhatsApp Móvil *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ej: 099 876 543"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Comentarios adicionales o vehículo que te interesa en Carvlak</label>
              <textarea
                rows={3}
                placeholder="Ej: Me interesa entregar este auto como entrega inicial de la Nissan Kicks o Toyota Corolla..."
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-sky-600/30 flex items-center space-x-2"
            >
              {loading ? (
                <span>Calculando Tasación...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Obtener Tasación Online</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* PASO 4: Resultado de Valuación IA */}
      {step === 4 && result && (
        <div className="space-y-6 animate-in zoom-in-95 duration-300 text-center">
          
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
              Tasación Referencial Estimada
            </span>
            <h3 className="text-2xl font-black text-white mt-3">
              {result.brand} {result.model} ({result.year})
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Con {result.mileage.toLocaleString()} km aproximados y estado declarado
            </p>
          </div>

          {/* Rango de Valor en USD */}
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl max-w-md mx-auto">
            <p className="text-xs text-slate-400 uppercase font-semibold">Rango de Toma en CARVLAK</p>
            <div className="flex items-baseline justify-center space-x-2 my-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                USD {result.estimatedValueMin.toLocaleString()}
              </span>
              <span className="text-slate-500 font-bold">-</span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                USD {result.estimatedValueMax.toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Precio referencial particular en mercado uruguayo: ~USD {result.marketReferencePrice.toLocaleString()}
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-left flex items-start space-x-3 text-xs text-amber-300/90 max-w-lg mx-auto">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
            <p>
              Esta cotización es una estimación técnica preliminar. El valor definitivo se confirma en nuestro showroom con una rápida inspección visual y mecánica de 20 minutos.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={`https://wa.me/59899123456?text=Hola%20Carvlak,%20acabo%20de%20hacer%20la%20tasaci%C3%B3n%20online%20de%20mi%20${encodeURIComponent(result.brand)}%20${encodeURIComponent(result.model)}%20${result.year}%20con%20rango%20USD%20${result.estimatedValueMin}-${result.estimatedValueMax}.%20Quisiera%20coordinar%20una%20revisi%C3%B3n.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30"
            >
              <Phone className="w-4 h-4" />
              <span>Coordinar Inspección por WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setStep(1);
                setResult(null);
              }}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Tasar Otro Vehículo
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
