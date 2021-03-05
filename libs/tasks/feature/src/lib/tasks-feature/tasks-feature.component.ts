import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  SnackbarService,
  TasksFacade,
} from '@todo-workspace/tasks/data-access';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormDialogComponent } from '@todo-workspace/tasks/ui-task-form-dialog';
import { Task } from '@todo-workspace/tasks/domain';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'todo-workspace-tasks-feature',
  templateUrl: './tasks-feature.component.html',
  styleUrls: ['./tasks-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksFeatureComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  readonly destroy$ = new Subject<void>();
  readonly todoPage$ = this.tasksFacade.todoPage$;
  readonly donePage$ = this.tasksFacade.donePage$;
  readonly loading$ = this.tasksFacade.loading$;

  constructor(
    public tasksFacade: TasksFacade,
    private matDialog: MatDialog,
    private snackbar: SnackbarService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.tasksFacade.init();

    this.tasksFacade.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        this.snackbar.open(error);
      });

    this.tasksFacade.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => (this.tasks = tasks));
  }

  openCreateDialog() {
    this.openDialog('Add new task:', this.tasksFacade.create);
  }

  openEditDialog(task: Task) {
    this.openDialog('Edit this task:', this.tasksFacade.update, task);
  }

  private openDialog(
    title: string,
    onSuccessMethod: (this: TasksFacade, Task) => void,
    task?: Task
  ) {
    this.matDialog
      .open(TaskFormDialogComponent, {
        data: { title, task },
      })
      .afterClosed()
      .subscribe((receivedTask: Task) => {
        if (receivedTask) {
          onSuccessMethod.call(this.tasksFacade, receivedTask);
        }
      });
  }
}
