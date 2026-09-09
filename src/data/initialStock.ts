import { Vehicle, FinancingPlan } from '../types';

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'crv-001',
    slug: 'bestune-joy-03-2026',
    brand: 'Bestune',
    model: 'Joy 03',
    version: 'Eléctrico 0km',
    category: 'Eléctricos 0km',
    year: 2026,
    mileage: 0,
    priceUsd: 26900,
    transmission: 'Automática',
    fuel: 'Eléctrico',
    condition: '0km',
    bodyType: 'SUV',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Motor 100% Eléctrico de alta eficiencia',
      'Autonomía extendida hasta 400 km',
      'Pantalla táctil HD con conectividad avanzada',
      'Carga rápida DC al 80% en 30 minutos',
      'Garantía oficial de fábrica 0km'
    ],
    images: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 980
  },
  {
    id: 'crv-002',
    slug: 'bmw-114i-2014',
    brand: 'BMW',
    model: '114i',
    version: '1.6 TwinPower Turbo Urban',
    category: 'Usados Seleccionados',
    year: 2014,
    mileage: 139000,
    priceUsd: 22500,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Motor 1.6 TwinPower Turbo',
      'Modos de conducción Sport / Comfort / Eco Pro',
      'Arranque por botón Keyless Start',
      'Climatizador automático bizona',
      'Llantas de aleación originales BMW'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/bmw-114-1-6-twinpower-turbo-2015-89-000-km-21-900-usd-88339b61e0586e3f5917849138379207-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-06-03-at-12-16-16-pm-1-12502c3ef3fe4c2b9a17849138245598-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 1450
  },
  {
    id: 'crv-003',
    slug: 'byd-f0-glx-2015',
    brand: 'BYD',
    model: 'F0',
    version: '1.0 GLX-I Extra Full',
    category: 'Usados Seleccionados',
    year: 2015,
    mileage: 91000,
    priceUsd: 7900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Rojo',
    features: [
      'Aire acondicionado',
      'Dirección hidráulica asistida',
      'Vidrios eléctricos',
      'Keyless entry y botón Start-Stop',
      'Llantas de aleación deportivas'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/byf-f0-rojo-3b6ca2b621c5a440a417794684652785-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-05-22-at-10-21-22-am-1-d68a9168bf42125f1917794684534438-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 780
  },
  {
    id: 'crv-004',
    slug: 'chevrolet-agile-2010',
    brand: 'Chevrolet',
    model: 'Agile',
    version: '1.4 LT / LTZ',
    category: 'Usados Seleccionados',
    year: 2010,
    mileage: 146000,
    priceUsd: 7500,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Verde Oscuro Militar',
    features: [
      'Aire acondicionado',
      'Dirección asistida hidráulica',
      'Encendido automático de luces crepuscular',
      'Control de velocidad crucero',
      'Computadora de a bordo'
    ],
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 620
  },
  {
    id: 'crv-005',
    slug: 'chevrolet-prisma-joy-gris-2018',
    brand: 'Chevrolet',
    model: 'Prisma Joy LT',
    version: '1.0 Joy LT Gris Grafito',
    category: 'Usados Seleccionados',
    year: 2018,
    mileage: 120000,
    priceUsd: 10900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Sedán',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Gris',
    features: [
      'Aire acondicionado',
      'Dirección eléctrica progresiva',
      'Doble airbag frontal y frenos ABS',
      'Baúl espacioso de 500 litros',
      'Cierre centralizado con comando en llave'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/chevrolet-prisma-joy-lt-1-0-2018-93-000-km-10-900-usd-8199b19dfb4a4cb65917849141973618-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-05-19-at-12-07-28-pm-2-63b75c1da8c43fc9ce17849141875150-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1100
  },
  {
    id: 'crv-006',
    slug: 'fiat-uno-way-2014',
    brand: 'Fiat',
    model: 'Uno Way',
    version: '1.4 Way Blanco',
    category: 'Usados Seleccionados',
    year: 2014,
    mileage: 152000,
    priceUsd: 6870,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Aire acondicionado',
      'Dirección asistida',
      'Alzacristales eléctricos delanteros',
      'Faros antiniebla camineros',
      'Barras longitudinales de techo'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/fiat-uno-way-2014-blanco-ce4009d9f7d94168a517774703389288-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-04-28-at-11-06-30-am-f525ee231b2f14b37b17774703274551-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 1850
  },
  {
    id: 'crv-007',
    slug: 'fiat-strada-working-2018',
    brand: 'Fiat',
    model: 'Strada Working',
    version: '1.4 Utilitario',
    category: 'Usados Seleccionados',
    year: 2018,
    mileage: 125000,
    priceUsd: 11300,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Pick-up',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Gris',
    features: [
      'Capacidad de carga 705 kg',
      'Aire acondicionado',
      'Dirección hidráulica',
      'Protector de caja y lona marítima',
      'Reja de protección en luneta trasera'
    ],
    images: [
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 890
  },
  {
    id: 'crv-008',
    slug: 'ford-ranger-raptor-2024',
    brand: 'Ford',
    model: 'Ranger Raptor',
    version: '2.0 Bi-Turbo 4x4 Fox Racing',
    category: 'Todoterreno',
    year: 2024,
    mileage: 26000,
    priceUsd: 80000,
    transmission: 'Automática',
    fuel: 'Diésel',
    condition: 'Usado Seleccionado',
    bodyType: 'Pick-up',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Gris',
    features: [
      'Amortiguadores Fox Racing Shox 2.5" con Bypass',
      'Chasis reforzado Ford Performance',
      'Caja automática de 10 velocidades con levas de magnesio',
      'Modo Baja para conducción off-road a alta velocidad',
      'Neumáticos BF Goodrich All-Terrain'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/ford-ranger-raptor-682cce6182bc98701517763647259471-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-04-16-at-3-23-55-pm-f948c249f9eae582b717763646652117-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 3200
  },
  {
    id: 'crv-009',
    slug: 'hudson-ebuddy-2026',
    brand: 'Hudson',
    model: 'eBUDDY',
    version: 'Eléctrico 0km Utilitario',
    category: 'Eléctricos 0km',
    year: 2026,
    mileage: 0,
    priceUsd: 13990,
    transmission: 'Automática',
    fuel: 'Eléctrico',
    condition: '0km',
    bodyType: 'Utilitario',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      '100% Eléctrico costo mínimo operativo por km',
      'Autonomía urbana hasta 180 km',
      'Carga en cualquier tomacorriente doméstico de 220V',
      'Cámara de reversa y sensores de proximidad',
      'Ideal para logística y distribución'
    ],
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 1100
  },
  {
    id: 'crv-010',
    slug: 'hyundai-hb20-2025',
    brand: 'Hyundai',
    model: 'HB20',
    version: '1.0 Comfort Plus',
    category: 'Usados Seleccionados',
    year: 2025,
    mileage: 17000,
    priceUsd: 17300,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Gris',
    features: [
      '6 Airbags frontales, laterales y cortina',
      'Control electrónico de estabilidad ESP',
      'Pantalla táctil 8" con Apple CarPlay y Android Auto',
      'Cámara de retroceso y sensores',
      'Garantía oficial de fábrica vigente'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/hyundai-hb20-1-0-2025-19-000-km-17-300-usd-84a141979963e6ca4a17849136195655-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-06-03-at-10-23-45-am-1-0536411d33d9c1b3f917849136067784-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 1720
  },
  {
    id: 'crv-011',
    slug: 'kia-rio-2012',
    brand: 'KIA',
    model: 'Rio',
    version: '1.4 EX Full',
    category: 'Usados Seleccionados',
    year: 2012,
    mileage: 117000,
    priceUsd: 11900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Azul',
    features: [
      'Techo solar corredizo eléctrico',
      'Climatizador automático digital',
      'Frenos a disco en las 4 ruedas con ABS',
      'Llantas de aleación 16"',
      'Mandos de audio en el volante'
    ],
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 750
  },
  {
    id: 'crv-012',
    slug: 'mercedes-benz-c200-2013',
    brand: 'Mercedes-Benz',
    model: 'C 200',
    version: '1.8 CGI Avantgarde',
    category: 'Usados Seleccionados',
    year: 2013,
    mileage: 136000,
    priceUsd: 30900,
    transmission: 'Automática',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Sedán',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Plateado',
    features: [
      'Caja automática secuencial 7G-TRONIC',
      'Tapizados en cuero natural Mercedes-Benz',
      'Faros Bi-Xenón inteligentes ILS con LED',
      'Sistema de sonido Harman Kardon',
      'Control de estabilidad ESP y 7 airbags'
    ],
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 1680
  },
  {
    id: 'crv-013',
    slug: 'dongfeng-nammi-430-2026',
    brand: 'Dongfeng',
    model: 'Nammi 430 Box',
    version: 'EV 0km 430km Autonomía',
    category: 'Eléctricos 0km',
    year: 2026,
    mileage: 0,
    priceUsd: 22900,
    transmission: 'Automática',
    fuel: 'Eléctrico',
    condition: '0km',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Variado',
    features: [
      'Autonomía de 430 km CLTC',
      'Batería de litio ferrofosfato de carga ultrarrápida',
      'Manijas eléctricas enrasadas ocultas',
      'Pantalla central táctil 12.8"',
      'Asistencias a la conducción ADAS'
    ],
    images: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 1250
  },
  {
    id: 'crv-014',
    slug: 'nissan-march-2013',
    brand: 'Nissan',
    model: 'March',
    version: '1.6 Extra Full',
    category: 'Usados Seleccionados',
    year: 2013,
    mileage: 115000,
    priceUsd: 9900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Motor 1.6 16v con cadena de distribución',
      'Aire acondicionado',
      'Vidrios eléctricos en las 4 puertas',
      'Frenos ABS con EBD',
      'Bluetooth y mandos al volante'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/nissan-march-2013-blanco-b26a6350d537f594fc17774704040212-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-04-28-at-11-20-43-am-1-d602f69989a3cf344a17774703923985-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 840
  },
  {
    id: 'crv-015',
    slug: 'nissan-tiida-2011',
    brand: 'Nissan',
    model: 'Tiida',
    version: '1.8 Extra Full',
    category: 'Usados Seleccionados',
    year: 2011,
    mileage: 176000,
    priceUsd: 10900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Caja manual de 6 velocidades',
      'Techo solar corredizo eléctrico',
      'Climatizador digital',
      'Tapizados mixtos cuero y pana',
      'Asientos traseros corredizos'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/nissan-tiida-1-8-extra-full-2011-160-000-km-10-900-usd-84954497e6ea32f18317849141434315-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-05-19-at-12-13-17-pm-1-f1003d528b1227575217849141322047-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 910
  },
  {
    id: 'crv-016',
    slug: 'peugeot-2008-gt-2022',
    brand: 'Peugeot',
    model: '2008 GT',
    version: '1.2 PureTech Turbo 130cv',
    category: 'Usados Seleccionados',
    year: 2022,
    mileage: 32000,
    priceUsd: 27990,
    transmission: 'Automática',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'SUV',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'I-Cockpit 3D con instrumental holográfico',
      'Transmisión automática EAT8 de 8 marchas',
      'Faros Full LED colmillos',
      'Techo panorámico corredizo',
      'Cámara de retroceso VisioPark 180°'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/peugeot-2008-2022-263a2c4e565985012517857876801908-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-08-03-at-12-07-28-pm-2-a7201889cbe358a9e017857876865239-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 2150
  },
  {
    id: 'crv-017',
    slug: 'peugeot-208-roland-garros-2017',
    brand: 'Peugeot',
    model: '208',
    version: '1.6 Roland Garros Edición Limitada',
    category: 'Usados Seleccionados',
    year: 2017,
    mileage: 72000,
    priceUsd: 13990,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Edición limitada oficial Roland Garros',
      'Techo cielo panorámico con LED',
      'Tapizados de cuero con grabado exclusivo',
      'Pantalla táctil con GPS y MirrorScreen',
      'Llantas diamantadas 16"'
    ],
    images: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 1320
  },
  {
    id: 'crv-018',
    slug: 'renault-clio-dynamique-2016',
    brand: 'Renault',
    model: 'Clio Dynamique',
    version: '0.9 TCe Francés Turbo',
    category: 'Usados Seleccionados',
    year: 2016,
    mileage: 140000,
    priceUsd: 13990,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Rojo',
    features: [
      'Origen Francia ensamblado en Europa',
      'Motor 0.9 Turbo TCe súper económico',
      'Tarjeta inteligente manos libres y botón Start/Stop',
      'Pantalla MediaNav con GPS',
      'Luces diurnas LED'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/renault-clio-dynamique-2016-rojo-13-900-usd-88-000-km-2a4401e1da613da82c17849137452601-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-06-03-at-10-38-04-am-2-9c3a37fcce5d003b4417849137330766-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1120
  },
  {
    id: 'crv-019',
    slug: 'renault-sandero-stepway-2012',
    brand: 'Renault',
    model: 'Sandero Stepway',
    version: '1.6 16v Privilège',
    category: 'Usados Seleccionados',
    year: 2012,
    mileage: 160000,
    priceUsd: 9990,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Azul Oscuro',
    features: [
      'Versión Privilège tope de gama',
      'Mayor despeje del suelo tipo crossover',
      'Climatizador automático',
      'Sensores de reversa',
      'Barras de techo longitudinales'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/renault-sandero-stepway-2012-privilege-1-6-139-000-km-9-990-usd-f0e21a221f57bf43dc17849142716173-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-05-19-at-12-00-51-pm-1-da4e8db30f878f8cb017849142589088-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 890
  },
  {
    id: 'crv-020',
    slug: 'suzuki-celerio-plateado-2018',
    brand: 'Suzuki',
    model: 'Celerio',
    version: '1.0 GL Gris Plata',
    category: 'Usados Seleccionados',
    year: 2018,
    mileage: 101000,
    priceUsd: 11900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Plateado',
    features: [
      'Motor 1.0 K10B ultra eficiente (+20 km/l)',
      'Doble airbag y frenos ABS',
      'Aire acondicionado y dirección eléctrica',
      'Vidrios eléctricos',
      'Bluetooth y USB'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/suzuki-celerio-1-0-gl-2018-89-000-km-11-900-usd-a3375c3f76902ba4da17849139885741-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-06-01-at-2-58-15-pm-1-1-e40df56037a93a40c617849139773173-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1050
  },
  {
    id: 'crv-021',
    slug: 'suzuki-celerio-rojo-2020',
    brand: 'Suzuki',
    model: 'Celerio',
    version: '1.0 GL Rojo',
    category: 'Usados Seleccionados',
    year: 2020,
    mileage: 120000,
    priceUsd: 10900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Rojo',
    features: [
      'Consumo récord en ciudad',
      'Doble airbag frontal y frenos ABS',
      'Aire acondicionado',
      'Vidrios eléctricos',
      'Cierre centralizado con comando en llave'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/suzuki-celerio-1-0-gl-2020-75-000-km-10-900-usd-e708aa862089dbbc6917849141695420-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-05-19-at-12-10-02-pm-1-d68a9168bf42125f1917849141571234-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 970
  },
  {
    id: 'crv-022',
    slug: 'suzuki-swift-bitono-2020',
    brand: 'Suzuki',
    model: 'Swift',
    version: '1.2 GLX Japonés Bitono',
    category: 'Usados Seleccionados',
    year: 2020,
    mileage: 111000,
    priceUsd: 15200,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Azul Bitono',
    features: [
      'Origen 100% Japón con pintura bitono',
      'Arranque por botón Keyless Start',
      'Climatizador automático',
      'Faros LED con sensor de luz',
      'Pantalla táctil multimedia'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/suzuki-swift-1-2-glx-2019-78-000-km-15-200-usd-f0d55e5d1ae6b4931a17849136939985-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-06-03-at-10-34-45-am-1-d576a59600d83bce4b17849136814237-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 1640
  },
  {
    id: 'crv-023',
    slug: 'toyota-hilux-manual-2022',
    brand: 'Toyota',
    model: 'Hilux',
    version: '2.8 TDI 4x4 Manual',
    category: 'Todoterreno',
    year: 2022,
    mileage: 105000,
    priceUsd: 25000,
    transmission: 'Manual',
    fuel: 'Diésel',
    condition: 'Usado Seleccionado',
    bodyType: 'Pick-up',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Gris',
    features: [
      'Motor 2.8 Turbo Diésel 204 CV',
      'Tracción 4x4 con alta, baja y bloqueo',
      'Control de tracción activo y estabilidad',
      'Doble cabina con protector de caja',
      'Remolque hasta 3.500 kg'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/toyota-hilux-2017-d5d2c2c0ec2e9ba4ec17857876251268-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-08-03-at-12-09-56-pm-1-3965ea9ee09919f20c17857876313982-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 2300
  },
  {
    id: 'crv-024',
    slug: 'volkswagen-saveiro-gris-2021',
    brand: 'Volkswagen',
    model: 'Saveiro',
    version: '1.6 MSI Cabina Extendida',
    category: 'Usados Seleccionados',
    year: 2021,
    mileage: 86000,
    priceUsd: 14900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Pick-up',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Gris Oscuro',
    features: [
      'Motor 1.6 MSI 16v 110 CV',
      'Cabina extendida con amplio espacio',
      'Frenos a disco en las 4 ruedas con ABS Off-Road',
      'Lona marítima y protector de caja',
      'Aire acondicionado y dirección asistida'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/volkswagen-saveiro-2020-04b3fe11ef518c8d8b17857879685671-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-08-03-at-11-54-46-am-2-8a9d18ceb2fa9ce96717857879743844-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1280
  },
  {
    id: 'crv-025',
    slug: 'volkswagen-up-2018',
    brand: 'Volkswagen',
    model: 'UP',
    version: '1.0 Move UP 5P',
    category: 'Usados Seleccionados',
    year: 2018,
    mileage: 129000,
    priceUsd: 11900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      '5 Estrellas en seguridad Latin NCAP',
      'Motor 1.0 MPI súper rendidor',
      'Aire acondicionado',
      'Levantavidrios delanteros y cierre',
      'Anclajes ISOFIX'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/volkswagen-up-2018-move-11-900-usd-110-000-km-27b92ee435bb156c7117849139598285-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-06-01-at-3-06-44-pm-1-1-ce39603f9a76d1e44217849139474720-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1420
  },
  {
    id: 'crv-026',
    slug: 'suzuki-swift-sport-2023',
    brand: 'Suzuki',
    model: 'Swift Sport',
    version: '1.4 Boosterjet Turbo 140cv',
    category: 'Usados Seleccionados',
    year: 2023,
    mileage: 35000,
    priceUsd: 23900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Gris',
    features: [
      'Motor 1.4 Boosterjet Turbo 140 CV',
      'Chasis deportivo Heartect liviano',
      'Doble salida de escape cromada',
      'Butacas deportivas envolventes',
      'Frenos de disco ventilados'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/suzuki-swift-sport-2023-fa53664dcf55ae106c17857877478673-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-08-03-at-12-04-20-pm-1-4ff217e94dfda04da217857877543888-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 2890
  },
  {
    id: 'crv-027',
    slug: 'chevrolet-prisma-joy-blanco-2018',
    brand: 'Chevrolet',
    model: 'Prisma Joy LT',
    version: '1.0 Joy LT Blanco',
    category: 'Usados Seleccionados',
    year: 2018,
    mileage: 120000,
    priceUsd: 10900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Sedán',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Aire acondicionado',
      'Dirección asistida eléctrica',
      'Doble airbag y frenos ABS',
      'Baúl espacioso de 500 litros',
      'Alzacristales eléctricos delanteros'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/chevrolet-prisma-joy-lt-1-0-2018-93-000-km-10-900-usd-8199b19dfb4a4cb65917849141973618-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-05-19-at-12-07-28-pm-2-63b75c1da8c43fc9ce17849141875150-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1010
  },
  {
    id: 'crv-028',
    slug: 'nissan-march-active-2015',
    brand: 'Nissan',
    model: 'March Active',
    version: '1.6 Active 16v',
    category: 'Usados Seleccionados',
    year: 2015,
    mileage: 125000,
    priceUsd: 8900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Motor 1.6 16v de excelente respuesta',
      'Aire acondicionado',
      'Dirección asistida eléctrica',
      'Doble airbag y frenos ABS',
      'Radio con entrada auxiliar y USB'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/nissan-march-2013-blanco-b26a6350d537f594fc17774704040212-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-04-28-at-11-20-43-am-1-d602f69989a3cf344a17774703923985-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 790
  },
  {
    id: 'crv-029',
    slug: 'toyota-hilux-srv-auto-2022',
    brand: 'Toyota',
    model: 'Hilux SRV',
    version: '2.8 TDI 4x4 Automática',
    category: 'Todoterreno',
    year: 2022,
    mileage: 105000,
    priceUsd: 49900,
    transmission: 'Automática',
    fuel: 'Diésel',
    condition: 'Usado Seleccionado',
    bodyType: 'Pick-up',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Gris',
    features: [
      'Caja automática secuencial 6 marchas',
      'Paquete de seguridad Toyota Safety Sense',
      'Tapizados en cuero con butaca eléctrica',
      'Sistema de audio JBL premium',
      'Faros Bi-LED'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/toyota-hilux-srv-2022-d784a0d9e87ba3135b17857875653457-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-08-03-at-12-11-57-pm-1-197e7fdfab8ba06a6b17857875707767-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 2980
  },
  {
    id: 'crv-030',
    slug: 'kia-soluto-ex-plus-2020',
    brand: 'KIA',
    model: 'Soluto',
    version: '1.4 EX Plus MT',
    category: 'Usados Seleccionados',
    year: 2020,
    mileage: 68000,
    priceUsd: 12500,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Sedán',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Pantalla táctil 7" con Apple CarPlay y Android Auto',
      'Cámara de reversa con guías',
      'Tapizados en cuero ecológico',
      'Baúl con 475 litros',
      'Frenos ABS e ISOFIX'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/kia-soluto-2020-ex-plus-1-4-12-500-usd-69-000-km-2df283f51664ef5f6b17849138978160-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-06-03-at-10-18-05-am-1-31406eef1e68ce067a17849138867389-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1350
  },
  {
    id: 'crv-031',
    slug: 'honda-fit-2012',
    brand: 'Honda',
    model: 'Fit',
    version: '1.4 / 1.5 i-VTEC LX',
    category: 'Usados Seleccionados',
    year: 2012,
    mileage: 115000,
    priceUsd: 10900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Negro',
    features: [
      'Asientos modulares Magic Seats',
      'Motor i-VTEC ágil y económico',
      'Doble airbag y frenos ABS con EBD',
      'Aire acondicionado y dirección eléctrica',
      'Visibilidad panorámica'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/honda-fit-2017-c6b759feaa44c6600a17857880786523-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-08-03-at-11-48-28-am-1-ce39603f9a76d1e44217857880846660-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1150
  },
  {
    id: 'crv-032',
    slug: 'chevrolet-onix-joy-negro-2019',
    brand: 'Chevrolet',
    model: 'Onix Joy LT',
    version: '1.0 Joy LT Negro',
    category: 'Usados Seleccionados',
    year: 2019,
    mileage: 76000,
    priceUsd: 11500,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Negro',
    features: [
      'Motor 1.0 SPE/4 confiable y económico',
      'Dirección eléctrica progresiva',
      'Aire acondicionado',
      'Levantavidrios eléctricos',
      'Alarma antirrobo con comando en llave'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/chevrolet-onix-joy-lt-1-0-2019-80-000-km-11-900-usd-7fa7dfba1a91e5e34717849140417933-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-06-01-at-2-53-53-pm-1-1-2adbf76135863c0a5217849140286820-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1200
  },
  {
    id: 'crv-033',
    slug: 'volkswagen-virtus-2019',
    brand: 'Volkswagen',
    model: 'Virtus',
    version: '1.6 MSI Comfortline',
    category: 'Usados Seleccionados',
    year: 2019,
    mileage: 110000,
    priceUsd: 13900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Sedán',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Plateado',
    features: [
      'Plataforma MQB de máxima seguridad',
      'Baúl gigante de 521 litros',
      'Pantalla Composition Touch con App-Connect',
      'Sensores traseros',
      '4 Airbags'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/volkswagen-virtus-2019-b570cb9e44383188d117857878893922-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-08-03-at-12-00-51-pm-1-92b0c36cb56ab8598917857878954707-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 1480
  },
  {
    id: 'crv-034',
    slug: 'chevrolet-joy-black-2023',
    brand: 'Chevrolet',
    model: 'Joy Black',
    version: '1.0 Joy Black MT',
    category: 'Usados Seleccionados',
    year: 2023,
    mileage: 130000,
    priceUsd: 10900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Edición Black con logos oscurecidos',
      'Aire acondicionado',
      'Dirección asistida eléctrica',
      'Doble airbag y frenos ABS',
      'Mantenimiento muy económico'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/chevrolet-joy-2021-blanco-12-900-usd-58-000-km-e555c4644a861dca7e17849138096291-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-06-03-at-10-30-28-am-1-ff441f71dfbc9b31d817849137976865-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1050
  },
  {
    id: 'crv-035',
    slug: 'faw-oley-2015',
    brand: 'FAW',
    model: 'Oley',
    version: '1.5 Comfort Sedán',
    category: 'Usados Seleccionados',
    year: 2015,
    mileage: 149000,
    priceUsd: 7900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Sedán',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Gris',
    features: [
      'Motor 1.5 16v VCT de 101 CV',
      'Aire acondicionado',
      'Doble airbag y frenos ABS',
      'Radio con USB y MP3',
      'Cierre centralizado'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/faw-oley-26589ebfbcbbc106a017857881393392-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-08-03-at-11-44-32-am-1-39c43bfbcab249d32b17857881452668-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 680
  },
  {
    id: 'crv-036',
    slug: 'renault-clio-iv-dynamique-2015',
    brand: 'Renault',
    model: 'Clio IV Dynamique',
    version: '0.9 TCe Francés Turbo',
    category: 'Usados Seleccionados',
    year: 2015,
    mileage: 120000,
    priceUsd: 12900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Rojo',
    features: [
      'Origen francés original',
      'Motor 0.9 Turbo TCe 90 CV',
      'Control crucero con limitador',
      'MediaNav con GPS táctil',
      'Llantas de aleación 16"'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/renault-clio-iv-dynamique-2015-frances-99-000-km-12-900-usd-8db4219b16ea98442e17849138676239-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-06-03-at-10-20-43-am-1-79b88cf186300ae7ec17849138547432-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1190
  },
  {
    id: 'crv-037',
    slug: 'renault-oroch-expression-2022',
    brand: 'Renault',
    model: 'Oroch Expression',
    version: '1.6 16v Doble Cabina',
    category: 'Usados Seleccionados',
    year: 2022,
    mileage: 87000,
    priceUsd: 15500,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Pick-up',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Suspensión trasera Multilink independiente',
      'Capacidad de carga 650 kg',
      'Barras antivuelco y de techo',
      'Aire acondicionado y dirección asistida',
      'Doble cabina 5 plazas'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/renault-oroch-expression-1-6-2022-65-000-km-15-500-usd-304b791176b669dc6817849136681023-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-06-03-at-10-36-54-am-2-4581a95a6b0c2a71f017849136561089-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 1540
  },
  {
    id: 'crv-038',
    slug: 'renault-oroch-intens-outsider-2026',
    brand: 'Renault',
    model: 'Oroch Intens Outsider',
    version: '1.3 TCe Turbo 170cv',
    category: 'Usados Seleccionados',
    year: 2026,
    mileage: 20000,
    priceUsd: 19900,
    transmission: 'Automática',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Pick-up',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Plateado',
    features: [
      'Motor 1.3 Turbo 170 CV / 270 Nm',
      'Caja automática CVT X-Tronic 8 marchas',
      'Kit Outsider con faros adicionales',
      'Pantalla EasyLink 8" inalámbrica',
      'Climatizador automático'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/renault-oroch-outsider-2026-665e315201104e179e17857878072120-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-08-03-at-12-02-36-pm-1-c1966a4f89d311957217857878142750-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 2200
  },
  {
    id: 'crv-039',
    slug: 'renault-logan-zen-2021',
    brand: 'Renault',
    model: 'Logan Zen',
    version: '1.0 SCe 12v',
    category: 'Usados Seleccionados',
    year: 2021,
    mileage: 139000,
    priceUsd: 10990,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Sedán',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Baúl gigante de 510 litros',
      '4 Airbags y frenos ABS',
      'Luces diurnas LED C-Shape',
      'Pantalla Media Evolution 7"',
      'Gran habitabilidad interior'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/renault-logan-1-0-zen-2021-85-000-km-10-990-usd-5fe5c2a129efee831b17849141094895-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-05-19-at-12-16-17-pm-1-1-4190c74fb7c8e9b89717849140974867-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 940
  },
  {
    id: 'crv-040',
    slug: 'volkswagen-saveiro-rojo-2020',
    brand: 'Volkswagen',
    model: 'Saveiro',
    version: '1.6 MSI Cabina Extendida Rojo',
    category: 'Usados Seleccionados',
    year: 2020,
    mileage: 95000,
    priceUsd: 14900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Pick-up',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Rojo',
    features: [
      'Motor 1.6 MSI probado y confiable',
      'Cabina extendida espaciosa',
      'Frenos ABS Off-Road con 4 discos',
      'Lona marítima y protector de caja',
      'Aire y dirección hidráulica'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/volkswagen-saveiro-2020-cabina-extendida-14-900-usd-95-000-km-6e69074b706c4b2b2b17849137181057-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-06-03-at-10-33-04-am-1-3965ea9ee09919f20c17849137064883-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1100
  },
  {
    id: 'crv-041',
    slug: 'mercedes-benz-gle-400-2016',
    brand: 'Mercedes-Benz',
    model: 'GLE 400',
    version: '3.0 V6 BiTurbo 4MATIC',
    category: 'Todoterreno',
    year: 2016,
    mileage: 256000,
    priceUsd: 55000,
    transmission: 'Automática',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'SUV',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Motor 3.0 V6 BiTurbo 333 CV con tracción 4MATIC',
      'Caja automática 9G-TRONIC con levas',
      'Suspensión neumática adaptativa AIRMATIC',
      'Paquete AMG Line con llantas de 20"',
      'Techo panorámico corredizo y portón eléctrico'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/mercedes-benz-gle-400-2018-8aebc52bc7291253c317857874984218-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-08-03-at-12-14-04-pm-1-3a2162a5b6d51d5c2217857875043818-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 2600
  },
  {
    id: 'crv-042',
    slug: 'volkswagen-saveiro-plateada-2020',
    brand: 'Volkswagen',
    model: 'Saveiro',
    version: '1.6 MSI Doble Cabina Plateada',
    category: 'Usados Seleccionados',
    year: 2020,
    mileage: 90000,
    priceUsd: 14900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Pick-up',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Plateado',
    features: [
      'Doble cabina homologada para 5 ocupantes',
      'Frenos de disco en las 4 ruedas con ABS Off-Road',
      'Barras longitudinales de techo',
      'Aire acondicionado y vidrios eléctricos',
      'Protector de caja'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/volkswagen-saveiro-doble-cabina-2020-blanca-14-900-usd-89-000-km-49339316ee0a711fba17849137785532-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-06-03-at-10-31-48-am-1-3b6ca2b621c5a440a417849137664871-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1150
  },
  {
    id: 'crv-043',
    slug: 'chevrolet-onix-ltz-2018',
    brand: 'Chevrolet',
    model: 'Onix LTZ',
    version: '1.4 LTZ Rojo',
    category: 'Usados Seleccionados',
    year: 2018,
    mileage: 100000,
    priceUsd: 10900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Rojo',
    features: [
      'Versión LTZ tope de gama',
      'Central multimedia MyLink 7" táctil',
      'Cámara de reversa y sensores traseros',
      'Llantas de aleación diamantadas 15"',
      'Faros antiniebla'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/chevrolet-onix-joy-lt-1-0-2018-89-000-km-10-900-usd-419163e7902e4ae06a17849142345579-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-05-19-at-12-03-34-pm-1-665e315201104e179e17849142211425-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1080
  },
  {
    id: 'crv-044',
    slug: 'renault-kwid-2019',
    brand: 'Renault',
    model: 'Kwid',
    version: '1.0 Zen Blanco',
    category: 'Usados Seleccionados',
    year: 2019,
    mileage: 98000,
    priceUsd: 9500,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      '4 Airbags de serie (frontales y laterales)',
      'Despeje del suelo elevado de 180 mm',
      'Dirección eléctrica asistida y aire acondicionado',
      'Cierre centralizado con comando en llave',
      'Consumo hasta 22 km/l'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/renault-kwid-2019-zen-1-0-89-000-km-9-500-usd-a6e5bb490f2095f9e717849143093259-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-05-19-at-11-54-46-am-1-49339316ee0a711fba17849142967119-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1410
  },
  {
    id: 'crv-045',
    slug: 'chevrolet-celta-2016',
    brand: 'Chevrolet',
    model: 'Celta',
    version: '1.4 LT Rojo',
    category: 'Usados Seleccionados',
    year: 2016,
    mileage: 76000,
    priceUsd: 8900,
    transmission: 'Manual',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Rojo',
    features: [
      'Motor 1.4 8v probado y ágil',
      'Aire acondicionado',
      'Dirección asistida',
      'Alzacristales eléctricos y cierre centralizado',
      'Doble airbag y frenos ABS'
    ],
    images: [
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/chevrolet-celta-2016-lt-8-900-usd-129-000-km-0b898fa395b001099617849143399081-1024-1024.webp',
      'https://dcdn-us.mitiendanube.com/stores/006/928/264/products/whatsapp-image-2026-05-19-at-11-47-57-am-1-2df283f51664ef5f6b17849143274291-1024-1024.webp'
    ],
    status: 'DISPONIBLE',
    isFeatured: false,
    viewsCount: 1310
  },
  {
    id: 'crv-046',
    slug: 'bmw-drive-110i-2020',
    brand: 'BMW',
    model: 'Serie 1',
    version: '118i M Sport Steptronic',
    category: 'Usados Seleccionados',
    year: 2020,
    mileage: 70000,
    priceUsd: 46900,
    transmission: 'Automática',
    fuel: 'Nafta',
    condition: 'Usado Seleccionado',
    bodyType: 'Hatchback',
    location: 'Showroom Ciudad de la Costa, Canelones',
    colorExterior: 'Blanco',
    features: [
      'Paquete deportivo original M Sport',
      'Transmisión automática Steptronic doble embrague',
      'BMW Live Cockpit Professional digital',
      'Butacas deportivas M en Alcántara',
      'Park Assist autónomo'
    ],
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'DISPONIBLE',
    isFeatured: true,
    viewsCount: 2450
  }
];

export const FINANCING_PLANS: FinancingPlan[] = [
  {
    id: 'plan-santander',
    bankName: 'Banco Santander Uruguay',
    minDownPaymentPercent: 20,
    maxTermMonths: 60,
    annualInterestRate: 7.9,
    description: 'Crédito automotriz preferencial en Unidades Indexadas o Dólares con aprobación rápida en 24 horas.',
    requirements: [
      'Cédula de Identidad vigente',
      'Últimos 3 recibos de sueldo o certificación de ingresos',
      'Constancia de domicilio (factura UTE, Antel u OSE)',
      'Antigüedad laboral mínima de 6 meses'
    ],
    isActive: true
  },
  {
    id: 'plan-bbva',
    bankName: 'BBVA Uruguay',
    minDownPaymentPercent: 25,
    maxTermMonths: 48,
    annualInterestRate: 8.2,
    description: 'Hasta el 75% del valor del vehículo financiado con débito automático y seguro bonificado.',
    requirements: [
      'Cédula de Identidad',
      'Recibos de sueldo con ingreso mínimo de $35.000 UYU o USD 900',
      'Constancia de domicilio'
    ],
    isActive: true
  },
  {
    id: 'plan-itau',
    bankName: 'Banco Itaú Uruguay',
    minDownPaymentPercent: 30,
    maxTermMonths: 60,
    annualInterestRate: 7.5,
    description: 'Tasa preferencial exclusiva para clientes Itaú y vehículos híbridos / eléctricos 0km.',
    requirements: [
      'Cliente cuenta sueldo Itaú o scoring A en Veraz/Clearing',
      'Declaración jurada de ingresos'
    ],
    isActive: true
  },
  {
    id: 'plan-carvlak-directo',
    bankName: 'Crédito Directo Carvlak',
    minDownPaymentPercent: 50,
    maxTermMonths: 36,
    annualInterestRate: 9.9,
    description: 'Financiación de la casa sin intermediarios bancarios. Solo con Cédula y entrega inicial del 50%. Aprobación inmediata.',
    requirements: [
      'Cédula de Identidad o RUT',
      'Entrega inicial mínima del 50% contado o con tu usado',
      'Firma de vale o prenda en escribanía propia'
    ],
    isActive: true
  }
];

export const CARVLAK_BRANDS_BY_CATEGORY = {
  'Usados Seleccionados': [
    'Bestune', 'BMW', 'BYD', 'Chevrolet', 'Dongfeng', 'FAW', 'Fiat', 'Ford',
    'Honda', 'Hudson', 'Hyundai', 'KIA', 'Mercedes-Benz', 'Nissan', 'Peugeot',
    'Renault', 'Suzuki', 'Toyota', 'Volkswagen'
  ],
  'Eléctricos 0km': [
    'Bestune', 'Dongfeng', 'Hudson'
  ],
  'Usadas Seleccionadas': [
    'KTM', 'Husqvarna', 'Kawasaki'
  ],
  'Todoterreno': [
    'Ford', 'Mercedes-Benz', 'Toyota'
  ]
};
