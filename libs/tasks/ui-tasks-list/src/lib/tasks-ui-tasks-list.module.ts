import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './component/tasks-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDividerModule,
    DragDropModule
  ],
  declarations: [TasksListComponent],
  exports: [TasksListComponent]
})
export class TasksUiTasksListModule {}
