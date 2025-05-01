export const getEnv = (env: string, defaultValue?: string) => {
  const value = import.meta.env[env] || defaultValue;
  if (!value) {
    throw new Error(`${env} is undefined`);
  }
  return value;
};

export const backendUri = getEnv("VITE_BACKEND_URI");
export const frontendUri = getEnv("VITE_FRONTEND_URI");
export const CLIENT_ID = getEnv("VITE_CLIENT_ID") 
export const PROJECT_ID = getEnv("VITE_PROJECT_ID")
export const AUTH_URI = getEnv("VITE_AUTH_URI")
export const TOKEN_URI = getEnv("VITE_TOKEN_URI")
export const AUTH_PROVIDER = getEnv("VITE_AUTH_PROVIDER")
export const CLIENT_SECRET = getEnv("VITE_CLIENT_SECRET")
export const REDIRECT_URI = getEnv("VITE_REDIRECT_URI")
export const JAVASCRIPT_URI = getEnv("VITE_JAVASCRIPT_URI")
