import { Injectable } from '@angular/core'; // Declara que este servicio puede ser inyectado en otras clases
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para hacer solicitudes HTTP
import { Observable } from 'rxjs'; // Importa Observable para manejar datos asincrónicos

interface Movie {
  id?: number;
  title: string;
  synopsis: string;
  year: number;
  cover: string;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = 'http://127.0.0.1:8000/api/movies/'; // El servicio se provee en el nivel raíz, lo que significa que estará disponible en toda la aplicación

  constructor(private http: HttpClient) {} // El constructor inyecta el servicio HttpClient

  // Obtener todas las peliculas
  getMovies(): Observable<any> {
    return this.http.get(this.apiUrl); // Hace una solicitud GET a la API y devuelve un Observable
  }

  // Obtener una película por su ID
  getMovieById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`); // Hace una solicitud GET a la API con un ID específico y devuelve un Observable
  }

  // Borrar pelicula
  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }

  updateMovie(id: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, updatedData);
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }
}
