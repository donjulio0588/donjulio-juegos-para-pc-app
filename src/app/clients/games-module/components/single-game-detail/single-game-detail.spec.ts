import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGameDetail } from './single-game-detail';

describe('SingleGameDetail', () => {
  let component: SingleGameDetail;
  let fixture: ComponentFixture<SingleGameDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleGameDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleGameDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
