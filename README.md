# CARVLAK - Plataforma Web Automotriz Integral

Bienvenido al repositorio oficial de **CARVLAK**, automotora uruguaya especializada en:
- **Usados Seleccionados** (inspeccionados con garantía mecánica)
- **Eléctricos 0km** (Dongfeng, GWM, Bestune, Hudson)
- **Motos Usadas Seleccionadas** (KTM, Husqvarna, Kawasaki)
- **Todoterrenos y Pickups 4x4** (Toyota, Jeep, Ford, Suzuki)

Esta aplicación reemplaza el flujo de e-commerce genérico de Tiendanube por una experiencia automotriz especializada de alta gama.

---

## Características Principales

1. **Catálogo Inteligente con Búsqueda en Lenguaje Natural**:
   - Búsqueda por lenguaje coloquial (*"SUV familiar hasta 25.000 USD automática"*).
   - Filtros avanzados: Categoría, Marca, Año, Kilometraje, Transmisión, Combustible, Rango de Precio en USD.
   - Ordenamiento por precio, año, kilometraje y relevancia.

2. **Ficha de Vehículo Especializada**:
   - Galería fotográfica de alta resolución con vista previa 360°.
   - Ficha técnica completa (motor, potencia, tracción, seguridad, confort).
   - Simulación de cuotas bancarias en tiempo real.
   - **Reserva con Seña protegida (USD 500)**: Bloqueo de la unidad por 72 hs.
   - **Agendar Visita / Test Drive** en showroom de Montevideo.
   - Enlace directo a WhatsApp con ficha pre-cargada.

3. **Simulador de Financiación**:
   - Planes reales de bancos en Uruguay (Santander, BBVA, Itaú, Scotiabank y Financiación Propia Carvlak).
   - Sliders interactivos de entrega inicial (20% a 70%) y plazos (12 a 60 meses).
   - Cálculo automático de cuota mensual y tabla de amortización estimada.

4. **Tasación de Usados con IA (Trade-In)**:
   - Formulario guiado paso a paso para entregar un vehículo usado como parte de pago.
   - Algoritmo de valuación de mercado uruguayo basado en depreciación real.
   - Rango de tasación referencial instantáneo y generación de lead para el tasador comercial.

5. **Asesor IA Carvlak (Chat Persistente)**:
   - Widget flotante con IA conversacional conectado en tiempo real al stock real.
   - **Cero alucinaciones**: Solo recomienda vehículos existentes y disponibles.
   - Renderizado de tarjetas de vehículos dentro del chat con botón de reserva directa.
   - Derivación fluida a un asesor humano por WhatsApp.

6. **Checkout de Seña Automotriz**:
   - Integración con Mercado Pago (Sandbox / Tarjetas locales y redes Abitab/Redpagos).
   - Transferencia bancaria directa (BROU, Santander, Itaú) con carga de comprobante.
   - Contrato preliminar de seña con garantía de devolución y voucher descargable con código QR único.

7. **Panel de Administración Comercial (Backoffice / CRM)**:
   - Dashboard con métricas de stock, valor de inventario, leads y reservas.
   - Gestión de Stock (CRUD de vehículos, fotos, cambio de estado Disponible / Reservado / Vendido).
   - Bandeja de Leads (consultas, tasaciones y solicitudes de test drive con enlace directo a WhatsApp).
   - Gestión de Señas y Reservas activas.

---

## Estructura del Proyecto

```
carvlak-web/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # Backend REST API
│   │   ├── vehicles/             # Catálogo y búsqueda NLP
│   │   ├── advisor/              # Asesor IA con stock en tiempo real
│   │   ├── trade-in/             # Tasador de usados
│   │   ├── financing/            # Planes y simulador
│   │   ├── reservations/         # Checkout de seña y vouchers
│   │   └── admin/                # Endpoints del panel de administración
│   ├── catalogo/                 # Página de catálogo con filtros avanzados
│   ├── vehiculo/[slug]/          # Ficha técnica y reserva de unidad
│   ├── financiacion/             # Simulador de cuotas y bancos
│   ├── tasacion/                 # Módulo de tasación de usados
│   ├── reserva/[id]/             # Checkout de seña y contrato
│   ├── contacto/                 # Ubicación, showroom y mapa
│   ├── sobre-nosotros/           # Historia y garantías Carvlak
│   ├── admin/                    # Panel comercial privado
│   │   ├── stock/                # Gestión de inventario
│   │   ├── leads/                # CRM de consultas y tasaciones
│   │   └── reservas/             # Control de señas
│   ├── layout.tsx                # Layout global con Header, Footer y Asesor IA
│   └── page.tsx                  # Home moderna de alto impacto
├── components/                   # Componentes UI reutilizables
│   ├── Navbar.tsx                # Barra de navegación con categorías
│   ├── Footer.tsx                # Pie institucional con Instagram @car.vlak
│   ├── AdvisorChat.tsx           # Widget persistente de Asesor IA
│   ├── VehicleCard.tsx           # Tarjeta de producto automotriz
│   ├── FinancingCalculator.tsx   # Calculadora interactiva
│   └── TradeInWizard.tsx         # Asistente de tasación
├── prisma/                       # Capa de datos con Prisma ORM
│   ├── schema.prisma             # Modelos relacionales
│   └── seed.ts                   # Datos iniciales con marcas y modelos de Carvlak
├── data/                         # Datos mock y utilidades de catálogo
├── public/                       # Assets, logos, iconos
├── preview/                      # Versión interactiva autónoma (apertura directa en navegador)
│   └── index.html                # App completa ejecutable sin instalación previa
└── package.json                  # Dependencias del proyecto
```

---

## Cómo Levantar el Proyecto

### Opción A: Ejecución Directa en Navegador (Inmediata, sin requisitos)
Abrí el archivo `preview/index.html` en cualquier navegador web (Chrome, Edge, Firefox, Opera) haciendo doble clic sobre él. Tendrás la aplicación completa funcionando de forma 100% interactiva.

### Opción B: Proyecto Completo Next.js 14
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Inicializar la base de datos y cargar el stock inicial:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)
