import { NextResponse } from 'next/server';
import { StockService } from '@/lib/stockService';

export async function GET() {
  try {
    const leads = StockService.getLeads();
    return NextResponse.json({ leads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al obtener leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone || !body.email) {
      return NextResponse.json({ error: 'Nombre, teléfono y email son obligatorios' }, { status: 400 });
    }

    const lead = StockService.createLead({
      type: body.type || 'CONSULTA',
      vehicleId: body.vehicleId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      preferredDate: body.preferredDate,
      tradeInData: body.tradeInData
    });

    return NextResponse.json({
      success: true,
      lead,
      message: '¡Gracias por comunicarte! Un asesor comercial de Carvlak te contactará a la brevedad.'
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al registrar consulta' }, { status: 500 });
  }
}
