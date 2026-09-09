'use client';

import React from 'react';
import Link from 'next/link';
import { Vehicle } from '../types';
import { ShieldCheck, Zap, Fuel, Gauge, Calendar, ChevronRight } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onReserveClick?: (vehicle: Vehicle) => void;
}

export default function VehicleCard({ vehicle, onReserveClick }: VehicleCardProps) {
  // Estimación de cuota mensual a 48 meses con 30% de entrega
  const estimatedDownPayment = vehicle.priceUsd * 0.30;
  const loanBalance = vehicle.priceUsd - estimatedDownPayment;
  const monthlyInterestRate = 0.08 / 12; // 8% TEA estimado
  const monthlyCuota = Math.round((loanBalance * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -48)));

  const isReserved = vehicle.status === 'RESERVADO';
  const isSold = vehicle.status === 'VENDIDO';

  return (
    <div className="group bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-sky-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col">
      
      {/* Imagen & Badges Superiores */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={vehicle.images[0] || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80'}
          alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isReserved || isSold ? 'grayscale-[40%]' : ''}`}
          loading="lazy"
        />

        {/* Gradiente para contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40 pointer-events-none" />

        {/* Badges de condición y garantía */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {vehicle.condition === '0km' ? (
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500 text-slate-950 shadow-md flex items-center">
              <Zap className="w-3 h-3 mr-1" /> 0KM
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-sky-500 text-slate-950 shadow-md">
              Usado Seleccionado
            </span>
          )}

          {vehicle.fuel === 'Eléctrico' && (
            <span className="px-2 py-1 rounded-lg text-xs font-bold bg-teal-500/90 text-white backdrop-blur-md">
              100% Eléctrico
            </span>
          )}

          {vehicle.fuel === 'Híbrido' && (
            <span className="px-2 py-1 rounded-lg text-xs font-bold bg-blue-600/90 text-white backdrop-blur-md">
              Híbrido
            </span>
          )}
        </div>

        {/* Indicador de Estado */}
        {isReserved && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center p-4">
            <span className="px-4 py-2 rounded-xl bg-amber-500/90 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl border border-amber-300">
              Unidad Señada (En trámite)
            </span>
          </div>
        )}

        {isSold && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] flex items-center justify-center p-4">
            <span className="px-4 py-2 rounded-xl bg-red-600/90 text-white font-black text-sm uppercase tracking-wider shadow-xl">
              Vendido
            </span>
          </div>
        )}

        {/* Garantía Carvlak badge */}
        <div className="absolute bottom-3 left-3 flex items-center text-[11px] font-semibold text-sky-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-sky-500/30">
          <ShieldCheck className="w-3.5 h-3.5 mr-1 text-sky-400" />
          <span>Garantía Carvlak Certificada</span>
        </div>
      </div>

      {/* Cuerpo de la Ficha */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Categoría y Marca */}
          <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-sky-400">{vehicle.brand}</span>
            <span className="text-slate-400">{vehicle.category}</span>
          </div>

          {/* Título Principal */}
          <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
            {vehicle.brand} {vehicle.model}
          </h3>
          {vehicle.version && (
            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{vehicle.version}</p>
          )}

          {/* Ficha técnica resumida en pills */}
          <div className="grid grid-cols-2 gap-2 mt-3.5 py-2.5 border-y border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Gauge className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{vehicle.mileage === 0 ? '0 km (Nuevo)' : `${vehicle.mileage.toLocaleString()} km`}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Fuel className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{vehicle.fuel}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">TRANS:</span>
              <span className="truncate">{vehicle.transmission}</span>
            </div>
          </div>
        </div>

        {/* Precios & Botones de Acción */}
        <div className="pt-2">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-medium">Precio Contado</p>
              <p className="text-2xl font-black text-white tracking-tight">
                USD {vehicle.priceUsd.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-400 uppercase font-medium">Financiado</p>
              <p className="text-xs font-semibold text-emerald-400">
                Desde USD {monthlyCuota}/mes
              </p>
            </div>
          </div>

          {/* Botones de acción específicos de automotora (sin "agregar al carrito") */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/vehiculo/${vehicle.slug}`}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold text-center transition-colors border border-slate-700 hover:border-slate-600 flex items-center justify-center space-x-1"
            >
              <span>Ver Ficha</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            {isReserved || isSold ? (
              <button
                disabled
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800/50 text-slate-500 text-xs font-bold cursor-not-allowed text-center"
              >
                No disponible
              </button>
            ) : (
              <Link
                href={`/reserva/${vehicle.slug}`}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold text-center transition-all shadow-md shadow-sky-600/20 hover:scale-[1.02] flex items-center justify-center space-x-1"
              >
                <span>Reservar USD 500</span>
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
