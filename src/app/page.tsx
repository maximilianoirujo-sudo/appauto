'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Car, 
  Zap, 
  Compass, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  CreditCard, 
  Repeat, 
  CalendarCheck,
  Instagram
} from 'lucide-react';
import { INITIAL_VEHICLES } from '@/data/initialStock';
import VehicleCard from '@/components/VehicleCard';

export default function HomePage() {
  const router = useRouter();
  const [nlpQuery, setNlpQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nlpQuery.trim()) {
      router.push(`/catalogo?query=${encodeURIComponent(nlpQuery.trim())}`);
    } else {
      router.push('/catalogo');
    }
  };

  const featuredVehicles = INITIAL_VEHICLES.filter(v => v.isFeatured).slice(0, 6);
  const mostViewedVehicles = [...INITIAL_VEHICLES].sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0)).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. HERO SECTION AUTOMOTRIZ DE ALTO IMPACTO */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden bg-slate-950">
        
        {/* Imagen de fondo con overlay degradé */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80"
            alt="Carvlak Showroom"
            className="w-full h-full object-cover opacity-25 scale-105 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
        </div>

        {/* Contenido Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nueva Experiencia Automotriz en Uruguay</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Tu próximo vehículo, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300">
                seleccionado y garantizado.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Dejá atrás el e-commerce genérico. En CARVLAK encontrás autos usados con inspección técnica de 150 puntos, la nueva gama de eléctricos 0km, motos seleccionadas y todoterrenos con reserva online de seña protegida.
            </p>

            {/* Buscador Inteligente en Lenguaje Natural */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="relative max-w-xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-2 shadow-2xl flex items-center focus-within:border-sky-500 transition-colors">
                <Search className="w-5 h-5 text-slate-400 ml-3 mr-2 shrink-0" />
                <input
                  type="text"
                  value={nlpQuery}
                  onChange={(e) => setNlpQuery(e.target.value)}
                  placeholder="Probá buscar: 'SUV automática familiar hasta 25.000 USD'..."
                  className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none py-2"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-sky-600/30 transition-all shrink-0"
                >
                  Buscar
                </button>
              </div>

              {/* Chips de sugerencia rápida */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-400">Búsquedas populares:</span>
                <button
                  type="button"
                  onClick={() => router.push('/catalogo?category=El%C3%A9ctricos+0km')}
                  className="hover:text-white underline decoration-sky-500 underline-offset-2"
                >
                  Eléctricos 0km
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => router.push('/catalogo?maxPrice=25000&transmission=Autom%C3%A1tica')}
                  className="hover:text-white underline decoration-sky-500 underline-offset-2"
                >
                  Automáticos hasta USD 25k
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => router.push('/catalogo?category=Todoterreno')}
                  className="hover:text-white underline decoration-sky-500 underline-offset-2"
                >
                  Pickups & 4x4
                </button>
              </div>
            </form>
          </div>

          {/* Banner de Campaña / Highlight */}
          <div className="w-full lg:w-96 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Oportunidad de la Semana
              </span>
              <span className="text-xs text-slate-400">Entrega Inmediata</span>
            </div>

            <div className="rounded-2xl overflow-hidden mb-4 relative aspect-[16/10] bg-slate-950">
              <img
                src={INITIAL_VEHICLES[8].images[0]}
                alt={INITIAL_VEHICLES[8].model}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-bold text-white">
                {INITIAL_VEHICLES[8].brand} {INITIAL_VEHICLES[8].model}
              </div>
            </div>

            <h3 className="text-lg font-bold text-white line-clamp-1">{INITIAL_VEHICLES[8].version}</h3>
            <p className="text-xs text-slate-400 mt-1">100% Eléctrico • 430 km autonomía • Wallbox gratis</p>

            <div className="mt-4 pt-4 border-t border-slate-800 flex items-baseline justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase">Precio 0km</p>
                <p className="text-2xl font-black text-white">USD {INITIAL_VEHICLES[8].priceUsd.toLocaleString()}</p>
              </div>
              <Link
                href={`/vehiculo/${INITIAL_VEHICLES[8].slug}`}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors"
              >
                Ver Unidad
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ACCESOS DIRECTOS A LAS 4 CATEGORÍAS PRINCIPALES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Explorá por Categoría
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Inventario especializado organizado por el tipo de movilidad que necesitás.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Usados Seleccionados */}
          <Link
            href="/catalogo?category=Usados+Seleccionados"
            className="group relative bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-sky-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                Usados Seleccionados
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Autos y SUVs de primeras marcas inspeccionados minuciosamente con garantía escrita.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs text-sky-400 font-semibold">
              <span>Ver 24 marcas disponibles</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Eléctricos 0km */}
          <Link
            href="/catalogo?category=El%C3%A9ctricos+0km"
            className="group relative bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Eléctricos 0km
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Dongfeng, GWM, Bestune y Hudson. Movilidad sustentable con máxima autonomía y ahorro.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>Entrega inmediata</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Motos Usadas Seleccionadas */}
          <Link
            href="/catalogo?category=Usadas+Seleccionadas"
            className="group relative bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-amber-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🏍</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Motos Seleccionadas
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                KTM, Husqvarna y Kawasaki. Unidades de media y alta cilindrada revisadas en taller oficial.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span>Explorar dos ruedas</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Todoterreno / 4x4 */}
          <Link
            href="/catalogo?category=Todoterreno"
            className="group relative bg-slate-900/90 border border-slate-800 hover:border-orange-500/50 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-orange-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                Todoterreno y 4x4
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Toyota Prado, Jeep Wrangler, Suzuki Jimny y Pickups. Potencia y tracción sin límites.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs text-orange-400 font-semibold">
              <span>Ver gama 4x4</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* 3. DESTACADOS DE LA SEMANA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              Unidades Seleccionadas
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Destacados del Showroom
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex items-center space-x-1 text-xs sm:text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors"
          >
            <span>Ver todo el stock ({INITIAL_VEHICLES.length} unidades)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* 4. PROPUESTA DE VALOR: CÓMO SE COMPRA UN VEHÍCULO EN CARVLAK */}
      <section className="bg-slate-900/60 border-y border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              Proceso Transparente
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Comprá o Reservá con Total Confianza
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Un sistema pensado para vehículos reales, sin falsas promesas ni términos de e-commerce genérico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-3 relative">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center font-black text-lg">
                1
              </div>
              <h4 className="text-base font-bold text-white">Elegí tu Vehículo</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Consultá la ficha técnica real, kilometraje verificado, fotos en detalle y calculá tu cuota bancaria estimada.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-black text-lg">
                2
              </div>
              <h4 className="text-base font-bold text-white">Reservá con Seña (USD 500)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bloqueá la unidad por 72 horas para que nadie más la compre. Si la inspección presencial no te conforma, te devolvemos la seña.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-black text-lg">
                3
              </div>
              <h4 className="text-base font-bold text-white">Test Drive & Financiación</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vení al showroom en Carrasco, probalo en calle y gestionamos tu crédito con Santander, BBVA, Itaú o crédito de la casa.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-black text-lg">
                4
              </div>
              <h4 className="text-base font-bold text-white">Entrega & Transferencia</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Escribanía propia, títulos prontos, patente al día y entrega inmediata de llaves con garantía escrita.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. LOS MÁS BUSCADOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Tendencias del Mercado
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Los Más Buscados de la Semana
            </h2>
          </div>
          <Link
            href="/catalogo?sortBy=views_desc"
            className="text-xs sm:text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors flex items-center"
          >
            <span>Ver ranking completo</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mostViewedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* 6. BANNER DOBLE: FINANCIACIÓN & TRADE-IN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card Financiación */}
          <div className="bg-gradient-to-br from-slate-900 to-sky-950/40 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white">Simulá tu Financiación</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Planes en dólares o Unidades Indexadas (UI) hasta en 60 cuotas con Santander, BBVA, Itaú o crédito directo de Carvlak. Aprobación en 24 horas.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-800/80">
              <Link
                href="/financiacion"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-600/20"
              >
                <span>Calcular Cuotas Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card Trade-In */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <Repeat className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white">Tasá tu Usado con IA</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Subí los datos de tu auto y obtené un rango referencial instantáneo basado en el mercado uruguayo para entregarlo como parte de pago.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-800/80">
              <Link
                href="/tasacion"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
              >
                <span>Iniciar Tasación Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 7. INSTAGRAM FEED TEASER @car.vlak */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Instagram className="w-5 h-5 text-pink-400" />
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">
            Comunidad Carvlak
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Seguinos en Instagram <a href="https://instagram.com/car.vlak" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">@car.vlak</a>
        </h2>
        <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
          Ingresos de nuevos vehículos todas las semanas, entregas a clientes y reviews en video.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {[
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80'
          ].map((imgUrl, i) => (
            <a
              key={i}
              href="https://instagram.com/car.vlak"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800"
            >
              <img
                src={imgUrl}
                alt="Instagram Carvlak post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
