import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Task } from '../resources/models/task';

import * as TasksActions from './tasks.actions';
import { getAllTasks } from './tasks.selectors';
import * as fromTasks from './tasks.reducer';

@Injectable()
export class TasksFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  tasks$ = this.store$.select(getAllTasks);

  constructor(private store$: Store<{ tasks: fromTasks.TasksState }>) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store$.dispatch(TasksActions.init());
  }

  create(task: Task) {
    this.store$.dispatch(TasksActions.taskCreate({ task }));
  }
}
