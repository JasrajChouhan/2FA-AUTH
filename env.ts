export interface Environment  {
  NODE_ENV : "development" | "test" | "production"
}


export const getEnv = <K extends keyof Environment> (key : K , fallback?: Environment[K] ) : Environment[K] => {
  const value = process.env[key] as Environment[K] | undefined;

  if(!value) {
    if(fallback){
      return fallback;
    }else {
      throw new Error(`Missing environment variable: ${key}.`)
    }
  }

  return value;
}