import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTeamComponent } from './dialog-team.component';

describe('DialogTeamComponent', () => {
  let component: DialogTeamComponent;
  let fixture: ComponentFixture<DialogTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
