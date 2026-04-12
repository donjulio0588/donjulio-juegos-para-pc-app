import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperCarousel } from './upper-carousel';

describe('UpperCarousel', () => {
  let component: UpperCarousel;
  let fixture: ComponentFixture<UpperCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpperCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpperCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
