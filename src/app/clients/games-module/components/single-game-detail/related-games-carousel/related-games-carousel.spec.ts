import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedGamesCarousel } from './related-games-carousel';

describe('RelatedGamesCarousel', () => {
  let component: RelatedGamesCarousel;
  let fixture: ComponentFixture<RelatedGamesCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedGamesCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedGamesCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
