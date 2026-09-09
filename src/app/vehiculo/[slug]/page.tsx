'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Calendar, 
  Gauge, 
  Fuel, 
  Zap, 
  CheckCircle2, 
  Lock, 
  Share2, 
  ArrowLeft,
  ChevronRight,
  Eye,
  Camera,
  RotateCw
} from 'lucide-react';
import { INITIAL_VEHICLES } from '@/data/initialStock';
import FinancingCalculator from '@/components/FinancingCalculator';
import VehicleCard from '@/components/VehicleCard';

export default function VehicleDetailPage({ params }: { params: { slug: string } }) {
  const vehicle = INITIAL_VEHICLES.find(v => v.slug === params.slug || v.id === params.slug);

  if (!vehicle) {
    notFound();
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const [testDriveSubmitted, setTestDriveSubmitted] = useState(false);
  const [testDriveForm, setTestDriveForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: ''
  });

  const similarVehicles = INITIAL_VEHICLES
    .filter(v => v.id !== vehicle.id && (v.category === vehicle.category || Math.abs(v.priceUsd - vehicle.priceUsd) < 12000))
    .slice(0, 3);

  // Cuota mensual estimada
  const estimatedDownPayment = vehicle.priceUsd * 0.30;
  const loanBalance = vehicle.priceUsd - estimatedDownPayment;
  const monthlyRate = 0.079 / 12;
  const monthlyCuota = Math.round((loanBalance * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -48)));

  const handleTestDriveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'TEST_DRIVE',
          vehicleId: vehicle.id,
          name: testDriveForm.name,
          phone: testDriveForm.phone,
          email: testDriveForm.email,
          preferredDate: testDriveForm.date,
          message: `Solicitud de Test Drive para: ${vehicle.brand} ${vehicle.model} (${vehicle.year}). Fecha deseada: ${testDriveForm.date}`
        })
      });
      setTestDriveSubmitted(true);
    } catch (err) {
      setTestDriveSubmitted(true);
    }
  };

  const shareText = `¡Mirá este ${vehicle.brand} ${vehicle.model} ${vehicle.year} en CARVLAK! USD ${vehicle.priceUsd.toLocaleString()}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs y Navegación de Regreso */}
      <div className="flex justify-between items-center text-xs text-slate-400">
        <Link href="/catalogo" className="flex items-center hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Volver al Catálogo</span>
        </Link>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: vehicle.model, text: shareText, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Enlace copiado al portapapeles');
              }
            }}
            className="flex items-center space-x-1 hover:text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Compartir</span>
          </button>
        </div>
      </div>

      {/* Grid Principal: Galería a la izquierda + Panel de Compra/Reserva a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: Galería Fotográfica / 360° + Ficha Técnica */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Galería Principal */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
              <img
                src={vehicle.images[activeImageIndex] || vehicle.images[0]}
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Botón Switch Modo 360° */}
              <button
                onClick={() => setIs360Mode(!is360Mode)}
                className={`absolute top-4 right-4 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 backdrop-blur-md transition-all shadow-lg ${
                  is360Mode 
                    ? 'bg-sky-500 text-slate-950 border border-sky-300' 
                    : 'bg-slate-900/80 text-white border border-slate-700 hover:bg-slate-800'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${is360Mode ? 'animate-spin' : ''}`} />
                <span>{is360Mode ? 'Modo 360° Activo' : 'Visor 360°'}</span>
              </button>

              {/* Badges de Garantía y Ubicación */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-950/80 backdrop-blur-md text-sky-400 border border-sky-500/30 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                  Inspección Certificada Carvlak
                </span>
                <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-800 flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                  {vehicle.location}
                </span>
              </div>
            </div>

            {/* Selector de Miniaturas */}
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
              {vehicle.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveImageIndex(idx); setIs360Mode(false); }}
                  className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-slate-950 ${
                    activeImageIndex === idx
                      ? 'border-sky-500 scale-105 shadow-md shadow-sky-500/20'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Ficha Técnica Detallada (Tabulada) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
              Especificaciones Técnicas
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium">Año de Fabricación</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{vehicle.year}</span>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium">Kilometraje</span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {vehicle.mileage === 0 ? '0 km (Nuevo)' : `${vehicle.mileage.toLocaleString()} km`}
                </span>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium">Transmisión</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{vehicle.transmission}</span>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium">Combustible</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{vehicle.fuel}</span>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium">Carrocería</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{vehicle.bodyType}</span>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium">Motorización</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{vehicle.engine || 'Estándar'}</span>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium">Potencia</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{vehicle.powerHp} HP</span>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium">Color Exterior</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{vehicle.colorExterior || 'Gris'}</span>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80">
                <span className="text-slate-400 block font-medium">Estado / Documentación</span>
                <span className="text-sm font-bold text-emerald-400 mt-0.5 block">Al Día / Pronto para transferir</span>
              </div>
            </div>

            {/* Lista de Equipamiento y Confort */}
            <div>
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
                Equipamiento y Seguridad Destacados
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {vehicle.features.map((feat, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Simulador de Financiación para este Auto */}
          <div>
            <FinancingCalculator
              initialPrice={vehicle.priceUsd}
              vehicleTitle={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
            />
          </div>

        </div>

        {/* COLUMNA DERECHA: Sticky Box de Reserva & Consulta Comercial */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 sticky top-24">
            
            {/* Header del Vehículo */}
            <div className="border-b border-slate-800 pb-4">
              <div className="flex justify-between items-center text-xs text-sky-400 font-semibold mb-1">
                <span>{vehicle.category}</span>
                <span>ID: {vehicle.id.toUpperCase()}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {vehicle.brand} {vehicle.model}
              </h1>
              {vehicle.version && (
                <p className="text-xs text-slate-400 mt-1 font-medium">{vehicle.version}</p>
              )}
            </div>

            {/* Bloque de Precios */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-400 uppercase font-bold">Precio Contado</span>
                <span className="text-3xl font-black text-white tracking-tight">
                  USD {vehicle.priceUsd.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800/60">
                <span className="text-slate-400">Financiación estimada:</span>
                <span className="font-bold text-emerald-400">Desde USD {monthlyCuota} / mes</span>
              </div>
            </div>

            {/* BOTONES DE ACCIÓN COMERCIAL AUTOMOTRIZ */}
            <div className="space-y-3">
              
              {/* Botón Principal: Reservar con Seña USD 500 */}
              <Link
                href={`/reserva/${vehicle.slug}`}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-sky-500 hover:from-sky-500 hover:to-blue-500 text-white text-sm font-black uppercase tracking-wider shadow-xl shadow-sky-600/30 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Reservar con Seña (USD 500)</span>
              </Link>

              {/* Botón Secundario: Agendar Visita / Test Drive */}
              <button
                type="button"
                onClick={() => setTestDriveModalOpen(true)}
                className="w-full py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>Agendar Visita / Test Drive</span>
              </button>

              {/* Botón Terciario: WhatsApp con mensaje armado */}
              <a
                href={`https://wa.me/59899123456?text=Hola%20Carvlak,%20estoy%20viendo%20el%20${encodeURIComponent(vehicle.brand)}%20${encodeURIComponent(vehicle.model)}%20${vehicle.year}%20(USD%20${vehicle.priceUsd.toLocaleString()})%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-2xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Consultar por WhatsApp</span>
              </a>

            </div>

            {/* Garantías y Seguridad de la Operación */}
            <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-400">
              <div className="flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Seña 100% Protegida:</strong> Si el vehículo no coincide con la inspección en showroom, te reembolsamos la seña inmediatamente.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Bloqueo por 72 horas:</strong> Al pagar la seña, la unidad queda reservada exclusivamente a tu nombre.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Disponible para inspección inmediata en Showroom Carrasco, Montevideo.</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Vehículos Similares */}
      {similarVehicles.length > 0 && (
        <div className="pt-12 border-t border-slate-800 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Alternativas</span>
              <h2 className="text-2xl font-black text-white mt-1">Vehículos Similares en Stock</h2>
            </div>
            <Link href="/catalogo" className="text-xs font-bold text-sky-400 hover:underline">
              Ver Todo
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarVehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      )}

      {/* Modal de Agendamiento de Visita / Test Drive */}
      {testDriveModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            {testDriveSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">¡Visita Agendada!</h4>
                <p className="text-xs text-slate-300">
                  Hemos reservado tu horario para la prueba de manejo de este {vehicle.brand} {vehicle.model}. Te enviamos los detalles de confirmación por WhatsApp.
                </p>
                <button
                  onClick={() => { setTestDriveModalOpen(false); setTestDriveSubmitted(false); }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold"
                >
                  Entendido
                </button>
              </div>
            ) : (
              <form onSubmit={handleTestDriveSubmit} className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h4 className="font-bold text-white text-sm">
                    Agendar Visita & Test Drive
                  </h4>
                  <button type="button" onClick={() => setTestDriveModalOpen(false)} className="text-slate-400">
                    ✕
                  </button>
                </div>

                <p className="text-xs text-slate-400">
                  Coordiná día y hora para probar este <strong>{vehicle.brand} {vehicle.model} ({vehicle.year})</strong> en nuestro showroom de Carrasco.
                </p>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={testDriveForm.name}
                    onChange={(e) => setTestDriveForm({ ...testDriveForm, name: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                    placeholder="Ej: Laura González"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">WhatsApp de Contacto *</label>
                  <input
                    type="tel"
                    required
                    value={testDriveForm.phone}
                    onChange={(e) => setTestDriveForm({ ...testDriveForm, phone: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                    placeholder="Ej: 098 765 432"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={testDriveForm.email}
                    onChange={(e) => setTestDriveForm({ ...testDriveForm, email: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                    placeholder="ejemplo@correo.com"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Día y Hora Preferido</label>
                  <input
                    type="datetime-local"
                    value={testDriveForm.date}
                    onChange={(e) => setTestDriveForm({ ...testDriveForm, date: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                  />
                </div>

                <div className="pt-2 flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setTestDriveModalOpen(false)}
                    className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
                  >
                    Confirmar Cita
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
