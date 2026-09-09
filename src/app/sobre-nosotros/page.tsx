import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-500/10 px-3.5 py-1 rounded-full border border-sky-500/20">
          Trayectoria & Confianza
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          La Automotora que Evolucionó la Compra en Uruguay
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          En CARVLAK redefinimos la experiencia de compra de tu próximo auto o moto con transparencia absoluta, garantías mecánicas reales y tecnología al servicio de tu tranquilidad.
        </p>
      </div>

      {/* Grid de Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Inspección de 150 Puntos</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Cada vehículo que ingresa a nuestro catálogo pasa por un riguroso escaneo computarizado, revisión de tren delantero, frenos, compresión de motor, fluidos y análisis de pintura para descartar golpes estructurales.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Garantía Mecánica Real</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            No vendemos promesas al aire. Nuestras unidades usadas seleccionadas cuentan con garantía de motor y caja por 6 meses o 10.000 km, y los 0km eléctricos disponen de garantía oficial de fábrica hasta por 8 años.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Gestoría & Escribanía Propia</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Nos encargamos de todo el papeleo legal: títulos, certificados de libre prenda y embargo, empadronamiento, transferencia municipal de patente e ITV al día para que solo te preocupes por manejar.
          </p>
        </div>
      </div>

      {/* Banner Call to Action */}
      <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-blue-900 border border-slate-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-black text-white">¿Listo para encontrar tu próximo vehículo?</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Explorá el catálogo completo o hablá en vivo con nuestro asesor inteligente de stock.
          </p>
        </div>
        <Link
          href="/catalogo"
          className="px-8 py-4 rounded-xl bg-white text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors shadow-xl shrink-0 flex items-center space-x-2"
        >
          <span>Ver Stock Disponible</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
