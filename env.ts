export interface Environment {
  NODE_ENV: "development" | "test" | "production",
  AUTH_GOOGLE_CLIENT_ID: string;
  AUTH_GOOGLE_CLIENT_SECRET: string;
  AUTH_GITHUB_CLIENT_ID: string;
  AUTH_GITHUB_CLIENT_SECRET: string;
  RESEND_API_KEY: string;
}


export const getEnv = <K extends keyof Environment>(key: K, fallback?: Environment[K]): Environment[K] => {

  const value = process.env[key] as Environment[K] | undefined;

  if (!value) {
    if (fallback) {
      return fallback;
    } else {
      throw new Error(`Missing environment variable: ${key}.`)
    }
  }

  return value;
}