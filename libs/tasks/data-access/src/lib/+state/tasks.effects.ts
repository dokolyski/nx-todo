import { Inject, Injectable, Optional } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as TasksActions from './tasks.actions';
import { TasksDataService } from '../services/tasks-data.service';
import { DEFAULT_LIST_LENGTH } from '../resources/injection-tokens/default-list-length.injection';
import * as fromTasks from './tasks.reducer';
import { Action, Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TasksState } from './tasks.reducer';

@Injectable()
export class TasksEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.init),
      fetch({
        run: (): Action => {
          return TasksActions.loadTaskRequest({});
        },
      })
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTaskRequest),
      withLatestFrom(
        this.store$.pipe(map((state) => state[fromTasks.TASKS_FEATURE_KEY]))
      ),
      mergeMap(([a, s]: [Action, TasksState]) =>
        this.taskDataService
          .getAll(s.from ?? 0, s.limit)
          .pipe(map((tasks) => TasksActions.loadTasksSuccess({ tasks })))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(TasksActions.loadTasksFailure({ error }));
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.taskCreate),
      fetch({
        run: (action): Observable<Action> =>
          this.taskDataService
            .create(action.task)
            .pipe(map(() => TasksActions.loadTaskRequest({ from: 1 }))),
        onError: (action, error) => {
          console.error('Error', error);
          return TasksActions.loadTasksFailure({ error });
        },
      })
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.taskEdit),
      fetch({
        run: (action): Observable<Action> => {
          return this.taskDataService
            .update(action.task)
            .pipe(map(() => TasksActions.loadTaskRequest({})));
        },
        onError: (action, error) => {
          console.error('Error', error);
          return TasksActions.loadTasksFailure({ error });
        },
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.taskDelete),
      fetch({
        run: (action): Observable<Action> =>
          this.taskDataService
            .delete(action.id)
            .pipe(map(() => TasksActions.loadTaskRequest({}))),
        onError: (action, error) => {
          console.error('Error', error);
          return TasksActions.loadTasksFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private taskDataService: TasksDataService,
    @Inject(DEFAULT_LIST_LENGTH) @Optional() private defaultLength: number,
    private store$: Store<{ tasks: fromTasks.TasksState }>
  ) {}
}
