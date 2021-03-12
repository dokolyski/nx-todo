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
import {
  Navigation,
  OpenDialogPayload,
  Task
} from '@todo-workspace/tasks/domain';
import { Observable, of, Subject } from 'rxjs';
import { filter, first, map, takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskFormDialogComponent } from '@todo-workspace/tasks/ui-task-form-dialog';

@Component({
  selector: 'todo-workspace-tasks-feature',
  templateUrl: './tasks-feature.component.html',
  styleUrls: ['./tasks-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksFeatureComponent implements OnInit, OnDestroy {
  private dialogRef: MatDialogRef<TaskFormDialogComponent>;
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

    this.tasksFacade.navigation$
      .pipe(takeUntil(this.destroy$))
      .subscribe((navigationState) => {
        if (navigationState.dialogOpened) {
          this.prepareDialog(navigationState).subscribe();
        } else {
          this.dialogRef?.close();
        }
      });
  }

  prepareDialog(navigationState: Navigation): Observable<void> {
    let title: string;
    let onSuccessMethod: (this: TasksFacade, Task) => void;
    if (navigationState.dialogType === 'create') {
      title = 'Add new task:';
      onSuccessMethod = this.tasksFacade.create;
    } else if (navigationState.dialogType === 'edit') {
      title = 'Edit this task:';
      onSuccessMethod = this.tasksFacade.update;
      if (!navigationState.selectedTask) {
        // tasks can not be loaded before openEditDialog request occurs
        return this.tasksFacade.getTask(navigationState.taskId).pipe(
          filter((task) => task !== undefined),
          first(),
          map((task) => this.openDialog(title, onSuccessMethod, task))
        );
      }
    }

    return of(
      this.openDialog(title, onSuccessMethod, navigationState.selectedTask)
    );
  }

  dispatchNavigateToDialogEvent(payload: OpenDialogPayload) {
    if (payload.type === 'edit') {
      this.tasksFacade.navigateToEdit(payload.task._id);
    } else if (payload.type === 'create') {
      this.tasksFacade.navigateToCreate();
    }
  }

  private openDialog(
    title: string,
    onSuccessMethod: (this: TasksFacade, Task) => void,
    task?: Task
  ) {
    this.dialogRef?.close(); // close previous dialog if it's still opened
    this.dialogRef = this.matDialog.open(TaskFormDialogComponent, {
      data: { title, task }
    });

    this.dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((receivedTask: Task) => {
        this.tasksFacade.navigateToList();
        if (receivedTask) {
          onSuccessMethod.call(this.tasksFacade, receivedTask);
        }
      });
  }
}
