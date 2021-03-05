import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import { TaskFormDialogComponent } from './task-form-dialog.component';
import { Task } from '@todo-workspace/tasks/domain';
import { TasksUiTaskFormDialogModule } from '@todo-workspace/tasks/ui-task-form-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('TaskFormDialogComponent to edit existing task', () => {
  let component: TaskFormDialogComponent;
  let fixture: ComponentFixture<TaskFormDialogComponent>;
  let matDialogRefMock;
  let confirmButton: HTMLElement;

  const injectedData = {
    title: 'title',
    task: { dueDate: new Date(Date.now()), name: 'Name' } as Task
  };

  beforeEach(async () => {
    matDialogRefMock = {
      close: jest.fn(() => fixture.destroy())
    };

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: injectedData
        },
        {
          provide: MatDialogRef,
          useValue: matDialogRefMock
        }
      ],
      imports: [TasksUiTaskFormDialogModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    confirmButton = fixture.nativeElement.querySelector('#confirm-button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('name and date control should contain injected data', () => {
    expect(component.nameControl.value).toEqual('Name');
  });

  it('click on confirm button should cause fields validation', () => {
    const validateSpy = jest.spyOn(component, 'validateForm');

    confirmButton.click();
    fixture.whenStable().then(() => {
      expect(validateSpy).toHaveBeenCalled();
    });
  });

  it('click on confirm button when all fields are valid should cause close of the dialog', fakeAsync((
    done
  ) => {
    try {
      const closeSpy = jest.spyOn(component.dialogRef, 'close');
      confirmButton.click();
      tick();
      fixture.detectChanges();
      expect(closeSpy).toHaveBeenCalled();
      done();
    } catch (e) {
      done(e);
    }
  }));

  it(
    'click on confirm button when there are all valid fields should be equals not existing ' +
      'fields with ng-invalid property in components DOM subtree',
    fakeAsync((done) => {
      try {
        confirmButton.click();
        tick();
        fixture.detectChanges();
        expect(
          fixture.nativeElement.querySelectorAll('.ng-invalid').length === 0
        ).toBeTruthy();
        done();
      } catch (e) {
        done(e);
      }
    })
  );
});
