export {}
/// <reference types="google-one-tap" />
/// <reference types="google.accounts" />

declare global {
    const google: typeof import('google.accounts');
  }