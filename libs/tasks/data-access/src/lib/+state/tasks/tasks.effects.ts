import { Inject, Injectable, Optional } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as TasksActions from './tasks.actions';
import { TasksDataService } from '../../services/tasks-data.service';
import { DEFAULT_LIST_LENGTH } from '../../resources/injection-tokens/default-list-length.injection';
import { TasksState } from './tasks.reducer';
import { Action } from '@ngrx/store';

@Injectable()
export class TasksEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.init),
      fetch({
        run: (): Action => {
          this.taskDataService.getData(0, this.defaultLength);
          // Your custom service 'load' logic goes here. For now just return a success action...
          return TasksActions.loadTasksSuccess({ tasks: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return TasksActions.loadTasksFailure({ error });
        }
      })
    )
  );

  loaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasksSuccess),
      fetch({
        run: (action, state: TasksState) => {
          return TasksActions.loadTasksSuccess({ tasks: this.taskDataService.getData(state.from, state.limit) });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return TasksActions.loadTasksFailure({ error });
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private taskDataService: TasksDataService,
    @Inject(DEFAULT_LIST_LENGTH) @Optional() private defaultLength: number) {
  }
}
