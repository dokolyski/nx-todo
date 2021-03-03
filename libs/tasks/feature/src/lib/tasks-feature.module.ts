import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksDataAccessModule } from '@todo-workspace/tasks/data-access';
import { TasksFeatureComponent } from './tasks-feature/tasks-feature.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CompletePipe } from './pipes/complete.pipe';
import { MatButtonModule } from '@angular/material/button';
import { TasksUiTasksListModule } from '@todo-workspace/tasks/ui-tasks-list';
import { TasksUiTaskFormDialogModule } from '@todo-workspace/tasks/ui-task-form-dialog';

@NgModule({
  imports: [
    CommonModule,
    TasksDataAccessModule,
    MatPaginatorModule,
    MatButtonModule,
    TasksUiTasksListModule,
    TasksUiTaskFormDialogModule,
  ],
  declarations: [TasksFeatureComponent, CompletePipe],
  exports: [TasksFeatureComponent],
})
export class TasksFeatureModule {}
