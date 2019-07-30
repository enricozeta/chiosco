import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoppaChioscoComponent } from './coppa-chiosco.component';

describe('CoppaChioscoComponent', () => {
  let component: CoppaChioscoComponent;
  let fixture: ComponentFixture<CoppaChioscoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoppaChioscoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoppaChioscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
