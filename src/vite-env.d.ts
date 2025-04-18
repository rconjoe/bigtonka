/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BUCKET_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
