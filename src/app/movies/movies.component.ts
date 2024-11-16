import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule para usar routerLink en las vistas
import { MoviesService } from '../movies.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
// Logica ejecutada cuando el componente es inicializado
// Esta clase conforma el OnInit interface, lo que significa que debe incluir un método ngOnInit()
export class MoviesComponent implements OnInit {
  title = 'Mejores Peliculas';

  movies: any[] = [];

  // MoviesService se inyecta en el componente a través del constructor

  constructor(private moviesService: MoviesService) {}
  // ngOnInit Permite a los componentes de Angular ejecutar algo de código una vez que el componente se haya inicializado
  ngOnInit() {
    this.fetchMovies();
  }

  // Este método utiliza el servicio para obtener películas de la API
  fetchMovies() {
    // Este método está llamando a un observable (usando HttpClient de Angular)
    this.moviesService.getMovies().subscribe({
      // El método subscribe es la forma en que "consume" un observable. Cuando se crea un observable (por ejemplo, a partir de una llamada HTTP), no comienza a emitir datos hasta que algo se suscribe a él.
      // Next se activa cuando el observable emite nuevos datos
      next: (data) => {
        this.movies = data;
        // console.log('Movies fetched:', this.movies);
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      },
    });
  }

  deleteMovie(id: number) {
    this.moviesService.deleteMovie(id).subscribe({
      next: () => {
        // Filtramos la película eliminada de la lista de películas actual
        this.movies = this.movies.filter((movie) => movie.id !== id);
        console.log(`Movie with ID ${id} deleted successfully.`);
      },
      error: (err) => {
        console.error(`Error deleting movie with ID ${id}:`, err);
      },
    });
  }

  openModal() {
    console.log('OpenModal Function Ran');
    const modalDiv = document.getElementById('movieModal');
    console.log('OpenModal Function Ran: ', modalDiv);
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal() {
    const modelDiv = document.getElementById('movieModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
}
