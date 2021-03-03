import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import * as assert from 'assert';
import { of } from 'rxjs';

@Component({
  selector: 'todo-workspace-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.scss'],
})
export class TaskFormDialogComponent implements OnInit {
  nameControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(80),
  ]);
  dueDateControl = new FormControl(new Date(Date.now()));

  controlArray = [this.nameControl, this.dueDateControl];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string },
    public dialogRef: MatDialogRef<TaskFormDialogComponent>
  ) {}

  ngOnInit(): void {}

  validateForm() {
    of(
      assert(
        !this.controlArray.some((value) => value.invalid),
        'Some form fields are invalid'
      )
    ).subscribe(() =>
      this.dialogRef.close({
        name: this.nameControl.value,
        dueDate: this.dueDateControl.value,
      })
    );
  }
}
