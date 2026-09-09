export type CategoryType = 
  | 'Usados Seleccionados'
  | 'Eléctricos 0km'
  | 'Usadas Seleccionadas'
  | 'Todoterreno';

export type FuelType = 'Nafta' | 'Diésel' | 'Híbrido' | 'Eléctrico';
export type TransmissionType = 'Manual' | 'Automática';
export type VehicleStatus = 'DISPONIBLE' | 'RESERVADO' | 'VENDIDO';

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version?: string;
  category: CategoryType;
  year: number;
  mileage: number;
  priceUsd: number;
  transmission: TransmissionType;
  fuel: FuelType;
  condition: '0km' | 'Usado Seleccionado';
  bodyType: string;
  location: string;
  engine?: string;
  powerHp?: number;
  doors?: number;
  colorExterior?: string;
  colorInterior?: string;
  features: string[];
  images: string[];
  status: VehicleStatus;
  isFeatured?: boolean;
  viewsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface VehicleFilterParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxMileage?: number;
  transmission?: string;
  fuel?: string;
  condition?: string;
  query?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'year_desc' | 'mileage_asc' | 'views_desc';
}

export interface Reservation {
  id: string;
  reservationNumber: string;
  vehicleId: string;
  vehicle?: Vehicle;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerDocType: string;
  customerDocNumber: string;
  customerAddress?: string;
  depositAmountUsd: number;
  paymentMethod: 'MERCADO_PAGO' | 'TRANSFERENCIA' | 'TARJETA_SANDBOX';
  paymentStatus: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO' | 'EXPIRADO';
  transferReceiptUrl?: string;
  contractTermsAccepted: boolean;
  notes?: string;
  expiresAt: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  type: 'CONSULTA' | 'TEST_DRIVE' | 'FINANCIACION' | 'TRADE_IN';
  vehicleId?: string;
  vehicle?: Vehicle;
  name: string;
  email: string;
  phone: string;
  message?: string;
  preferredDate?: string;
  tradeInData?: TradeInResult;
  status: 'NUEVO' | 'CONTACTADO' | 'EN_NEGOCIACION' | 'CERRADO';
  createdAt: string;
}

export interface FinancingPlan {
  id: string;
  bankName: string;
  minDownPaymentPercent: number;
  maxTermMonths: number;
  annualInterestRate: number; // TEA %
  description?: string;
  requirements?: string[];
  isActive: boolean;
}

export interface TradeInForm {
  brand: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  transmission: TransmissionType;
  fuel: FuelType;
  bodyCondition: 'Excelente' | 'Bueno' | 'Detalles menores' | 'Regular';
  hasOfficialService: boolean;
  interestedVehicleId?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  comments?: string;
  photoUrls?: string[];
}

export interface TradeInResult {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  estimatedValueMin: number;
  estimatedValueMax: number;
  marketReferencePrice: number;
  differenceToPay?: number;
  leadId?: string;
}

export interface AdvisorMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  suggestedVehicles?: Vehicle[];
  actionLink?: string;
  timestamp: string;
}
