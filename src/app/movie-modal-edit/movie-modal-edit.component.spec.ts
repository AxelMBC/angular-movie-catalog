import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieModalEditComponent } from './movie-modal-edit.component';

describe('MovieModalEditComponent', () => {
  let component: MovieModalEditComponent;
  let fixture: ComponentFixture<MovieModalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieModalEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
