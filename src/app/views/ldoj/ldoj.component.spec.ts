import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdojComponent } from './ldoj.component';

describe('LdojComponent', () => {
  let component: LdojComponent;
  let fixture: ComponentFixture<LdojComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LdojComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LdojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
