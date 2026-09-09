'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Car, 
  Zap, 
  Compass, 
  ShieldCheck, 
  Phone, 
  Menu, 
  X, 
  Calculator, 
  Search,
  Lock,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [catMenuOpen, setCatMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Barra superior de confianza y contacto */}
      <div className="bg-slate-900/80 px-4 py-1.5 border-b border-slate-800/60 text-xs text-slate-300 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-sky-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Unidades con Garantía Mecánica Certificada
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-400">Montevideo, Uruguay</span>
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href="https://wa.me/59899123456?text=Hola%20Carvlak,%20quisiera%20hacer%20una%20consulta" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 mr-1" />
            <span className="font-semibold">+598 99 123 456</span>
          </a>
          <Link 
            href="/admin" 
            className="text-slate-400 hover:text-white flex items-center transition-colors"
            title="Panel comercial interno"
          >
            <Lock className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Portal Admin</span>
          </Link>
        </div>
      </div>

      {/* Navegación principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo CARVLAK */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-sky-400 flex items-center justify-center shadow-lg shadow-sky-600/30 group-hover:scale-105 transition-transform">
              <span className="font-black text-2xl tracking-tighter text-white">C</span>
            </div>
            <div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-black text-2xl tracking-wider text-white font-sans">CARVLAK</span>
                <span className="text-xs uppercase font-bold tracking-widest text-sky-400">UY</span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">Automotores & Movilidad</p>
            </div>
          </Link>

          {/* Enlaces de escritorio */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm">
            <Link 
              href="/" 
              className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              Inicio
            </Link>

            {/* Dropdown Catálogo */}
            <div className="relative group">
              <Link 
                href="/catalogo"
                className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center"
              >
                <span>Catálogo Completo</span>
                <ChevronDown className="w-4 h-4 ml-1 opacity-60 group-hover:opacity-100 transition-transform group-hover:rotate-180" />
              </Link>
              
              <div className="absolute top-full left-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link 
                  href="/catalogo?category=Usados+Seleccionados"
                  className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <Car className="w-4 h-4 mr-3 text-sky-400" />
                  <div>
                    <p className="font-medium">Usados Seleccionados</p>
                    <p className="text-xs text-slate-400">Autos y SUVs garantizados</p>
                  </div>
                </Link>
                <Link 
                  href="/catalogo?category=El%C3%A9ctricos+0km"
                  className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <Zap className="w-4 h-4 mr-3 text-emerald-400" />
                  <div>
                    <p className="font-medium">Eléctricos 0km</p>
                    <p className="text-xs text-slate-400">Dongfeng, GWM, Bestune, Hudson</p>
                  </div>
                </Link>
                <Link 
                  href="/catalogo?category=Usadas+Seleccionadas"
                  className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <span className="w-4 h-4 mr-3 text-amber-400 font-bold text-center">🏍</span>
                  <div>
                    <p className="font-medium">Motos Seleccionadas</p>
                    <p className="text-xs text-slate-400">KTM, Husqvarna, Kawasaki</p>
                  </div>
                </Link>
                <Link 
                  href="/catalogo?category=Todoterreno"
                  className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <Compass className="w-4 h-4 mr-3 text-orange-400" />
                  <div>
                    <p className="font-medium">Todoterreno y 4x4</p>
                    <p className="text-xs text-slate-400">Pickups y todoterrenos puros</p>
                  </div>
                </Link>
              </div>
            </div>

            <Link 
              href="/financiacion" 
              className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center"
            >
              <Calculator className="w-4 h-4 mr-1.5 text-sky-400" />
              <span>Financiación</span>
            </Link>

            <Link 
              href="/tasacion" 
              className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              Tasá tu Usado
            </Link>

            <Link 
              href="/sobre-nosotros" 
              className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              Nosotros
            </Link>

            <Link 
              href="/contacto" 
              className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              Contacto
            </Link>
          </nav>

          {/* Botones de acción derecha */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/catalogo"
              className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors"
              title="Buscar en catálogo"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/tasacion"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all hover:border-slate-600"
            >
              Entregá tu Auto
            </Link>

            <Link
              href="/catalogo"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-sm font-semibold shadow-lg shadow-sky-600/25 transition-all hover:scale-[1.02]"
            >
              Explorar Stock
            </Link>
          </div>

          {/* Botón móvil hamburguesa */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 font-medium"
          >
            Inicio
          </Link>
          <div className="pt-1 pb-1">
            <p className="px-3 text-xs uppercase tracking-wider text-slate-500 font-bold">Categorías</p>
            <div className="mt-1 space-y-1 pl-2">
              <Link
                href="/catalogo?category=Usados+Seleccionados"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800"
              >
                <Car className="w-4 h-4 mr-2 text-sky-400" /> Usados Seleccionados
              </Link>
              <Link
                href="/catalogo?category=El%C3%A9ctricos+0km"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800"
              >
                <Zap className="w-4 h-4 mr-2 text-emerald-400" /> Eléctricos 0km
              </Link>
              <Link
                href="/catalogo?category=Usadas+Seleccionadas"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800"
              >
                <span className="w-4 h-4 mr-2 text-amber-400 text-xs">🏍</span> Motos Seleccionadas
              </Link>
              <Link
                href="/catalogo?category=Todoterreno"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800"
              >
                <Compass className="w-4 h-4 mr-2 text-orange-400" /> Todoterreno y 4x4
              </Link>
            </div>
          </div>
          <Link
            href="/financiacion"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 font-medium"
          >
            <Calculator className="w-4 h-4 mr-2 text-sky-400" /> Simulador de Financiación
          </Link>
          <Link
            href="/tasacion"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 font-medium"
          >
            Tasación de Usados (Trade-In)
          </Link>
          <Link
            href="/sobre-nosotros"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 font-medium"
          >
            Sobre Nosotros
          </Link>
          <Link
            href="/contacto"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 font-medium"
          >
            Contacto & Showroom
          </Link>
          <div className="pt-2 flex flex-col space-y-2">
            <Link
              href="/catalogo"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold text-sm"
            >
              Ver Todo el Catálogo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
