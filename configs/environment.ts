export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

const mode = process.env.NODE_ENV;

export const isDev = Environment.Development === mode;

export const isProd = Environment.Production === mode;

export const isTest = Environment.Test === mode;
