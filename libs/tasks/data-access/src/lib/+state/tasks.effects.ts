import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataPersistence, fetch } from '@nrwl/angular';
import * as TasksActions from './tasks.actions';
import { TasksDataService } from '../services/tasks-data.service';
import { Action } from '@ngrx/store';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TasksPartialState } from './tasks.reducer';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Router } from '@angular/router';

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

  // router events service

  routerEventToEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter(
        // filter edit
        (action: RouterNavigationAction) =>
          action.payload.routerState.url.startsWith('/edit/') &&
          action.payload.routerState.root?.firstChild?.params?.id !== undefined
      ),
      map((action) =>
        TasksActions.openEdit({
          id: action.payload.routerState.root.firstChild.params.id
        })
      )
    )
  );

  routerEventToCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((action: RouterNavigationAction) =>
        action.payload.routerState.url.startsWith('/create')
      ),
      map(() => TasksActions.openCreate())
    )
  );

  routerEventToList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter(
        (action: RouterNavigationAction) =>
          action.payload.routerState.url === '' ||
          action.payload.routerState.url === '/'
      ),
      map(() => TasksActions.openList())
    )
  );

  // navigation requests service

  navigateToEdit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.navigateToEdit),
        tap((action) => this.router.navigateByUrl(`/edit/${action.id}`)),
        catchError((error) => {
          console.error('Error', error);
          return of(TasksActions.navigateToList());
        })
      ),
    { dispatch: false }
  );

  navigateToCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.navigateToCreate),
        tap(() => this.router.navigateByUrl(`/create`))
      ),
    { dispatch: false }
  );

  navigateToList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.navigateToList),
        tap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private taskDataService: TasksDataService,
    private dp: DataPersistence<TasksPartialState>,
    private router: Router
  ) {}
}
