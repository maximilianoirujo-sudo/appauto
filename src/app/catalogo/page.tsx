'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Car, 
  Zap, 
  Compass, 
  X,
  ChevronDown
} from 'lucide-react';
import { INITIAL_VEHICLES, CARVLAK_BRANDS_BY_CATEGORY } from '@/data/initialStock';
import { Vehicle, VehicleFilterParams } from '@/types';
import VehicleCard from '@/components/VehicleCard';

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Estados de filtros
  const [category, setCategory] = useState<string>(searchParams.get('category') || 'all');
  const [brand, setBrand] = useState<string>(searchParams.get('brand') || 'all');
  const [minPrice, setMinPrice] = useState<number>(Number(searchParams.get('minPrice')) || 0);
  const [maxPrice, setMaxPrice] = useState<number>(Number(searchParams.get('maxPrice')) || 100000);
  const [minYear, setMinYear] = useState<number>(Number(searchParams.get('minYear')) || 2018);
  const [maxMileage, setMaxMileage] = useState<number>(Number(searchParams.get('maxMileage')) || 150000);
  const [transmission, setTransmission] = useState<string>(searchParams.get('transmission') || 'all');
  const [fuel, setFuel] = useState<string>(searchParams.get('fuel') || 'all');
  const [condition, setCondition] = useState<string>(searchParams.get('condition') || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('query') || '');
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') || 'featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Marcas dinámicas según la categoría seleccionada
  const availableBrands = useMemo(() => {
    if (category !== 'all' && CARVLAK_BRANDS_BY_CATEGORY[category as keyof typeof CARVLAK_BRANDS_BY_CATEGORY]) {
      return CARVLAK_BRANDS_BY_CATEGORY[category as keyof typeof CARVLAK_BRANDS_BY_CATEGORY];
    }
    // Todas las marcas
    const all = new Set<string>();
    Object.values(CARVLAK_BRANDS_BY_CATEGORY).forEach(list => list.forEach(b => all.add(b)));
    return Array.from(all).sort();
  }, [category]);

  // Filtrado reactivo en el cliente
  const filteredVehicles = useMemo(() => {
    let result = [...INITIAL_VEHICLES];

    if (category !== 'all') {
      result = result.filter(v => v.category.toLowerCase() === category.toLowerCase());
    }

    if (brand !== 'all') {
      result = result.filter(v => v.brand.toLowerCase() === brand.toLowerCase());
    }

    if (condition !== 'all') {
      result = result.filter(v => v.condition.toLowerCase() === condition.toLowerCase());
    }

    if (transmission !== 'all') {
      result = result.filter(v => v.transmission.toLowerCase() === transmission.toLowerCase());
    }

    if (fuel !== 'all') {
      result = result.filter(v => v.fuel.toLowerCase() === fuel.toLowerCase());
    }

    if (maxPrice > 0) {
      result = result.filter(v => v.priceUsd <= maxPrice);
    }
    if (minPrice > 0) {
      result = result.filter(v => v.priceUsd >= minPrice);
    }

    if (minYear > 0) {
      result = result.filter(v => v.year >= minYear);
    }

    if (maxMileage > 0 && condition !== '0km') {
      result = result.filter(v => v.mileage <= maxMileage);
    }

    // Búsqueda inteligente
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const tokens = q.split(/\s+/);
      result = result.filter(v => {
        const fullText = `${v.brand} ${v.model} ${v.version || ''} ${v.category} ${v.bodyType} ${v.fuel} ${v.transmission} ${v.features.join(' ')}`.toLowerCase();
        return tokens.every(t => fullText.includes(t));
      });
    }

    // Orden
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.priceUsd - b.priceUsd);
        break;
      case 'price_desc':
        result.sort((a, b) => b.priceUsd - a.priceUsd);
        break;
      case 'year_desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'mileage_asc':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'views_desc':
        result.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
        break;
      default:
        break;
    }

    return result;
  }, [category, brand, condition, transmission, fuel, minPrice, maxPrice, minYear, maxMileage, searchQuery, sortBy]);

  const resetFilters = () => {
    setCategory('all');
    setBrand('all');
    setMinPrice(0);
    setMaxPrice(100000);
    setMinYear(2018);
    setMaxMileage(150000);
    setTransmission('all');
    setFuel('all');
    setCondition('all');
    setSearchQuery('');
    setSortBy('featured');
    router.push('/catalogo');
  };

  const activeFiltersCount = [
    category !== 'all',
    brand !== 'all',
    transmission !== 'all',
    fuel !== 'all',
    condition !== 'all',
    maxPrice < 100000,
    searchQuery.trim() !== ''
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header del Catálogo */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Catálogo de Vehículos</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explorá nuestro inventario de autos usados seleccionados, eléctricos 0km, todoterrenos y motos.
          </p>
        </div>

        {/* Buscador Rápido y Botón Filtros Móvil */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por marca, modelo o versión..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center space-x-1.5 shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4 text-sky-400" />
            <span>Filtros ({activeFiltersCount})</span>
          </button>
        </div>
      </div>

      {/* Tabs Rápidos de Categoría Superior */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => { setCategory('all'); setBrand('all'); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            category === 'all'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Todas las Unidades ({INITIAL_VEHICLES.length})
        </button>

        <button
          onClick={() => { setCategory('Usados Seleccionados'); setBrand('all'); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
            category === 'Usados Seleccionados'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Car className="w-3.5 h-3.5" />
          <span>Usados Seleccionados</span>
        </button>

        <button
          onClick={() => { setCategory('Eléctricos 0km'); setBrand('all'); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
            category === 'Eléctricos 0km'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Eléctricos 0km</span>
        </button>

        <button
          onClick={() => { setCategory('Usadas Seleccionadas'); setBrand('all'); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
            category === 'Usadas Seleccionadas'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>🏍</span>
          <span>Motos Seleccionadas</span>
        </button>

        <button
          onClick={() => { setCategory('Todoterreno'); setBrand('all'); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
            category === 'Todoterreno'
              ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Todoterreno y 4x4</span>
        </button>
      </div>

      {/* Grid Principal: Filtros Laterales + Grilla de Autos */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* BARRA LATERAL DE FILTROS (Desktop) */}
        <aside className="hidden lg:block space-y-6 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 h-fit sticky top-24">
          
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center">
              <Filter className="w-4 h-4 mr-2 text-sky-400" />
              Filtros Avanzados
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-sky-400 hover:underline flex items-center"
              >
                <RotateCcw className="w-3 h-3 mr-1" /> Limpiar
              </button>
            )}
          </div>

          {/* Filtro por Marca */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase block mb-2">Marca</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-slate-950 text-white text-xs rounded-xl p-2.5 border border-slate-800 focus:border-sky-500"
            >
              <option value="all">Todas las Marcas ({availableBrands.length})</option>
              {availableBrands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Filtro por Rango de Precio USD */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase">Precio Máximo</label>
              <span className="text-xs font-bold text-sky-400">USD {maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={8000}
              max={100000}
              step={2000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>USD 8.000</span>
              <span>USD 100.000+</span>
            </div>
          </div>

          {/* Filtro por Transmisión */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase block mb-2">Transmisión</label>
            <div className="grid grid-cols-2 gap-2">
              {['all', 'Manual', 'Automática'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTransmission(t)}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    transmission === t
                      ? 'bg-sky-600 border-sky-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {t === 'all' ? 'Todas' : t}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro por Combustible */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase block mb-2">Combustible</label>
            <select
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              className="w-full bg-slate-950 text-white text-xs rounded-xl p-2.5 border border-slate-800 focus:border-sky-500"
            >
              <option value="all">Todos los Combustibles</option>
              <option value="Nafta">Nafta</option>
              <option value="Diésel">Diésel</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Eléctrico">100% Eléctrico</option>
            </select>
          </div>

          {/* Filtro por Condición */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase block mb-2">Condición</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: 'Todos', val: 'all' },
                { label: 'Usados', val: 'Usado Seleccionado' },
                { label: '0KM', val: '0km' }
              ].map((c) => (
                <button
                  key={c.val}
                  type="button"
                  onClick={() => setCondition(c.val)}
                  className={`py-1.5 text-[11px] font-semibold rounded-lg border transition-colors ${
                    condition === c.val
                      ? 'bg-sky-600 border-sky-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro por Año Mínimo */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase">Año Mínimo</label>
              <span className="text-xs font-bold text-white">{minYear}</span>
            </div>
            <input
              type="range"
              min={2018}
              max={2025}
              step={1}
              value={minYear}
              onChange={(e) => setMinYear(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

        </aside>

        {/* CONTENIDO PRINCIPAL: Resultados y Grilla */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Barra de Ordenamiento y Conteo */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
            <p className="text-slate-300">
              Mostrando <strong className="text-white">{filteredVehicles.length}</strong> de {INITIAL_VEHICLES.length} vehículos disponibles
            </p>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <span className="text-slate-400 font-medium">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 text-white rounded-xl px-3 py-1.5 border border-slate-800 focus:border-sky-500 font-semibold"
              >
                <option value="featured">Destacados Carvlak</option>
                <option value="price_asc">Menor Precio (USD)</option>
                <option value="price_desc">Mayor Precio (USD)</option>
                <option value="year_desc">Más Nuevos (Año)</option>
                <option value="mileage_asc">Menor Kilometraje</option>
                <option value="views_desc">Más Vistos</option>
              </select>
            </div>
          </div>

          {/* Grilla de Vehículos */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <Car className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No encontramos vehículos con esos filtros exactos</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Probá ampliando el rango de precio o año, o consultale a nuestro Asesor IA para que busque alternativas en stock.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-500 transition-colors"
              >
                Restablecer Filtros
              </button>
            </div>
          )}

        </div>

      </div>

      {/* MODAL MÓVIL DE FILTROS */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-slate-900 h-full p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Filtros</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Marca</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl p-2.5 border border-slate-800"
              >
                <option value="all">Todas las Marcas</option>
                {availableBrands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Precio Máx:</span>
                <span className="font-bold text-sky-400">USD {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={8000}
                max={100000}
                step={2000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg accent-sky-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Transmisión</label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl p-2.5 border border-slate-800"
              >
                <option value="all">Todas</option>
                <option value="Manual">Manual</option>
                <option value="Automática">Automática</option>
              </select>
            </div>

            <div className="pt-4 flex space-x-2">
              <button
                onClick={resetFilters}
                className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Limpiar
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold"
              >
                Ver ({filteredVehicles.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
