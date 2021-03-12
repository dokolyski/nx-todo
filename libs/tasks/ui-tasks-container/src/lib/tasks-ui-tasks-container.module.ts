import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksContainerComponent } from './tasks-container/tasks-container.component';
import { TasksUiTasksListModule } from '@todo-workspace/tasks/ui-tasks-list';
import { TasksUiTaskFormDialogModule } from '@todo-workspace/tasks/ui-task-form-dialog';
import { TasksUiProgressSpinnerOverlayModule } from '@todo-workspace/tasks/ui-progress-spinner-overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TasksDomainModule } from '@todo-workspace/tasks/domain';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    TasksUiTasksListModule,
    TasksUiTaskFormDialogModule,
    TasksUiProgressSpinnerOverlayModule,
    DragDropModule,
    TasksDomainModule,
    MatButtonModule
  ],
  declarations: [TasksContainerComponent],
  exports: [TasksContainerComponent]
})
export class TasksUiTasksContainerModule {}
