import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component'; // Nuevo componente para detalles

export const routes: Routes = [
  { path: '', component: MoviesComponent }, // Ruta para la lista de películas
  { path: 'movie/:id', component: MovieDetailComponent }, // Ruta Dinamica para los detalles de una película
  { path: '**', redirectTo: '' }, // Redirección para cualquier ruta no válida
];
