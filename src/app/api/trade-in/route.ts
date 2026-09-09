import { NextResponse } from 'next/server';
import { StockService } from '@/lib/stockService';
import { TradeInForm } from '@/types';

export async function POST(request: Request) {
  try {
    const data: TradeInForm = await request.json();

    if (!data.brand || !data.model || !data.year || !data.mileage || !data.contactPhone) {
      return NextResponse.json(
        { error: 'Por favor complete todos los datos requeridos del vehículo y de contacto' },
        { status: 400 }
      );
    }

    const valuationResult = StockService.calculateTradeIn(data);

    return NextResponse.json({
      success: true,
      valuation: valuationResult,
      message: 'Tasación referencial calculada con éxito. Un asesor comercial se pondrá en contacto para validar la inspección presencial.'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al calcular tasación' }, { status: 500 });
  }
}
