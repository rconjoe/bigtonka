/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BUCKET_DOMAIN: string;
  readonly VITE_API_URL: string;
  readonly VITE_MEDUSA_BACKEND_URL: string;
  readonly VITE_MEDUSA_PUBLISHABLE_KEY: string;
  readonly VITE_CLERK_PUBLISHABLE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
