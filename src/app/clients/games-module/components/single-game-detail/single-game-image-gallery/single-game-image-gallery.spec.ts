import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGameImageGallery } from './single-game-image-gallery';

describe('SingleGameImageGallery', () => {
  let component: SingleGameImageGallery;
  let fixture: ComponentFixture<SingleGameImageGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleGameImageGallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleGameImageGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
