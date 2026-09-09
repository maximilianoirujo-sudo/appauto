import { NextResponse } from 'next/server';
import { StockService } from '@/lib/stockService';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const vehicle = StockService.getVehicleBySlug(params.slug);
    if (!vehicle) {
      return NextResponse.json({ error: 'Vehículo no encontrado' }, { status: 404 });
    }

    const similarVehicles = StockService.getSimilarVehicles(vehicle.id);

    return NextResponse.json({
      vehicle,
      similarVehicles
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al obtener vehículo' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const updated = StockService.updateVehicle(params.slug, body);
    if (!updated) {
      return NextResponse.json({ error: 'Vehículo no encontrado' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al actualizar vehículo' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const deleted = StockService.deleteVehicle(params.slug);
    if (!deleted) {
      return NextResponse.json({ error: 'Vehículo no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al eliminar vehículo' }, { status: 500 });
  }
}
