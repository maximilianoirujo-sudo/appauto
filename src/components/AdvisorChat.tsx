'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, X, Send, Bot, Sparkles, ChevronRight, Phone, RefreshCw } from 'lucide-react';
import { AdvisorMessage, Vehicle } from '../types';

export default function AdvisorChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<AdvisorMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡Hola! Soy el Asesor Inteligente de CARVLAK. Consulto nuestro stock real en vivo. Contame qué tipo de vehículo estás buscando, tu presupuesto o el uso que le vas a dar (ciudad, familia, todoterreno, 0km eléctrico) y te muestro las mejores opciones disponibles.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isLoading) return;

    const userMsg: AdvisorMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText })
      });

      const data = await res.json();

      const botMsg: AdvisorMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.message || 'Disculpá, tuve una breve interrupción. ¿Podrías reiterar tu consulta?',
        suggestedVehicles: data.suggestedVehicles,
        actionLink: data.whatsappLink,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: 'Pude conectarme con el inventario, pero te invito a escribirnos directamente a nuestro WhatsApp oficial para atención personalizada inmediata.',
          actionLink: 'https://wa.me/59899123456?text=Hola%20Carvlak,%20quisiera%20consultar%20por%20un%20veh%C3%ADculo',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'SUV familiar hasta 25.000 USD',
    '¿Qué eléctricos 0km tienen?',
    'Motos seleccionadas',
    '¿Cómo funciona la seña de USD 500?',
    'Quiero tasar mi auto usado'
  ];

  return (
    <>
      {/* Botón flotante persistente */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-sky-600 via-blue-600 to-sky-500 text-white shadow-2xl shadow-sky-500/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        aria-label="Asesor IA Carvlak"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
        </span>
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs pl-0 group-hover:pl-2">
          Asesor IA Carvlak
        </span>
      </button>

      {/* Modal / Ventana de Chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[640px] h-[80vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header del Chat */}
          <div className="bg-slate-900 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-bold text-white text-sm">Asesor Carvlak IA</h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    Stock en vivo
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                  Conectado a inventario real
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-tr-none shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Tarjetas de vehículos sugeridos dentro del chat */}
                  {msg.suggestedVehicles && msg.suggestedVehicles.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-slate-800/80">
                      <p className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                        Unidades disponibles sugeridas:
                      </p>
                      {msg.suggestedVehicles.map((v) => (
                        <div
                          key={v.id}
                          className="bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-3 hover:border-sky-500/40 transition-colors"
                        >
                          <img
                            src={v.images[0]}
                            alt={v.model}
                            className="w-14 h-14 object-cover rounded-lg shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white truncate">
                              {v.brand} {v.model} ({v.year})
                            </p>
                            <p className="text-[11px] text-emerald-400 font-semibold">
                              USD {v.priceUsd.toLocaleString()}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">
                              {v.transmission} • {v.fuel}
                            </p>
                          </div>
                          <Link
                            href={`/vehiculo/${v.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-colors shrink-0"
                            title="Ver ficha"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Enlace de acción rápida / WhatsApp */}
                  {msg.actionLink && (
                    <div className="mt-3 pt-2">
                      <a
                        href={msg.actionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-md transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Continuar por WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-xs text-sky-400 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Consultando inventario en tiempo real...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chips de preguntas frecuentes */}
          <div className="px-3 py-2 bg-slate-900/90 border-t border-slate-800/80 overflow-x-auto scrollbar-none flex space-x-2">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Formulario de Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ej: Busco una SUV automática hasta USD 22k..."
              className="flex-1 bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-sky-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
