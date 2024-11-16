import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoviesService } from '../movies.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ModalComponent } from '../movie-modal/movie-modal.component';
import { MovieModalEditComponent } from '../movie-modal-edit/movie-modal-edit.component';

interface Movie {
  id: number;
  title: string;
  synopsis: string;
  year: number;
  cover: string;
}

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ModalComponent,
    MovieModalEditComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  title = 'Mejores Peliculas';
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.moviesService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      },
    });
  }

  onMovieCreated(newMovie: Movie) {
    // Add the new movie to the beginning of the array to show it first
    this.movies.push(newMovie);
  }

  deleteMovie(id: number) {
    this.moviesService.deleteMovie(id).subscribe({
      next: () => {
        this.movies = this.movies.filter((movie) => movie.id !== id);
        console.log(`Movie with ID ${id} deleted successfully.`);
      },
      error: (err) => {
        console.error(`Error deleting movie with ID ${id}:`, err);
      },
    });
  }

  openModal(movie: Movie) {
    this.selectedMovie = movie;
    const modalDiv = document.getElementById('editMovieModal');
    console.log('Modal.div: ', modalDiv);
    if (modalDiv != null) {
      modalDiv.style.display = 'block'; // Mostrar Modal
    }
  }

  closeModal() {
    this.selectedMovie = null; // Clear the selected movie
    const modalDiv = document.getElementById('editMovieModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none'; // Mostrar Modal
    }
  }
}
