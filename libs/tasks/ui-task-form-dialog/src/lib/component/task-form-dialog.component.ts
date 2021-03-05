import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Task } from '@todo-workspace/tasks/domain';

@Component({
  selector: 'todo-workspace-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormDialogComponent implements OnInit {
  nameControl: FormControl;
  dueDateControl: FormControl;
  controlArray: FormControl[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; task?: Task },
    public dialogRef: MatDialogRef<TaskFormDialogComponent>
  ) {}

  ngOnInit(): void {
    this.nameControl = new FormControl(this.data.task?.name ?? '', [
      Validators.required,
      Validators.maxLength(80),
    ]);
    const initialDate = new Date(this.data.task?.dueDate ?? Date.now());
    this.dueDateControl = new FormControl(
      this.toDateTimeInputString(initialDate)
    );
    this.controlArray = [this.nameControl, this.dueDateControl];
  }

  validateForm() {
    if (this.controlArray.some((value) => value.invalid)) {
      throw 'Some form fields are invalid';
    }
    this.dialogRef.close({
      ...this.data.task,
      name: this.nameControl.value,
      dueDate: new Date(this.dueDateControl.value),
    });
  }

  private toDateTimeInputString(date: Date): string {
    return `${date.toISOString().split('T')[0]}T${date
      .toTimeString()
      .substr(0, 5)}`;
  }
}
