import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormDialogComponent } from './component/task-form-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksDataAccessModule } from '@todo-workspace/tasks/data-access';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TasksDataAccessModule,
  ],
  declarations: [TaskFormDialogComponent],
  exports: [TaskFormDialogComponent],
})
export class TasksUiTaskFormDialogModule {}
