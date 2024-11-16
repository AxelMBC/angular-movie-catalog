import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../movies.service';

interface Movie {
  id: number;
  title: string;
  synopsis: string;
  year: number;
  cover: string;
}

@Component({
  selector: 'app-movie-modal-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-modal-edit.component.html',
  styleUrls: ['./movie-modal-edit.component.scss'],
})
export class MovieModalEditComponent {
  @Input() movieToEdit!: Movie;

  constructor(private moviesService: MoviesService) {}

  openModal() {
    const modalDiv = document.getElementById('editMovieModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal() {
    const modalDiv = document.getElementById('editMovieModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  onSubmit() {
    this.moviesService
      .updateMovie(this.movieToEdit.id, this.movieToEdit)
      .subscribe({
        next: (response) => {
          console.log('Movie updated successfully:', response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating movie:', error);
        },
      });
  }
}
