/**
 * CARVLAK SaaS - Supabase Client Adapter (Etapa 1)
 * Permite conexión segura a Supabase Cloud con fallback transparente.
 */

// Credenciales por defecto (pueden sobreescribirse desde el Backoffice o por variables de entorno)
window.DEFAULT_SUPABASE_CONFIG = {
  url: window.ENV_SUPABASE_URL || '',
  anonKey: window.ENV_SUPABASE_ANON_KEY || ''
};

const SupabaseAdapter = (function() {
  const STORAGE_KEY = 'carvlak_supabase_config_v1';
  let clientInstance = null;

  function getConfig() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.url && parsed.anonKey) return parsed;
      }
    } catch (e) {
      console.warn('Error reading stored supabase config:', e);
    }
    return window.DEFAULT_SUPABASE_CONFIG;
  }

  function isConfigured() {
    const cfg = getConfig();
    return Boolean(cfg.url && cfg.anonKey && !cfg.anonKey.includes('placeholder'));
  }

  function initClient() {
    const cfg = getConfig();
    if (!window.supabase || !window.supabase.createClient) {
      return null;
    }
    if (!isConfigured()) {
      return null;
    }
    try {
      clientInstance = window.supabase.createClient(cfg.url, cfg.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      console.log('⚡ Supabase Cloud conectado exitosamente con:', cfg.url);
      return clientInstance;
    } catch (err) {
      console.error('Error inicializando cliente Supabase:', err);
      return null;
    }
  }

  function getClient() {
    if (!clientInstance) {
      clientInstance = initClient();
    }
    return clientInstance;
  }

  function saveConfig(url, anonKey) {
    if (!url || !anonKey) return false;
    const cleanUrl = url.trim().replace(/\/$/, '');
    const cleanKey = anonKey.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ url: cleanUrl, anonKey: cleanKey }));
    clientInstance = null;
    return Boolean(getClient());
  }

  function clearConfig() {
    localStorage.removeItem(STORAGE_KEY);
    clientInstance = null;
  }

  return {
    getClient,
    getConfig,
    saveConfig,
    clearConfig,
    isConfigured
  };
})();

window.SupabaseAdapter = SupabaseAdapter;