declare module 'js-cookie';

export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TS_NODE_FILES?: string;
    }
  }
}