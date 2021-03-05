import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Task, toDateTimeInputString } from '@todo-workspace/tasks/domain';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'todo-workspace-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormDialogComponent implements OnInit, OnDestroy {
  nameControl: FormControl;
  dueDateControl: FormControl;
  withDueDateControl = new FormControl(false);
  controlArray: FormControl[];
  private readonly destroy$ = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; task?: Task },
    public dialogRef: MatDialogRef<TaskFormDialogComponent>
  ) {}

  ngOnInit(): void {
    // init nameControl
    this.nameControl = new FormControl(this.data.task?.name ?? '', [
      Validators.required,
      Validators.maxLength(80)
    ]);

    const initialDateString = this.getInitialDateString();
    // init dueDateControl with initialDateString
    this.dueDateControl = new FormControl(initialDateString);

    // observe withDueDateControl.value changes and update dueDateControl validators
    this.withDueDateControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.withDueDateControl.value) {
          this.dueDateControl.setValidators((control) =>
            control.value === '' ? { empty: true } : null
          );
        } else {
          this.dueDateControl.clearValidators();
        }
      });

    // set withDueDate checkbox value depending on is initial date set
    if (initialDateString !== '') {
      this.withDueDateControl.setValue(true);
    }

    // controls array used to validation
    this.controlArray = [this.nameControl, this.dueDateControl];
  }

  validateForm() {
    if (!this.controlArray.some((control) => control.invalid)) {
      this.dialogRef.close({
        ...this.data.task,
        name: this.nameControl.value,
        dueDate:
          this.dueDateControl.value === '' ||
          this.withDueDateControl.value === false
            ? null
            : new Date(this.dueDateControl.value)
      });
    }
  }

  private getInitialDateString(): string {
    return this.data.task == null || this.data.task.dueDate != null
      ? toDateTimeInputString(new Date(this.data.task?.dueDate ?? Date.now()))
      : '';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
