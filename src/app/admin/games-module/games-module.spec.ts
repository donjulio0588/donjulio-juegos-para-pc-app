import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesModule } from './games-module';

describe('GamesModule', () => {
  let component: GamesModule;
  let fixture: ComponentFixture<GamesModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
