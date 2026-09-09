'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Instagram } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'CONSULTA',
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message
        })
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-500/10 px-3.5 py-1 rounded-full border border-sky-500/20">
          Atención Personalizada
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Contacto & Showroom Montevideo
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Vení a conocer nuestro salón de ventas en Carrasco o comunicate de inmediato con nuestro equipo de asesores comerciales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Información y Canales Directos */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Canales de Comunicación
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Showroom Principal</h4>
                  <p className="text-slate-400 mt-0.5">Av. Italia 5420, Carrasco, Montevideo, Uruguay</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">WhatsApp & Teléfono Comercial</h4>
                  <a href="https://wa.me/59899123456" className="text-emerald-400 font-semibold hover:underline mt-0.5 block">
                    +598 99 123 456
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Correo Electrónico</h4>
                  <p className="text-slate-400 mt-0.5">contacto@carvlak.com.uy</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Horarios de Atención</h4>
                  <p className="text-slate-400 mt-0.5">Lunes a Viernes: 09:00 a 19:00 hs</p>
                  <p className="text-slate-400">Sábados: 10:00 a 14:00 hs</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Redes Sociales</h4>
                  <a 
                    href="https://instagram.com/car.vlak" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pink-400 font-semibold hover:underline mt-0.5 block"
                  >
                    @car.vlak en Instagram
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <a
                href="https://wa.me/59899123456?text=Hola%20Carvlak,%20quisiera%20hacer%20una%20consulta%20general"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-emerald-600/25"
              >
                <Phone className="w-4 h-4" />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>

          </div>
        </div>

        {/* Formulario de Mensaje */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Envianos tu Mensaje
            </h3>

            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">¡Mensaje Enviado con Éxito!</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Gracias por comunicarte con CARVLAK. Un asesor comercial te responderá a la brevedad.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }); }}
                  className="px-5 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Nombre y Apellido *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                    placeholder="Ej: Nicolás Benítez"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">WhatsApp / Celular *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                      placeholder="Ej: 099 234 567"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                      placeholder="ejemplo@correo.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Mensaje o Consulta *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:border-sky-500"
                    placeholder="¿En qué vehículo estás interesado o qué consulta tenés?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-sky-600/30 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Enviando...' : 'Enviar Consulta'}</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* Mapa Showroom Embed Estilizado */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="font-bold text-white text-base">Ubicación del Showroom</h3>
        <p className="text-xs text-slate-400">Av. Italia 5420, Carrasco, Montevideo. Fácil estacionamiento exclusivo para clientes.</p>
        
        <div className="w-full h-72 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative flex items-center justify-center">
          <iframe
            title="Mapa Showroom Carvlak"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src="https://maps.google.com/maps?q=Av.+Italia+5420,+Carrasco,+Montevideo,+Uruguay&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="filter invert-[90%] hue-rotate-180 brightness-95 contrast-90"
          />
        </div>
      </div>

    </div>
  );
}
