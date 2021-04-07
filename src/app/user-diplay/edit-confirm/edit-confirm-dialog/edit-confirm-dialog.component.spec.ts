import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfirmDialogComponent } from './edit-confirm-dialog.component';

describe('EditConfirmDialogComponent', () => {
  let component: EditConfirmDialogComponent;
  let fixture: ComponentFixture<EditConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
