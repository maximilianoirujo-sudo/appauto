import { Vehicle, VehicleFilterParams, Reservation, Lead, FinancingPlan, TradeInForm, TradeInResult } from '../types';
import { INITIAL_VEHICLES, FINANCING_PLANS } from '../data/initialStock';

// Memoria volátil / caché local para garantizar funcionamiento inmediato
let vehiclesStore: Vehicle[] = [...INITIAL_VEHICLES];
let reservationsStore: Reservation[] = [];
let leadsStore: Lead[] = [
  {
    id: 'lead-001',
    type: 'TEST_DRIVE',
    vehicleId: 'crv-002',
    name: 'Martín Rodríguez',
    email: 'martin.rodriguez@gmail.com',
    phone: '+598 99 876 543',
    message: 'Hola, quisiera agendar un test drive del Toyota Corolla Híbrido este sábado por la mañana.',
    preferredDate: '2026-09-06T11:00:00Z',
    status: 'NUEVO',
    createdAt: new Date().toISOString()
  },
  {
    id: 'lead-002',
    type: 'TRADE_IN',
    vehicleId: 'crv-006',
    name: 'Carolina Varela',
    email: 'caro.varela@outlook.com',
    phone: '+598 94 321 987',
    message: 'Quiero entregar mi Chevrolet Onix 2018 como parte de pago de la Nissan Kicks.',
    tradeInData: {
      brand: 'Chevrolet',
      model: 'Onix Joy',
      year: 2018,
      mileage: 65000,
      estimatedValueMin: 9200,
      estimatedValueMax: 10400,
      marketReferencePrice: 11000,
      differenceToPay: 14400
    },
    status: 'CONTACTADO',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

export const StockService = {
  // Obtener vehículos con filtros avanzados y búsqueda en lenguaje natural
  getVehicles(filters: VehicleFilterParams = {}): { vehicles: Vehicle[]; total: number } {
    let result = [...vehiclesStore];

    // Filtro por categoría
    if (filters.category && filters.category !== 'all') {
      result = result.filter(v => 
        v.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }

    // Filtro por marca
    if (filters.brand && filters.brand !== 'all') {
      result = result.filter(v => v.brand.toLowerCase() === filters.brand!.toLowerCase());
    }

    // Filtro por condición (0km / Usado)
    if (filters.condition && filters.condition !== 'all') {
      result = result.filter(v => v.condition.toLowerCase() === filters.condition!.toLowerCase());
    }

    // Filtro por transmisión
    if (filters.transmission && filters.transmission !== 'all') {
      result = result.filter(v => v.transmission.toLowerCase() === filters.transmission!.toLowerCase());
    }

    // Filtro por combustible
    if (filters.fuel && filters.fuel !== 'all') {
      result = result.filter(v => v.fuel.toLowerCase() === filters.fuel!.toLowerCase());
    }

    // Filtro por precio
    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      result = result.filter(v => v.priceUsd >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      result = result.filter(v => v.priceUsd <= filters.maxPrice!);
    }

    // Filtro por año
    if (filters.minYear !== undefined && filters.minYear > 0) {
      result = result.filter(v => v.year >= filters.minYear!);
    }
    if (filters.maxYear !== undefined && filters.maxYear > 0) {
      result = result.filter(v => v.year <= filters.maxYear!);
    }

    // Filtro por kilometraje máximo
    if (filters.maxMileage !== undefined && filters.maxMileage > 0) {
      result = result.filter(v => v.mileage <= filters.maxMileage!);
    }

    // Búsqueda en lenguaje natural (ej: "SUV automática hasta 25000", "eléctrico 0km", "moto")
    if (filters.query && filters.query.trim() !== '') {
      const q = filters.query.toLowerCase().trim();
      const tokens = q.split(/\s+/);

      result = result.filter(v => {
        const fullText = `${v.brand} ${v.model} ${v.version || ''} ${v.category} ${v.bodyType} ${v.fuel} ${v.transmission} ${v.features.join(' ')}`.toLowerCase();
        
        // Interpretar intenciones de lenguaje natural
        if (q.includes('suv') && v.bodyType.toLowerCase() !== 'suv') return false;
        if (q.includes('moto') && v.category !== 'Usadas Seleccionadas') return false;
        if (q.includes('electrico') || q.includes('eléctrico')) {
          if (v.fuel !== 'Eléctrico') return false;
        }
        if (q.includes('hibrido') || q.includes('híbrido')) {
          if (v.fuel !== 'Híbrido') return false;
        }
        if (q.includes('automatico') || q.includes('automática') || q.includes('automatica')) {
          if (v.transmission !== 'Automática') return false;
        }
        if (q.includes('manual')) {
          if (v.transmission !== 'Manual') return false;
        }
        if (q.includes('0km') || q.includes('nuevo')) {
          if (v.condition !== '0km') return false;
        }

        // Match general de tokens
        return tokens.some(token => fullText.includes(token));
      });
    }

    // Ordenamiento
    if (filters.sortBy) {
      switch (filters.sortBy) {
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
    }

    return {
      vehicles: result,
      total: result.length
    };
  },

  getVehicleBySlug(slug: string): Vehicle | null {
    const vehicle = vehiclesStore.find(v => v.slug === slug || v.id === slug);
    if (vehicle) {
      vehicle.viewsCount = (vehicle.viewsCount || 0) + 1;
      return vehicle;
    }
    return null;
  },

  getSimilarVehicles(vehicleId: string, limit = 3): Vehicle[] {
    const target = vehiclesStore.find(v => v.id === vehicleId);
    if (!target) return vehiclesStore.slice(0, limit);

    return vehiclesStore
      .filter(v => v.id !== target.id)
      .filter(v => v.category === target.category || Math.abs(v.priceUsd - target.priceUsd) < 15000)
      .slice(0, limit);
  },

  createVehicle(data: Partial<Vehicle>): Vehicle {
    const id = `crv-${Date.now().toString().slice(-4)}`;
    const slug = `${data.brand}-${data.model}-${data.year}-${Date.now().toString().slice(-3)}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');

    const newVehicle: Vehicle = {
      id,
      slug,
      brand: data.brand || 'Marca',
      model: data.model || 'Modelo',
      version: data.version || '',
      category: data.category || 'Usados Seleccionados',
      year: Number(data.year) || new Date().getFullYear(),
      mileage: Number(data.mileage) || 0,
      priceUsd: Number(data.priceUsd) || 10000,
      transmission: data.transmission || 'Automática',
      fuel: data.fuel || 'Nafta',
      condition: Number(data.mileage) === 0 ? '0km' : 'Usado Seleccionado',
      bodyType: data.bodyType || 'SUV',
      location: data.location || 'Showroom Carrasco, Montevideo',
      engine: data.engine || '',
      powerHp: Number(data.powerHp) || 120,
      doors: Number(data.doors) || 4,
      colorExterior: data.colorExterior || 'Gris',
      colorInterior: data.colorInterior || 'Negro',
      features: Array.isArray(data.features) ? data.features : ['Climatizador', 'Bluetooth'],
      images: Array.isArray(data.images) && data.images.length > 0 ? data.images : [
        'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80'
      ],
      status: data.status || 'DISPONIBLE',
      isFeatured: Boolean(data.isFeatured),
      viewsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    vehiclesStore.unshift(newVehicle);
    return newVehicle;
  },

  updateVehicle(id: string, data: Partial<Vehicle>): Vehicle | null {
    const index = vehiclesStore.findIndex(v => v.id === id);
    if (index === -1) return null;

    vehiclesStore[index] = {
      ...vehiclesStore[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return vehiclesStore[index];
  },

  deleteVehicle(id: string): boolean {
    const prevLen = vehiclesStore.length;
    vehiclesStore = vehiclesStore.filter(v => v.id !== id);
    return vehiclesStore.length < prevLen;
  },

  // Reservas de vehículos
  createReservation(reservationData: {
    vehicleId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerDocType: string;
    customerDocNumber: string;
    customerAddress?: string;
    depositAmountUsd?: number;
    paymentMethod: 'MERCADO_PAGO' | 'TRANSFERENCIA' | 'TARJETA_SANDBOX';
    transferReceiptUrl?: string;
  }): Reservation {
    const vehicle = vehiclesStore.find(v => v.id === reservationData.vehicleId);
    if (!vehicle) {
      throw new Error('Vehículo no encontrado');
    }

    const reservationNumber = `CRV-RES-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const expiresAt = new Date(Date.now() + 72 * 3600 * 1000).toISOString(); // 72 horas de validez

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      reservationNumber,
      vehicleId: vehicle.id,
      vehicle,
      customerName: reservationData.customerName,
      customerEmail: reservationData.customerEmail,
      customerPhone: reservationData.customerPhone,
      customerDocType: reservationData.customerDocType,
      customerDocNumber: reservationData.customerDocNumber,
      customerAddress: reservationData.customerAddress,
      depositAmountUsd: reservationData.depositAmountUsd || 500,
      paymentMethod: reservationData.paymentMethod,
      paymentStatus: reservationData.paymentMethod === 'TARJETA_SANDBOX' ? 'APROBADO' : 'PENDIENTE',
      transferReceiptUrl: reservationData.transferReceiptUrl,
      contractTermsAccepted: true,
      expiresAt,
      createdAt: new Date().toISOString()
    };

    // Marcar el vehículo como RESERVADO para bloquearlo
    vehicle.status = 'RESERVADO';

    reservationsStore.unshift(newReservation);
    return newReservation;
  },

  getReservations(): Reservation[] {
    return reservationsStore.map(r => ({
      ...r,
      vehicle: vehiclesStore.find(v => v.id === r.vehicleId)
    }));
  },

  // Leads
  createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'NUEVO',
      createdAt: new Date().toISOString()
    };
    leadsStore.unshift(newLead);
    return newLead;
  },

  getLeads(): Lead[] {
    return leadsStore.map(l => ({
      ...l,
      vehicle: l.vehicleId ? vehiclesStore.find(v => v.id === l.vehicleId) : undefined
    }));
  },

  updateLeadStatus(id: string, status: Lead['status']): Lead | null {
    const lead = leadsStore.find(l => l.id === id);
    if (!lead) return null;
    lead.status = status;
    return lead;
  },

  // Tasador con IA / Curvas de Depreciación de Mercado Uruguayo
  calculateTradeIn(data: TradeInForm): TradeInResult {
    const currentYear = new Date().getFullYear();
    const age = Math.max(0, currentYear - data.year);
    
    // Precio base de mercado de referencia en Uruguay (estimado promedio)
    let baseRef = 24000;
    const premiumBrands = ['BMW', 'Audi', 'Mercedes-Benz', 'Jeep'];
    const standardBrands = ['Toyota', 'Volkswagen', 'Honda', 'Nissan', 'Hyundai'];
    
    if (premiumBrands.includes(data.brand)) {
      baseRef = 45000;
    } else if (standardBrands.includes(data.brand)) {
      baseRef = 26000;
    } else {
      baseRef = 18000;
    }

    // Curva de depreciación anualizada: 15% primer año, 8% subsecuentes
    let depreciated = baseRef;
    if (age > 0) {
      depreciated *= 0.82; // primer año
      for (let i = 1; i < age; i++) {
        depreciated *= 0.91; // años siguientes
      }
    }

    // Ajuste por kilometraje (promedio 15.000 km por año)
    const expectedKm = Math.max(10000, age * 15000);
    const kmDiff = data.mileage - expectedKm;
    if (kmDiff > 0) {
      depreciated *= Math.max(0.75, 1 - (kmDiff / 100000) * 0.1);
    } else if (kmDiff < 0) {
      depreciated *= Math.min(1.15, 1 + (Math.abs(kmDiff) / 100000) * 0.05);
    }

    // Ajuste por estado de carrocería
    if (data.bodyCondition === 'Excelente') depreciated *= 1.05;
    if (data.bodyCondition === 'Detalles menores') depreciated *= 0.92;
    if (data.bodyCondition === 'Regular') depreciated *= 0.80;

    // Service oficial comprobable
    if (data.hasOfficialService) depreciated *= 1.04;

    const retailPrice = Math.round(depreciated / 100) * 100;
    // Rango de toma Carvlak para trade-in (margen comercial + reacondicionamiento)
    const estimatedValueMin = Math.round((retailPrice * 0.83) / 100) * 100;
    const estimatedValueMax = Math.round((retailPrice * 0.90) / 100) * 100;

    let differenceToPay: number | undefined;
    if (data.interestedVehicleId) {
      const targetVehicle = vehiclesStore.find(v => v.id === data.interestedVehicleId);
      if (targetVehicle) {
        differenceToPay = Math.max(0, targetVehicle.priceUsd - estimatedValueMax);
      }
    }

    const tradeInResult: TradeInResult = {
      brand: data.brand,
      model: data.model,
      year: data.year,
      mileage: data.mileage,
      marketReferencePrice: retailPrice,
      estimatedValueMin,
      estimatedValueMax,
      differenceToPay
    };

    // Crear lead automáticamente en el CRM
    const newLead = this.createLead({
      type: 'TRADE_IN',
      vehicleId: data.interestedVehicleId,
      name: data.contactName,
      email: data.contactEmail,
      phone: data.contactPhone,
      message: `Tasación de usado: ${data.brand} ${data.model} ${data.year} (${data.mileage} km). Estado: ${data.bodyCondition}. ${data.comments || ''}`,
      tradeInData: tradeInResult
    });

    tradeInResult.leadId = newLead.id;
    return tradeInResult;
  },

  // Simulador de Financiación
  simulateFinancing(priceUsd: number, downPaymentAmount: number, termMonths: number, planId?: string) {
    const loanAmount = Math.max(0, priceUsd - downPaymentAmount);
    const plan = FINANCING_PLANS.find(p => p.id === planId) || FINANCING_PLANS[0];
    
    // Cálculo de cuota sistema francés mensual
    const monthlyRate = (plan.annualInterestRate / 100) / 12;
    const monthlyInstallment = loanAmount > 0 
      ? Math.round((loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths)))
      : 0;

    const totalPaid = (monthlyInstallment * termMonths) + downPaymentAmount;
    const totalInterest = Math.max(0, totalPaid - priceUsd);

    return {
      priceUsd,
      downPaymentAmount,
      downPaymentPercent: Math.round((downPaymentAmount / priceUsd) * 100),
      loanAmount,
      termMonths,
      plan,
      monthlyInstallment,
      totalPaid,
      totalInterest
    };
  }
};
