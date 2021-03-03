import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './component/tasks-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatExpansionModule, MatDialogModule, MatButtonModule],
  declarations: [TasksListComponent],
  exports: [TasksListComponent],
})
export class TasksUiTasksListModule {}
