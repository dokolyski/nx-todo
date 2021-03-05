import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import { TaskFormDialogComponent } from './task-form-dialog.component';
import { TasksUiTaskFormDialogModule } from '@todo-workspace/tasks/ui-task-form-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('TaskFormDialogComponent to edit existing task', () => {
  let component: TaskFormDialogComponent;
  let fixture: ComponentFixture<TaskFormDialogComponent>;
  let matDialogRefMock;
  let confirmButton: HTMLElement;

  const injectedData = {
    title: 'title'
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

  it('should create with not all data injected', () => {
    expect(component).toBeTruthy();
  });

  it('name control should contains default values when specific data is not injected', () => {
    expect(component.nameControl.value).toEqual('');
  });

  it('date control should contains default values when specific data is not injected', () => {
    expect(component.dueDateControl.value).toMatch(
      /^\d{4}-\d{2}-\d{2}T(\d{2}:\d{2})?$/
    );
  });

  it('click on confirm button when there are some invalid fields should NOT cause close of the dialog', fakeAsync((
    done
  ) => {
    try {
      const closeSpy = jest.spyOn(component.dialogRef, 'close');
      confirmButton.click();
      tick();
      fixture.detectChanges();
      expect(closeSpy).not.toHaveBeenCalled();
      done();
    } catch (e) {
      done(e);
    }
  }));

  it(
    'click on confirm button when there are some invalid fields should be equals existing ' +
      'fields with ng-invalid property in components DOM subtree',
    (done) => {
      try {
        confirmButton.click();
        fixture.whenStable().then(() => {
          expect(
            fixture.nativeElement.querySelectorAll('.ng-invalid').length > 0
          ).toBeTruthy();
          done();
        });
      } catch (e) {
        done(e);
      }
    }
  );

  it('dueDate input should not exist after withDueDate checkbox was clicked', async () => {
    const dueDateCheckbox: HTMLInputElement = fixture.debugElement.query(
      By.css('#dd-check-input')
    ).nativeElement;
    // initially withDueDate should be true
    expect(component.withDueDateControl.value).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('#date-input')).nativeElement != null
    ).toBeTruthy();

    dueDateCheckbox.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.withDueDateControl.value).toBeFalsy();
    expect(
      fixture.nativeElement.querySelector('#date-input') == null
    ).toBeTruthy();
  });

  it('putting not valid text will cause empty value of dueDateFormControl', fakeAsync(() => {
    const dateInput: HTMLInputElement = fixture.nativeElement.querySelector(
      '#date-input'
    );
    expect(component.dueDateControl.value !== '').toBeTruthy();
    dateInput.value = 'haha xd';
    dateInput.dispatchEvent(new Event('input'));
    tick();
    expect(component.dueDateControl.value === '').toBeTruthy();
  }));
});
