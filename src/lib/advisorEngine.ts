import { StockService } from './stockService';
import { Vehicle } from '../types';

export interface AdvisorResponse {
  message: string;
  suggestedVehicles: Vehicle[];
  whatsappLink?: string;
  actionType?: 'VIEW_CATALOG' | 'SIMULATE_FINANCING' | 'TRADE_IN' | 'BOOK_VISIT';
}

export async function processAdvisorMessage(userMessage: string): Promise<AdvisorResponse> {
  const q = userMessage.toLowerCase().trim();
  const allStock = StockService.getVehicles().vehicles;

  // 1. Detección de intenciones directas de servicios
  if (q.includes('tasar') || q.includes('tasacion') || q.includes('tomar mi auto') || q.includes('parte de pago')) {
    return {
      message: '¡Excelente! En CARVLAK tomamos tu vehículo usado como parte de pago. Podés usar nuestro tasador online interactivo para obtener un rango de cotización referencial en el acto y entregarlo como entrega inicial de tu próximo auto.',
      suggestedVehicles: [],
      actionType: 'TRADE_IN',
      whatsappLink: 'https://wa.me/59899123456?text=Hola%20Carvlak,%20quisiera%20tasar%20mi%20veh%C3%ADculo%20usado'
    };
  }

  if (q.includes('financiar') || q.includes('financiacion') || q.includes('cuotas') || q.includes('banco') || q.includes('prestamo')) {
    return {
      message: 'Contamos con convenios directos con Santander, BBVA, Itaú, Scotiabank y además Crédito de la Casa Carvlak con aprobación en 24 horas y hasta en 60 cuotas. Podés usar nuestro simulador para ver la cuota exacta de cualquier unidad de nuestro inventario.',
      suggestedVehicles: allStock.slice(0, 2),
      actionType: 'SIMULATE_FINANCING',
      whatsappLink: 'https://wa.me/59899123456?text=Hola%20Carvlak,%20quisiera%20consultar%20opciones%20de%20financiaci%C3%B3n'
    };
  }

  if (q.includes('donde estan') || q.includes('ubicacion') || q.includes('direccion') || q.includes('horario') || q.includes('visitar')) {
    return {
      message: 'Nuestro showroom principal se encuentra en Av. Italia 5420, Carrasco, Montevideo. Abrimos de Lunes a Viernes de 09:00 a 19:00 hs y Sábados de 10:00 a 14:00 hs. Podés agendar una visita o prueba de manejo cuando gustes.',
      suggestedVehicles: [],
      actionType: 'BOOK_VISIT',
      whatsappLink: 'https://wa.me/59899123456?text=Hola%20Carvlak,%20quisiera%20coordinar%20una%20visita%20al%20showroom'
    };
  }

  // 2. Filtrado inteligente de stock según criterios
  let candidates = [...allStock].filter(v => v.status === 'DISPONIBLE');

  // Extracción de presupuesto
  let maxBudget: number | null = null;
  const budgetMatch = q.match(/(?:hasta|presupuesto|menos de|maximo de|tope de)\s*(\d{1,3}(?:\.\d{3})*|\d+)(?:\s*(?:mil|k|usd|dolares|\$))?/i);
  if (budgetMatch) {
    let rawNum = budgetMatch[1].replace(/\./g, '');
    let num = parseInt(rawNum, 10);
    if (q.includes('mil') || q.includes(' k ') || q.endsWith('k')) {
      if (num < 1000) num *= 1000;
    }
    if (num > 2000 && num < 200000) {
      maxBudget = num;
      candidates = candidates.filter(v => v.priceUsd <= maxBudget!);
    }
  }

  // Filtro por tipo o categoría
  if (q.includes('suv')) {
    candidates = candidates.filter(v => v.bodyType.toLowerCase() === 'suv' || v.category === 'Todoterreno');
  } else if (q.includes('moto')) {
    candidates = candidates.filter(v => v.category === 'Usadas Seleccionadas');
  } else if (q.includes('electrico') || q.includes('eléctrico') || q.includes('0km electrico')) {
    candidates = candidates.filter(v => v.fuel === 'Eléctrico');
  } else if (q.includes('hibrido') || q.includes('híbrido')) {
    candidates = candidates.filter(v => v.fuel === 'Híbrido');
  } else if (q.includes('4x4') || q.includes('todoterreno') || q.includes('offroad') || q.includes('camioneta')) {
    candidates = candidates.filter(v => v.category === 'Todoterreno' || v.bodyType === 'Pickup' || v.bodyType === 'SUV');
  } else if (q.includes('sedan') || q.includes('sedán')) {
    candidates = candidates.filter(v => v.bodyType.toLowerCase() === 'sedán');
  } else if (q.includes('hatch') || q.includes('chico') || q.includes('urbano')) {
    candidates = candidates.filter(v => v.bodyType.toLowerCase() === 'hatchback');
  }

  // Filtro por transmisión
  if (q.includes('automatico') || q.includes('automática') || q.includes('automatica')) {
    candidates = candidates.filter(v => v.transmission === 'Automática');
  } else if (q.includes('manual')) {
    candidates = candidates.filter(v => v.transmission === 'Manual');
  }

  // Filtro por marcas mencionadas
  const brandKeywords = [
    'toyota', 'fiat', 'bmw', 'volkswagen', 'audi', 'nissan', 'hyundai',
    'chevrolet', 'dongfeng', 'gwm', 'bestune', 'hudson', 'ktm', 'husqvarna',
    'kawasaki', 'jeep', 'ford', 'suzuki'
  ];
  for (const b of brandKeywords) {
    if (q.includes(b)) {
      candidates = candidates.filter(v => v.brand.toLowerCase() === b);
      break;
    }
  }

  // 3. Selección y construcción de respuesta
  if (candidates.length === 0) {
    // Si el filtro fue muy restrictivo, buscamos las mejores opciones cercanas
    const alternatives = allStock.slice(0, 3);
    return {
      message: `En este momento no tengo un vehículo disponible que cumpla exactamente todos esos requisitos juntos en stock inmediato, pero te recomiendo revisar estas opciones destacadas que se aproximan mucho. ¿Te gustaría que consultemos con el equipo comercial si entra alguna unidad similar esta semana?`,
      suggestedVehicles: alternatives,
      whatsappLink: 'https://wa.me/59899123456?text=Hola%20Carvlak,%20estoy%20buscando%20un%20veh%C3%ADculo%20con%20estas%20caracter%C3%ADsticas:%20' + encodeURIComponent(userMessage)
    };
  }

  // Tomamos hasta 3 vehículos sugeridos
  const selected = candidates.slice(0, 3);
  const names = selected.map(v => `${v.brand} ${v.model} (${v.year}, USD ${v.priceUsd.toLocaleString()})`).join(', ');

  let intro = '';
  if (q.includes('familiar')) {
    intro = `Para uso familiar y confort de viaje, te seleccioné las siguientes unidades con excelente habitabilidad, seguridad y baúl amplio:`;
  } else if (q.includes('ciudad') || q.includes('economico') || q.includes('económico')) {
    intro = `Para moverte en ciudad con bajo consumo y agilidad de estacionamiento, estas opciones son ideales:`;
  } else if (q.includes('electrico') || q.includes('eléctrico')) {
    intro = `Tenemos disponibles estos modelos 100% eléctricos con entrega inmediata y garantía oficial de batería:`;
  } else if (q.includes('moto')) {
    intro = `En nuestra sección de dos ruedas seleccionadas con inspección mecánica completa, tenemos disponibles:`;
  } else {
    intro = `Encontré estas excelentes opciones disponibles en nuestro stock que coinciden con tu búsqueda:`;
  }

  const responseText = `${intro}\n\nPodés revisar la ficha técnica completa de cualquiera de ellos o reservar con una seña protegida para congelar la unidad.`;

  return {
    message: responseText,
    suggestedVehicles: selected,
    whatsappLink: `https://wa.me/59899123456?text=Hola%20Carvlak,%20vi%20estas%20opciones%20en%20el%20asesor%20IA:%20${encodeURIComponent(names)}`
  };
}
