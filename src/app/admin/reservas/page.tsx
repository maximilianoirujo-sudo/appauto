'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Car, 
  ShieldCheck, 
  Printer 
} from 'lucide-react';
import { StockService } from '@/lib/stockService';
import { Reservation } from '@/types';

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(StockService.getReservations());

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <Link href="/admin" className="text-xs text-slate-400 hover:text-white flex items-center mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Volver al Dashboard</span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">Control de Señas y Reservas</h1>
          <p className="text-xs text-slate-400">Seguimiento de unidades bloqueadas por 72 horas y verificación de pagos.</p>
        </div>
      </div>

      {reservations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reservations.map((res) => (
            <div key={res.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-sky-400 block">{res.reservationNumber}</span>
                  <h3 className="font-bold text-white text-base mt-0.5">{res.customerName}</h3>
                </div>
                <span className="px-3 py-1 rounded-xl text-xs font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {res.paymentStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 block font-medium">Documento:</span>
                  <span className="font-mono text-white">{res.customerDocType} {res.customerDocNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Monto Seña:</span>
                  <span className="font-bold text-emerald-400">USD {res.depositAmountUsd}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Teléfono / WhatsApp:</span>
                  <span className="text-white">{res.customerPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Método de Pago:</span>
                  <span className="text-white">{res.paymentMethod}</span>
                </div>
              </div>

              {res.vehicle && (
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center space-x-3">
                  <img
                    src={res.vehicle.images[0]}
                    alt={res.vehicle.model}
                    className="w-12 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-bold text-white truncate">{res.vehicle.brand} {res.vehicle.model}</p>
                    <p className="text-slate-400">{res.vehicle.year} • USD {res.vehicle.priceUsd.toLocaleString()}</p>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-xs">
                <span className="text-amber-400 font-semibold flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  Expira: {new Date(res.expiresAt).toLocaleDateString()}
                </span>
                <a
                  href={`https://wa.me/${res.customerPhone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors"
                >
                  Contactar
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <Lock className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No hay reservas activas en este momento</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Cuando un cliente reserve una unidad con seña desde la web pública, aparecerá listado aquí con su voucher y comprobante.
          </p>
        </div>
      )}

    </div>
  );
}
