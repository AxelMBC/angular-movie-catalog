import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes'; // Importa las rutas definidas en otro archivo

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), // Proveedor para manejar solicitudes HTTP, usando la función `fetch`
    provideZoneChangeDetection({ eventCoalescing: true }), // Optimización del rendimiento mediante la agrupación de eventos
    provideRouter(routes), // Proveedor que configura las rutas de la aplicación
  ],
};
