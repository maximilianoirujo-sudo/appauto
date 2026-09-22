/**
 * CARVLAK SaaS - Cloud Store & Multi-Tenant Sync (Etapa 1)
 * Sincronización en tiempo real con Supabase y fallback a catálogo local.
 */

const CloudStore = (function() {
  const DEFAULT_TENANT_ID = 'c0000000-0000-0000-0000-000000000001';
  const DEFAULT_TENANT_SLUG = 'carvlak';

  let syncState = 'idle'; // 'idle' | 'connected' | 'syncing' | 'offline'
  let syncListeners = [];
  let realtimeChannel = null;

  function setSyncState(state) {
    syncState = state;
    syncListeners.forEach(fn => {
      try { fn(state); } catch (e) { console.error('Error in sync listener:', e); }
    });
  }

  function onSyncStateChange(callback) {
    if (typeof callback === 'function') {
      syncListeners.push(callback);
      callback(syncState);
    }
  }

  function getClient() {
    return window.SupabaseAdapter ? window.SupabaseAdapter.getClient() : null;
  }

  function isConnected() {
    return window.SupabaseAdapter ? window.SupabaseAdapter.isConfigured() : false;
  }

  // Mapeo DB (snake_case) -> JS (camelCase)
  function mapDbToVehicle(row) {
    if (!row) return null;
    return {
      id: row.id,
      brand: row.brand || '',
      model: row.model || '',
      version: row.version || '',
      category: row.category || 'usados',
      year: Number(row.year) || 2020,
      mileage: Number(row.mileage) || 0,
      priceUsd: Number(row.price_usd) || 0,
      oldPriceUsd: row.old_price_usd ? Number(row.old_price_usd) : null,
      bodyType: row.body_type || '',
      transmission: row.transmission || 'Manual',
      fuel: row.fuel || 'Nafta',
      colorExterior: row.color_exterior || '',
      mixedConsumption: row.mixed_consumption || '',
      patente: row.patente || '',
      status: row.status || 'disponible',
      isFeatured: Boolean(row.is_featured),
      features: Array.isArray(row.features) ? row.features : [],
      images: Array.isArray(row.images) ? row.images : []
    };
  }

  // Mapeo JS (camelCase) -> DB (snake_case)
  function mapVehicleToDb(car, tenantId) {
    return {
      id: car.id,
      tenant_id: tenantId || DEFAULT_TENANT_ID,
      brand: car.brand || '',
      model: car.model || '',
      version: car.version || '',
      category: car.category || 'usados',
      year: parseInt(car.year, 10) || 2020,
      mileage: parseInt(car.mileage, 10) || 0,
      price_usd: parseFloat(car.priceUsd) || 0,
      old_price_usd: car.oldPriceUsd ? parseFloat(car.oldPriceUsd) : null,
      body_type: car.bodyType || '',
      transmission: car.transmission || 'Manual',
      fuel: car.fuel || 'Nafta',
      color_exterior: car.colorExterior || '',
      mixed_consumption: car.mixedConsumption || '',
      patente: car.patente || '',
      status: car.status || 'disponible',
      is_featured: Boolean(car.isFeatured),
      features: Array.isArray(car.features) ? car.features : [],
      images: Array.isArray(car.images) ? car.images : [],
      updated_at: new Date().toISOString()
    };
  }

  // Obtener vehículos de la nube
  async function fetchCatalog(tenantSlug = DEFAULT_TENANT_SLUG) {
    const client = getClient();
    if (!client) {
      setSyncState('offline');
      return null;
    }

    try {
      setSyncState('syncing');
      const { data, error } = await client
        .from('vehicles')
        .select('*')
        .eq('tenant_id', DEFAULT_TENANT_ID)
        .order('year', { ascending: false });

      if (error) {
        console.warn('Error al consultar Supabase vehicles:', error.message);
        setSyncState('offline');
        return null;
      }

      if (data && data.length > 0) {
        setSyncState('connected');
        return data.map(mapDbToVehicle);
      } else {
        setSyncState('connected');
        return [];
      }
    } catch (err) {
      console.error('Fallo de red en fetchCatalog:', err);
      setSyncState('offline');
      return null;
    }
  }

  // Guardar / Actualizar vehículo en la nube
  async function saveVehicle(car, tenantSlug = DEFAULT_TENANT_SLUG) {
    const client = getClient();
    if (!client) {
      console.info('Guardado local (Supabase no configurado).');
      return { success: false, mode: 'local' };
    }

    try {
      setSyncState('syncing');
      const dbPayload = mapVehicleToDb(car, DEFAULT_TENANT_ID);
      const { data, error } = await client
        .from('vehicles')
        .upsert(dbPayload, { onConflict: 'id,tenant_id' })
        .select();

      if (error) {
        console.error('Error al guardar vehículo en Supabase:', error);
        setSyncState('connected');
        return { success: false, error: error.message };
      }

      setSyncState('connected');
      return { success: true, data: data ? mapDbToVehicle(data[0]) : car };
    } catch (err) {
      console.error('Excepción al guardar vehículo:', err);
      setSyncState('offline');
      return { success: false, error: err.message };
    }
  }

  // Eliminar vehículo en la nube
  async function deleteVehicle(id, tenantSlug = DEFAULT_TENANT_SLUG) {
    const client = getClient();
    if (!client) return { success: false, mode: 'local' };

    try {
      setSyncState('syncing');
      const { error } = await client
        .from('vehicles')
        .delete()
        .match({ id: id, tenant_id: DEFAULT_TENANT_ID });

      if (error) {
        console.error('Error al eliminar vehículo en Supabase:', error);
        setSyncState('connected');
        return { success: false, error: error.message };
      }

      setSyncState('connected');
      return { success: true };
    } catch (err) {
      console.error('Excepción al eliminar vehículo:', err);
      return { success: false, error: err.message };
    }
  }

  // Obtener configuración visual de la nube
  async function fetchUiSettings(tenantSlug = DEFAULT_TENANT_SLUG) {
    const client = getClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('tenants')
        .select('ui_settings')
        .eq('id', DEFAULT_TENANT_ID)
        .single();

      if (!error && data && data.ui_settings) {
        return data.ui_settings;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  // Guardar configuración visual y Destacado de la Semana
  async function saveUiSettings(settings, tenantSlug = DEFAULT_TENANT_SLUG) {
    const client = getClient();
    if (!client) return { success: false, mode: 'local' };

    try {
      setSyncState('syncing');
      const { error } = await client
        .from('tenants')
        .update({ ui_settings: settings })
        .eq('id', DEFAULT_TENANT_ID);

      if (error) {
        console.error('Error guardando UI settings en Supabase:', error);
        setSyncState('connected');
        return { success: false, error: error.message };
      }

      setSyncState('connected');
      return { success: true };
    } catch (err) {
      console.error('Excepción en saveUiSettings:', err);
      return { success: false, error: err.message };
    }
  }

  // Suscripción en tiempo real (WebSockets)
  function subscribeToRealtime(tenantSlug = DEFAULT_TENANT_SLUG, onEventCallback) {
    const client = getClient();
    if (!client) return null;

    if (realtimeChannel) {
      try { client.removeChannel(realtimeChannel); } catch (e) {}
    }

    try {
      realtimeChannel = client
        .channel('public:vehicles:' + DEFAULT_TENANT_ID)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'vehicles',
          filter: 'tenant_id=eq.' + DEFAULT_TENANT_ID
        }, payload => {
          console.log('⚡ Evento en tiempo real recibido de Supabase:', payload.eventType, payload.new?.id);
          if (typeof onEventCallback === 'function') {
            onEventCallback(payload);
          }
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('⚡ Suscrito a cambios en tiempo real de CARVLAK');
            setSyncState('connected');
          }
        });

      return realtimeChannel;
    } catch (err) {
      console.warn('No se pudo abrir canal Realtime:', err);
      return null;
    }
  }

  // Autenticación de Usuarios
  async function login(email, password) {
    const client = getClient();
    if (!client) {
      // Fallback a PIN si no está configurado
      if (password === '1234') {
        return {
          success: true,
          mode: 'pin_fallback',
          user: { email: email || 'admin@carvlak.uy', role: 'OWNER', full_name: 'Administrador CARVLAK' }
        };
      }
      return { success: false, error: 'Supabase no conectado y PIN no coincide' };
    }

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // Consultar rol en perfiles
      let role = 'SELLER';
      let fullName = 'Usuario';
      try {
        const { data: prof } = await client
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        if (prof) {
          role = prof.role || 'SELLER';
          fullName = prof.full_name || data.user.email.split('@')[0];
        }
      } catch (e) {}

      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          role: role,
          fullName: fullName
        },
        session: data.session
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  async function logout() {
    const client = getClient();
    if (client) {
      try { await client.auth.signOut(); } catch (e) {}
    }
    localStorage.removeItem('carvlak_current_user_v1');
    return { success: true };
  }

  async function getCurrentUser() {
    const client = getClient();
    if (!client) {
      try {
        const saved = localStorage.getItem('carvlak_current_user_v1');
        return saved ? JSON.parse(saved) : null;
      } catch (e) {
        return null;
      }
    }

    try {
      const { data: { session } } = await client.auth.getSession();
      if (!session || !session.user) return null;

      const { data: prof } = await client
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      return {
        id: session.user.id,
        email: session.user.email,
        role: prof ? prof.role : 'OWNER',
        fullName: prof ? prof.full_name : session.user.email.split('@')[0]
      };
    } catch (e) {
      return null;
    }
  }

  return {
    fetchCatalog,
    saveVehicle,
    deleteVehicle,
    fetchUiSettings,
    saveUiSettings,
    subscribeToRealtime,
    login,
    logout,
    getCurrentUser,
    onSyncStateChange,
    isConnected,
    DEFAULT_TENANT_ID,
    DEFAULT_TENANT_SLUG
  };
})();

window.CloudStore = CloudStore;