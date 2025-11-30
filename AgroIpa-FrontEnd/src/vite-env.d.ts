/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // se criar outras variáveis VITE_ no futuro, pode declarar aqui também
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }