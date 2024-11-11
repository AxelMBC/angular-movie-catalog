import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { MoviesService } from '../movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute, // Inyecta ActivatedRoute para obtener los parámetros de la URL (como el ID de la película)
    private router: Router, // Inyecta Router para permitir la navegación programática (como volver a la lista de películas)
    private moviesService: MoviesService // Inyecta el servicio de películas para interactuar con la API
  ) {}

  // Método del ciclo de vida OnInit, que se ejecuta cuando el componente se inicializa
  ngOnInit() {
    // Se suscribe a los cambios en los parámetros de la ruta
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('id'); // Obtiene el ID de la película de los parámetros de la URL

      // Llama al servicio de películas para obtener los detalles de la película por su ID
      this.moviesService.getMovieById(Number(movieId)).subscribe({
        // Si la solicitud es exitosa, asigna los detalles de la película a la variable `movie`
        next: (data) => {
          this.movie = data;
          console.log('Movie details:', this.movie);
        },
        error: (err) => {
          console.error('Error fetching movie details:', err);
        },
      });
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
