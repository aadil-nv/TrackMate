// src/types/index.d.ts
/// <reference types="vite/client" />

// Add custom types if needed
declare module '*.css';
declare module '*.scss';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';

// Example: for global window variables
interface Window {
  myCustomProperty?: string;
}
