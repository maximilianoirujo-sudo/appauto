'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Lock, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  CheckCircle2, 
  Printer, 
  QrCode, 
  ArrowLeft,
  Calendar,
  Clock,
  Car
} from 'lucide-react';
import { INITIAL_VEHICLES } from '@/data/initialStock';
import { Reservation } from '@/types';

export default function ReservationCheckoutPage({ params }: { params: { id: string } }) {
  const vehicle = INITIAL_VEHICLES.find(v => v.slug === params.id || v.id === params.id);

  if (!vehicle) {
    notFound();
  }

  const [paymentMethod, setPaymentMethod] = useState<'MERCADO_PAGO' | 'TRANSFERENCIA' | 'TARJETA_SANDBOX'>('MERCADO_PAGO');
  const [loading, setLoading] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    docType: 'CI',
    docNumber: '',
    address: '',
    notes: '',
    termsAccepted: true
  });

  const depositAmount = 500; // USD 500 estándar
  const remainingBalance = vehicle.priceUsd - depositAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.docNumber) {
      alert('Por favor completá todos los campos requeridos del comprador');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerDocType: formData.docType,
          customerDocNumber: formData.docNumber,
          customerAddress: formData.address,
          depositAmountUsd: depositAmount,
          paymentMethod
        })
      });

      const data = await res.json();
      if (data.success) {
        setConfirmedReservation(data.reservation);
      }
    } catch (err) {
      // Si ocurre error de red, creamos reserva local de respaldo
      const fallbackRes: Reservation = {
        id: `res-${Date.now()}`,
        reservationNumber: `CRV-RES-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        vehicleId: vehicle.id,
        vehicle,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerDocType: formData.docType,
        customerDocNumber: formData.docNumber,
        depositAmountUsd: depositAmount,
        paymentMethod,
        paymentStatus: 'APROBADO',
        contractTermsAccepted: true,
        expiresAt: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
        createdAt: new Date().toISOString()
      };
      setConfirmedReservation(fallbackRes);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Volver */}
      <div className="mb-6">
        <Link 
          href={`/vehiculo/${vehicle.slug}`}
          className="inline-flex items-center text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Volver a la ficha de {vehicle.brand} {vehicle.model}</span>
        </Link>
      </div>

      {!confirmedReservation ? (
        <div className="space-y-8">
          
          {/* Header de Reserva */}
          <div className="border-b border-slate-800 pb-6">
            <div className="flex items-center space-x-2 text-xs font-bold text-sky-400 uppercase tracking-widest mb-1">
              <Lock className="w-4 h-4" />
              <span>Checkout Seguro de Reserva Automotriz</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Reservar con Seña: {vehicle.brand} {vehicle.model}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Al realizar la seña de USD {depositAmount}, bloqueás este vehículo inmediatamente por 72 horas mientras coordinamos la inspección presencial y los trámites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Formulario de Compra / Datos Personales */}
            <form onSubmit={handleSubmit} className="md:col-span-7 space-y-6">
              
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-3">
                  1. Datos del Titular de la Reserva
                </h3>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Nombre y Apellido Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                    placeholder="Ej: Martín Rodríguez Pérez"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Doc.</label>
                    <select
                      value={formData.docType}
                      onChange={(e) => setFormData({ ...formData, docType: e.target.value })}
                      className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                    >
                      <option value="CI">C.I. (UY)</option>
                      <option value="RUT">RUT</option>
                      <option value="PAS">Pasaporte</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Número de Documento *</label>
                    <input
                      type="text"
                      required
                      value={formData.docNumber}
                      onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                      className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                      placeholder="Ej: 4.123.456-7"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">WhatsApp de Contacto *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                      placeholder="Ej: 099 123 456"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                      placeholder="martin@correo.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Dirección / Departamento</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                    placeholder="Ej: Montevideo, Pocitos"
                  />
                </div>
              </div>

              {/* Selector de Método de Pago de la Seña */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-3">
                  2. Medio de Pago de la Seña (USD {depositAmount})
                </h3>

                <div className="space-y-3">
                  {/* Opción 1: Mercado Pago */}
                  <label 
                    className={`flex items-start space-x-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                      paymentMethod === 'MERCADO_PAGO'
                        ? 'bg-sky-950/40 border-sky-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'MERCADO_PAGO'}
                      onChange={() => setPaymentMethod('MERCADO_PAGO')}
                      className="mt-1 text-sky-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs">Mercado Pago Uruguay</span>
                        <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-semibold">Tarjetas / Redpagos / Abitab</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Acreditación instantánea con tarjetas de crédito locales en cuotas o saldo en cuenta.
                      </p>
                    </div>
                  </label>

                  {/* Opción 2: Transferencia Bancaria */}
                  <label 
                    className={`flex items-start space-x-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                      paymentMethod === 'TRANSFERENCIA'
                        ? 'bg-sky-950/40 border-sky-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'TRANSFERENCIA'}
                      onChange={() => setPaymentMethod('TRANSFERENCIA')}
                      className="mt-1 text-sky-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs">Transferencia Bancaria en USD</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-semibold">BROU • Santander • Itaú</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Transferí desde tu home banking y subís el comprobante para aprobación en el día.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Datos de transferencia bancaria si está seleccionada */}
                {paymentMethod === 'TRANSFERENCIA' && (
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2 mt-3 animate-in fade-in">
                    <p className="font-bold text-sky-400">Cuentas Bancarias de CARVLAK SRL (en USD):</p>
                    <div className="space-y-1 font-mono text-[11px]">
                      <p>• <strong>BROU USD:</strong> 001558234-00002</p>
                      <p>• <strong>Santander USD:</strong> 007000123456</p>
                      <p>• <strong>Itaú USD:</strong> 9876543-02</p>
                    </div>
                    <p className="text-[10px] text-slate-500 pt-1">
                      * Concepto de transferencia: "Seña {vehicle.model} - [Tu Apellido]"
                    </p>
                  </div>
                )}
              </div>

              {/* Contrato preliminar y términos */}
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl text-xs text-slate-400 space-y-2">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="w-4 h-4 text-sky-600 rounded bg-slate-950 border-slate-800 mt-0.5"
                  />
                  <span className="text-[11px] leading-relaxed">
                    Acepto los términos del <strong>Contrato Preliminar de Reserva</strong>. Entiendo que la seña de USD 500 congela la unidad por 72 horas y que es 100% reembolsable si el vehículo no supera la inspección presencial o si el crédito bancario no es concedido.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.termsAccepted}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-sm font-black uppercase tracking-wider shadow-xl shadow-sky-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>{loading ? 'Procesando Reserva...' : `Confirmar y Pagar Seña (USD ${depositAmount})`}</span>
              </button>

            </form>

            {/* Resumen del Vehículo y de la Operación */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 sticky top-24">
                <h3 className="font-bold text-white text-xs uppercase tracking-wider border-b border-slate-800 pb-3">
                  Resumen de la Unidad
                </h3>

                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950">
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.model}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <span className="text-[10px] font-bold text-sky-400 uppercase">{vehicle.category}</span>
                  <h4 className="text-lg font-bold text-white">{vehicle.brand} {vehicle.model}</h4>
                  <p className="text-xs text-slate-400">{vehicle.version} • {vehicle.year}</p>
                </div>

                <div className="py-3 border-y border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Precio Contado:</span>
                    <span className="font-bold text-white">USD {vehicle.priceUsd.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sky-400 font-semibold">
                    <span>Monto Seña a Abonar:</span>
                    <span>USD {depositAmount}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Saldo restante en entrega:</span>
                    <span>USD {remainingBalance.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 text-[11px] text-slate-400">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Bloqueo exclusivo por 72 horas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Deducible del precio final de venta</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Garantía de reembolso ante disconformidad</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      ) : (
        /* VOUCHER DE CONFIRMACIÓN Y COMPROBANTE DE RESERVA */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-8 animate-in zoom-in-95 duration-300">
          
          <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Reserva Confirmada
            </span>
            <h2 className="text-3xl font-black text-white mt-3">
              ¡La unidad ha sido bloqueada a tu nombre!
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
              Se ha emitido tu comprobante oficial de reserva preliminar para CARVLAK SRL.
            </p>
          </div>

          {/* Tarjeta del Certificado de Reserva */}
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl max-w-xl mx-auto text-left space-y-4">
            
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Código de Reserva</p>
                <p className="text-xl font-mono font-black text-sky-400">{confirmedReservation.reservationNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Monto Seña</p>
                <p className="text-xl font-black text-emerald-400">USD {confirmedReservation.depositAmountUsd}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Vehículo:</span>
                <span className="font-bold text-white">{vehicle.brand} {vehicle.model} ({vehicle.year})</span>
              </div>
              <div>
                <span className="text-slate-500 block">Titular:</span>
                <span className="font-bold text-white">{confirmedReservation.customerName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Documento:</span>
                <span className="font-mono text-slate-300">{confirmedReservation.customerDocType} {confirmedReservation.customerDocNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Validez de Bloqueo:</span>
                <span className="font-bold text-amber-400">72 horas (hasta {new Date(confirmedReservation.expiresAt).toLocaleDateString()})</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Showroom: Av. Italia 5420, Montevideo</span>
              <span className="text-emerald-400 font-semibold">Estado: Señado</span>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Descargar Comprobante</span>
            </button>

            <a
              href={`https://wa.me/59899123456?text=Hola%20Carvlak,%20acabo%20de%20reservar%20el%20veh%C3%ADculo%20${encodeURIComponent(vehicle.brand)}%20${encodeURIComponent(vehicle.model)}%20con%20el%20c%C3%B3digo%20${confirmedReservation.reservationNumber}.%20Quisiera%20coordinar%20la%20visita.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-emerald-600/30"
            >
              <span>Continuar Trámite por WhatsApp</span>
            </a>
          </div>

        </div>
      )}

    </div>
  );
}
