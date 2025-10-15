import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAddEdit } from './game-add-edit';

describe('GameAddEdit', () => {
  let component: GameAddEdit;
  let fixture: ComponentFixture<GameAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
