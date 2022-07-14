export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONN_STRING: string,
      PORT: string,
      DB_NAME: string,
      USER_COLLECTION_NAME: string,
      SUPER_SECRET_SALT: number,
      JWTPRIVATEKEY: string,
      GOOGLE_SECRET: string,
      EMAIL_USER: string,
      EMAIL_PASSWORD: string,
      FRONT_URL: string,
      FRONT_URL1: string,
      FRONT_URL2: string,
      PAYPAL_API_CLIENT: string,
      PAYPAL_API_SECRET: string,
      STRIPE_API_KEY: string,
    }
  }
}

