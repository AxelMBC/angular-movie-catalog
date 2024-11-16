import { Component, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-movie-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-modal.component.html',
  styleUrl: './movie-modal.component.scss',
})
export class ModalComponent {
  @Output() movieCreated = new EventEmitter<Movie>();

  newMovie: Movie = {
    id: 0,
    title: '',
    synopsis: '',
    year: new Date().getFullYear(),
    cover: '',
  };

  constructor(private moviesService: MoviesService) {}

  openModal() {
    const modalDiv = document.getElementById('movieModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal() {
    const modelDiv = document.getElementById('movieModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
    // Reset form
    this.newMovie = {
      id: 0,
      title: '',
      synopsis: '',
      year: new Date().getFullYear(),
      cover: '',
    };
  }

  onSubmit() {
    this.moviesService.createMovie(this.newMovie).subscribe({
      next: (response) => {
        console.log('Movie created successfully:', response);
        this.movieCreated.emit(response); // Emit the new movie
        this.closeModal();
      },
      error: (error) => {
        console.error('Error creating movie:', error);
      },
    });
  }
}
