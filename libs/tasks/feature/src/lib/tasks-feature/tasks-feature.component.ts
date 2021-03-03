import { Component, OnInit } from '@angular/core';
import { Task, TasksFacade } from '@todo-workspace/tasks/data-access';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormDialogComponent } from '@todo-workspace/tasks/ui-task-form-dialog';

@Component({
  selector: 'todo-workspace-tasks-feature',
  templateUrl: './tasks-feature.component.html',
  styleUrls: ['./tasks-feature.component.scss'],
})
export class TasksFeatureComponent implements OnInit {
  tasks$: Observable<Task[]>;
  constructor(private tasksFacade: TasksFacade, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.tasksFacade.init();
    this.tasks$ = this.tasksFacade.tasks$;
  }

  openCreateDialog() {
    this.matDialog
      .open(TaskFormDialogComponent, { data: { title: 'Add new task:' } })
      .afterClosed()
      .subscribe((value: Task) => {
        if (value != null) {
          this.tasksFacade.create(value);
        }
      });
  }
}
