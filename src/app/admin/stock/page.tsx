'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Car, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  ArrowLeft, 
  X,
  Sparkles
} from 'lucide-react';
import { INITIAL_VEHICLES } from '@/data/initialStock';
import { Vehicle, VehicleStatus } from '@/types';
import { StockService } from '@/lib/stockService';

export default function AdminStockPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([...INITIAL_VEHICLES]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const [form, setForm] = useState({
    brand: '',
    model: '',
    version: '',
    category: 'Usados Seleccionados',
    year: 2022,
    mileage: 35000,
    priceUsd: 18000,
    transmission: 'Automática',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'SUV',
    engine: '1.6 16v',
    powerHp: 120,
    status: 'DISPONIBLE' as VehicleStatus,
    image1: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
    featuresText: 'Climatizador, Cámara de reversa, Llantas de aleación, Bluetooth'
  });

  const filtered = vehicles.filter(v => 
    `${v.brand} ${v.model} ${v.category} ${v.year}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = (id: string, newStatus: VehicleStatus) => {
    StockService.updateVehicle(id, { status: newStatus });
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este vehículo del inventario?')) {
      StockService.deleteVehicle(id);
      setVehicles(prev => prev.filter(v => v.id !== id));
    }
  };

  const handleOpenCreate = () => {
    setEditingVehicle(null);
    setForm({
      brand: '',
      model: '',
      version: '',
      category: 'Usados Seleccionados',
      year: 2022,
      mileage: 35000,
      priceUsd: 18000,
      transmission: 'Automática',
      fuel: 'Nafta',
      condition: 'Usado Seleccionado',
      bodyType: 'SUV',
      engine: '1.6 16v',
      powerHp: 120,
      status: 'DISPONIBLE',
      image1: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
      featuresText: 'Climatizador, Cámara de reversa, Llantas de aleación, Bluetooth'
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const features = form.featuresText.split(',').map(s => s.trim()).filter(Boolean);
    const images = [form.image1];

    if (editingVehicle) {
      const updated = StockService.updateVehicle(editingVehicle.id, {
        brand: form.brand,
        model: form.model,
        version: form.version,
        category: form.category as any,
        year: Number(form.year),
        mileage: Number(form.mileage),
        priceUsd: Number(form.priceUsd),
        transmission: form.transmission as any,
        fuel: form.fuel as any,
        status: form.status,
        features,
        images
      });
      if (updated) {
        setVehicles(prev => prev.map(v => v.id === editingVehicle.id ? updated : v));
      }
    } else {
      const created = StockService.createVehicle({
        brand: form.brand,
        model: form.model,
        version: form.version,
        category: form.category as any,
        year: Number(form.year),
        mileage: Number(form.mileage),
        priceUsd: Number(form.priceUsd),
        transmission: form.transmission as any,
        fuel: form.fuel as any,
        status: form.status,
        features,
        images
      });
      setVehicles(prev => [created, ...prev]);
    }

    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 space-y-8">
      
      {/* Barra Superior */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <Link href="/admin" className="text-xs text-slate-400 hover:text-white flex items-center mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Volver al Dashboard</span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">Gestión de Stock de Vehículos</h1>
          <p className="text-xs text-slate-400">Alta, modificación de precios, fotos y estado de unidades.</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-600/30 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Cargar Nuevo Vehículo</span>
        </button>
      </div>

      {/* Buscador */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar vehículo por marca, modelo o categoría..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
        />
      </div>

      {/* Tabla de Inventario */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Vehículo</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Año / Km</th>
                <th className="p-4">Precio (USD)</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={v.images[0]}
                        alt={v.model}
                        className="w-12 h-10 rounded-lg object-cover bg-slate-950 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-white">{v.brand} {v.model}</p>
                        <p className="text-[11px] text-slate-400">{v.version || '-'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{v.category}</td>
                  <td className="p-4">
                    {v.year} • {v.mileage === 0 ? '0km' : `${v.mileage.toLocaleString()} km`}
                  </td>
                  <td className="p-4 font-black text-white">USD {v.priceUsd.toLocaleString()}</td>
                  <td className="p-4">
                    <select
                      value={v.status}
                      onChange={(e) => handleStatusChange(v.id, e.target.value as VehicleStatus)}
                      className={`text-xs font-bold rounded-lg px-2.5 py-1 border transition-colors ${
                        v.status === 'DISPONIBLE'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : v.status === 'RESERVADO'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                      }`}
                    >
                      <option value="DISPONIBLE" className="bg-slate-900 text-white">DISPONIBLE</option>
                      <option value="RESERVADO" className="bg-slate-900 text-white">RESERVADO (SEÑADO)</option>
                      <option value="VENDIDO" className="bg-slate-900 text-white">VENDIDO</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/vehiculo/${v.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                        title="Ver en web"
                      >
                        <Car className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Crear / Editar Vehículo */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
              <h3 className="text-lg font-bold text-white">Cargar Vehículo al Stock</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Marca *</label>
                  <input
                    type="text"
                    required
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                    placeholder="Ej: Toyota, Fiat, Dongfeng..."
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Modelo *</label>
                  <input
                    type="text"
                    required
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                    placeholder="Ej: Hilux, Cronos, Box EV..."
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Versión</label>
                  <input
                    type="text"
                    value={form.version}
                    onChange={(e) => setForm({ ...form, version: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                    placeholder="Ej: SRV 4x4, Precision AT..."
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Categoría *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                  >
                    <option value="Usados Seleccionados">Usados Seleccionados</option>
                    <option value="Eléctricos 0km">Eléctricos 0km</option>
                    <option value="Usadas Seleccionadas">Usadas Seleccionadas (Motos)</option>
                    <option value="Todoterreno">Todoterreno y 4x4</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Año *</label>
                  <input
                    type="number"
                    required
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Kilómetros (0 para 0km) *</label>
                  <input
                    type="number"
                    required
                    value={form.mileage}
                    onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Precio Contado (USD) *</label>
                  <input
                    type="number"
                    required
                    value={form.priceUsd}
                    onChange={(e) => setForm({ ...form, priceUsd: Number(e.target.value) })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Transmisión</label>
                  <select
                    value={form.transmission}
                    onChange={(e) => setForm({ ...form, transmission: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                  >
                    <option value="Automática">Automática</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Combustible</label>
                  <select
                    value={form.fuel}
                    onChange={(e) => setForm({ ...form, fuel: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                  >
                    <option value="Nafta">Nafta</option>
                    <option value="Diésel">Diésel</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Eléctrico">Eléctrico</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Estado de Inventario</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                  >
                    <option value="DISPONIBLE">DISPONIBLE</option>
                    <option value="RESERVADO">RESERVADO (SEÑADO)</option>
                    <option value="VENDIDO">VENDIDO</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">URL de Foto Principal</label>
                <input
                  type="url"
                  value={form.image1}
                  onChange={(e) => setForm({ ...form, image1: e.target.value })}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Equipamiento (Separado por comas)</label>
                <input
                  type="text"
                  value={form.featuresText}
                  onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800"
                  placeholder="Climatizador, Cuero, Techo panorámico..."
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
                >
                  Guardar en Catálogo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
