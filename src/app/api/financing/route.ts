import { NextResponse } from 'next/server';
import { StockService } from '@/lib/stockService';
import { FINANCING_PLANS } from '@/data/initialStock';

export async function GET() {
  return NextResponse.json({
    plans: FINANCING_PLANS
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { priceUsd, downPaymentAmount, termMonths, planId } = body;

    if (!priceUsd || downPaymentAmount === undefined || !termMonths) {
      return NextResponse.json({ error: 'Parámetros incompletos' }, { status: 400 });
    }

    const simulation = StockService.simulateFinancing(
      Number(priceUsd),
      Number(downPaymentAmount),
      Number(termMonths),
      planId
    );

    return NextResponse.json(simulation);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error en la simulación' }, { status: 500 });
  }
}
