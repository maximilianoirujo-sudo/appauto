import { NextResponse } from 'next/server';
import { StockService } from '@/lib/stockService';

export async function GET() {
  try {
    const reservations = StockService.getReservations();
    return NextResponse.json({ reservations });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al obtener reservas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.vehicleId || !body.customerName || !body.customerEmail || !body.customerPhone || !body.customerDocNumber) {
      return NextResponse.json({ error: 'Faltan datos requeridos del comprador o del vehículo' }, { status: 400 });
    }

    const reservation = StockService.createReservation({
      vehicleId: body.vehicleId,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      customerDocType: body.customerDocType || 'CI',
      customerDocNumber: body.customerDocNumber,
      customerAddress: body.customerAddress,
      depositAmountUsd: body.depositAmountUsd || 500,
      paymentMethod: body.paymentMethod || 'MERCADO_PAGO',
      transferReceiptUrl: body.transferReceiptUrl
    });

    return NextResponse.json({
      success: true,
      reservation,
      message: '¡Reserva confirmada con éxito! La unidad ha quedado bloqueada a tu nombre por 72 horas.'
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al procesar reserva' }, { status: 500 });
  }
}
