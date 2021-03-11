import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Task } from '@todo-workspace/tasks/domain';

import * as TasksActions from './tasks.actions';
import {
  getAllTasks,
  getDonePaginationState,
  getTasksError,
  getTasksLoading,
  getTodoPaginationState,
} from './tasks.selectors';
import * as fromTasks from './tasks.reducer';
import { PageEvent } from '@angular/material/paginator';

@Injectable()
export class TasksFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  tasks$ = this.store$.select(getAllTasks);
  todoPage$ = this.store$.select(getTodoPaginationState);
  donePage$ = this.store$.select(getDonePaginationState);
  error$ = this.store$.select(getTasksError);
  loading$ = this.store$.select(getTasksLoading);

  constructor(private store$: Store<{ tasks: fromTasks.TasksState }>) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store$.dispatch(TasksActions.init());
  }

  changePageTodo(pageEvent: PageEvent, tasksNumber: number) {
    this.store$.dispatch(
      TasksActions.changePageRequest({
        todoPagination: {
          from: pageEvent.pageIndex * pageEvent.pageSize,
          limit: pageEvent.pageSize,
          tasksNumber,
        },
      })
    );
  }

  changePageDone(pageEvent: PageEvent, tasksNumber: number) {
    this.store$.dispatch(
      TasksActions.changePageRequest({
        donePagination: {
          from: pageEvent.pageIndex * pageEvent.pageSize,
          limit: pageEvent.pageSize,
          tasksNumber,
        },
      })
    );
  }

  create(task: Task) {
    this.store$.dispatch(TasksActions.taskCreate(task));
  }

  update(task: Task) {
    this.store$.dispatch(TasksActions.taskEdit(task));
  }

  delete(taskId: string) {
    this.store$.dispatch(TasksActions.taskDelete({ id: taskId }));
  }

  changeCompletion(task: Task) {
    this.store$.dispatch(
      TasksActions.taskEdit({ ...task, completed: !task.completed })
    );
  }
}
