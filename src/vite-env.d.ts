/// <reference types="vite/client" />

declare global {
  interface Window {
    THREE?: any;
    OrbitControls?: new (camera: any, domElement: HTMLElement) => any;
  }
}

export {};
