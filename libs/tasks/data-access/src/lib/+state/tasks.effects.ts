import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as TasksActions from './tasks.actions';
import { TasksDataService } from '../services/tasks-data.service';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class TasksEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.init),
      fetch({
        run: (): Action => {
          return TasksActions.loadTasksRequest();
        }
      })
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasksRequest),
      mergeMap(() =>
        this.taskDataService
          .getAll()
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
        run: (task): Observable<Action> =>
          this.taskDataService
            .create(task)
            .pipe(map(() => TasksActions.loadTasksRequest())),
        onError: (action, error) => {
          console.error('Error', error);
          return TasksActions.loadTasksFailure({ error });
        }
      })
    )
  );

  edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.taskEdit),
      fetch({
        run: (task): Observable<Action> => {
          return this.taskDataService
            .update(task)
            .pipe(map(() => TasksActions.loadTasksRequest()));
        },
        onError: (action, error) => {
          console.error('Error', error);
          return TasksActions.loadTasksFailure({ error });
        }
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
            .pipe(map(() => TasksActions.loadTasksRequest())),
        onError: (action, error) => {
          console.error('Error', error);
          return TasksActions.loadTasksFailure({ error });
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private taskDataService: TasksDataService
  ) {}
}
