import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundedGameCard } from './founded-game-card';

describe('FoundedGameCard', () => {
  let component: FoundedGameCard;
  let fixture: ComponentFixture<FoundedGameCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundedGameCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundedGameCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
