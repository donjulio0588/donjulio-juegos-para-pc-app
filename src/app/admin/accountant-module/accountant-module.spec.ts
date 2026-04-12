import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantModule } from './accountant-module';

describe('AccountantModule', () => {
  let component: AccountantModule;
  let fixture: ComponentFixture<AccountantModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountantModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountantModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
