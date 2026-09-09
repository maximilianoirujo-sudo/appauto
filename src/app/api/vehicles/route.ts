import { NextResponse } from 'next/server';
import { StockService } from '@/lib/stockService';
import { VehicleFilterParams } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: VehicleFilterParams = {
      category: searchParams.get('category') || undefined,
      brand: searchParams.get('brand') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      minYear: searchParams.get('minYear') ? Number(searchParams.get('minYear')) : undefined,
      maxYear: searchParams.get('maxYear') ? Number(searchParams.get('maxYear')) : undefined,
      maxMileage: searchParams.get('maxMileage') ? Number(searchParams.get('maxMileage')) : undefined,
      transmission: searchParams.get('transmission') || undefined,
      fuel: searchParams.get('fuel') || undefined,
      condition: searchParams.get('condition') || undefined,
      query: searchParams.get('query') || undefined,
      sortBy: (searchParams.get('sortBy') as VehicleFilterParams['sortBy']) || undefined,
    };

    const result = StockService.getVehicles(filters);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al obtener vehículos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newVehicle = StockService.createVehicle(body);
    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al crear vehículo' }, { status: 500 });
  }
}
