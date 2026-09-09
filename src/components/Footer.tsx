import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Phone, Clock, Instagram, Award, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80">
      {/* Barra de beneficios de compra en Carvlak */}
      <div className="border-b border-slate-800/60 bg-slate-900/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Garantía Mecánica</h4>
                <p className="text-xs text-slate-400 mt-0.5">Inspección integral de 150 puntos y garantía de 6 meses o 10.000 km.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Reserva con Seña Segura</h4>
                <p className="text-xs text-slate-400 mt-0.5">Bloqueá tu unidad por 72 horas con seña 100% reembolsable ante no conformidad.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Financiación Flexible</h4>
                <p className="text-xs text-slate-400 mt-0.5">Santander, BBVA, Itaú, Scotiabank o Crédito Directo de la Casa Carvlak.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <span className="text-xl">🔄</span>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Tomamos tu Usado</h4>
                <p className="text-xs text-slate-400 mt-0.5">Tasación online y cotización al mejor valor del mercado como entrega inicial.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal del footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Columna 1: Marca & Misión */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-600 flex items-center justify-center text-white font-black text-xl">
                C
              </div>
              <span className="font-black text-2xl tracking-wider text-white">CARVLAK</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Automotora líder en Uruguay dedicada a la compra, venta y permuta de vehículos usados seleccionados, eléctricos 0km, motos de alta cilindrada y todoterrenos 4x4.
            </p>
            <div className="pt-2">
              <a
                href="https://instagram.com/car.vlak"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-semibold text-pink-400 hover:text-pink-300 bg-pink-500/10 border border-pink-500/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Seguinos en @car.vlak</span>
              </a>
            </div>
          </div>

          {/* Columna 2: Categorías de Stock */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Categorías</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/catalogo?category=Usados+Seleccionados" className="hover:text-white transition-colors">
                  Autos Usados Seleccionados
                </Link>
              </li>
              <li>
                <Link href="/catalogo?category=El%C3%A9ctricos+0km" className="hover:text-white transition-colors">
                  Vehículos Eléctricos 0km
                </Link>
              </li>
              <li>
                <Link href="/catalogo?category=Usadas+Seleccionadas" className="hover:text-white transition-colors">
                  Motos Usadas Seleccionadas
                </Link>
              </li>
              <li>
                <Link href="/catalogo?category=Todoterreno" className="hover:text-white transition-colors">
                  Todoterrenos y Pickups 4x4
                </Link>
              </li>
              <li>
                <Link href="/catalogo?sortBy=views_desc" className="hover:text-white transition-colors">
                  Los Más Buscados de la Semana
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Servicios & Herramientas */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Servicios Online</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/financiacion" className="hover:text-white transition-colors">
                  Simulador de Financiación Bancaria
                </Link>
              </li>
              <li>
                <Link href="/tasacion" className="hover:text-white transition-colors">
                  Tasá tu Usado con IA (Trade-In)
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Agendar Visita & Test Drive
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="hover:text-white transition-colors">
                  Garantía y Protocolo de Inspección
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-slate-500">
                  Acceso Equipo Comercial (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Ubicación & Contacto */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Showroom Montevideo</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Av. Italia 5420, Carrasco, Montevideo, Uruguay</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/59899123456" className="hover:text-white">+598 99 123 456</a>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p>Lunes a Viernes: 09:00 a 19:00 hs</p>
                  <p>Sábados: 10:00 a 14:00 hs</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CARVLAK Automotores Uruguay. Todos los derechos reservados.</p>
          <p className="mt-2 sm:mt-0 text-slate-400">
            Precios expresados en Dólares Estadounidenses (USD). Unidades sujetas a disponibilidad previa seña.
          </p>
        </div>
      </div>
    </footer>
  );
}
