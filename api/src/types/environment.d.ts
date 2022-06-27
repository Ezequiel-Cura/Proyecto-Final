export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONN_STRING: string,
      PORT: string,
      DB_NAME: string,
      USER_COLLECTION_NAME: string,
      SUPER_SECRET_SALT: number
    }
  }
}

