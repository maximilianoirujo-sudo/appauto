import { NextResponse } from 'next/server';
import { processAdvisorMessage } from '@/lib/advisorEngine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    const response = await processAdvisorMessage(message);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error en el asesor IA' }, { status: 500 });
  }
}
