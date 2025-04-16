export const getEnv = (env: string, defaultValue?: string) => {
  const value = import.meta.env[env] || defaultValue;
  if (!value) {
    throw new Error(`${env} is undefined`);
  }
  return value;
};

export const backendUri = getEnv("VITE_BACKEND_URI");
