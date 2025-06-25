/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PYTHON_SERVICE_URL: string
  readonly VITE_NODE_SERVICE_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_DEV_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 