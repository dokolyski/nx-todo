import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksDataAccessModule } from '@todo-workspace/tasks/data-access';
import { TasksFeatureComponent } from './tasks-feature/tasks-feature.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  TasksContainerComponent,
  TasksUiTasksContainerModule
} from '@todo-workspace/tasks/ui-tasks-container';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TasksDataAccessModule,
    MatPaginatorModule,
    MatButtonModule,
    DragDropModule,
    TasksUiTasksContainerModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TasksContainerComponent },
      { path: 'edit/:id', component: TasksContainerComponent },
      { path: 'create', component: TasksContainerComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  declarations: [TasksFeatureComponent],
  exports: [TasksFeatureComponent]
})
export class TasksFeatureModule {}
