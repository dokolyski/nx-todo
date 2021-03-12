import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  SnackbarService,
  TasksFacade
} from '@todo-workspace/tasks/data-access';
import { OpenDialogPayload, Task } from '@todo-workspace/tasks/domain';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormDialogComponent } from '@todo-workspace/tasks/ui-task-form-dialog';

@Component({
  selector: 'todo-workspace-tasks-feature',
  templateUrl: './tasks-feature.component.html',
  styleUrls: ['./tasks-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksFeatureComponent implements OnInit, OnDestroy {
  readonly destroy$ = new Subject<void>();
  readonly todoPage$ = this.tasksFacade.todoPage$;
  readonly donePage$ = this.tasksFacade.donePage$;
  readonly loading$ = this.tasksFacade.loading$;
  readonly tasks$ = this.tasksFacade.tasks$;
  readonly error$ = this.tasksFacade.error$;

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
  }

  openDialog(payload: OpenDialogPayload) {
    let title: string;
    let onSuccessMethod: (this: TasksFacade, Task) => void;
    if (payload.type === 'create') {
      title = 'Add new task:';
      onSuccessMethod = this.tasksFacade.create;
    } else if (payload.type === 'edit') {
      title = 'Edit this task:';
      onSuccessMethod = this.tasksFacade.update;
    }

    this.matDialog
      .open(TaskFormDialogComponent, {
        data: { title: title, task: payload.task }
      })
      .afterClosed()
      .subscribe((receivedTask: Task) => {
        if (receivedTask) {
          onSuccessMethod.call(this.tasksFacade, receivedTask);
        }
      });
  }
}
