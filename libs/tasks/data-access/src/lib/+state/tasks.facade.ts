import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { ChangePagePayload, Task } from '@todo-workspace/tasks/domain';

import * as TasksActions from './tasks.actions';
import {
  getAllTasks,
  getDonePaginationState,
  getNavigationState,
  getTaskById,
  getTasksError,
  getTasksLoading,
  getTodoPaginationState
} from './tasks.selectors';
import { TasksPartialState } from './tasks.reducer';
import { first, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  navigation$ = this.store$.select(getNavigationState);

  constructor(private store$: Store<TasksPartialState>) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store$.dispatch(TasksActions.init());
  }

  changePage(payload: ChangePagePayload) {
    const newPagination = {
      from: payload.event.pageIndex * payload.event.pageSize,
      limit: payload.event.pageSize,
      tasksNumber: payload.tasksNumber
    };
    if (payload.type === 'todo') {
      this.store$.dispatch(
        TasksActions.changePageRequest({
          todoPagination: newPagination
        })
      );
    } else if (payload.type === 'done') {
      this.store$.dispatch(
        TasksActions.changePageRequest({
          donePagination: newPagination
        })
      );
    }
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

  navigateToList() {
    this.store$.dispatch(TasksActions.navigateToList());
  }

  navigateToEdit(id: string) {
    this.store$.dispatch(TasksActions.navigateToEdit({ id }));
  }

  navigateToCreate() {
    this.store$.dispatch(TasksActions.navigateToCreate());
  }

  getTask(id: string): Observable<Task> {
    return this.store$.pipe(select(getTaskById, id));
  }
}
