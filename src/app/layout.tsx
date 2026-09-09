import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdvisorChat from '@/components/AdvisorChat';

export const metadata: Metadata = {
  title: 'CARVLAK | Automotora de Usados Seleccionados, Eléctricos 0km y Todoterrenos en Uruguay',
  description: 'Comprá o reservá tu próximo vehículo en Carvlak. Usados seleccionados con inspección técnica garantizada, 0km eléctricos Dongfeng, GWM, Bestune y motos de alta gama en Montevideo, Uruguay.',
  keywords: 'automotora uruguay, autos usados montevideo, electricos 0km uruguay, motos ktm montevideo, reserva con seña autos, financiacion santander bbva autos',
  openGraph: {
    title: 'CARVLAK - Tu Próximo Vehículo, Garantizado',
    description: 'Catálogo de autos usados seleccionados, eléctricos 0km, todoterrenos y motos con garantía mecánica.',
    url: 'https://carvlak.com.uy',
    siteName: 'CARVLAK Automotores',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'CARVLAK Automotores Uruguay'
      }
    ],
    locale: 'es_UY',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased flex flex-col font-sans selection:bg-sky-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AdvisorChat />
      </body>
    </html>
  );
}
