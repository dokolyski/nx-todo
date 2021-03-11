import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as TasksActions from './tasks.actions';
import { PaginatorState, Task } from '@todo-workspace/tasks/domain';
import { HttpErrorResponse } from '@angular/common/http';

export const TASKS_FEATURE_KEY = 'tasks';

export interface TasksState extends EntityState<Task> {
  tasks: Task[];
  loading: boolean; // has the Tasks list been loaded
  error: HttpErrorResponse | null; // last known error (if any)
  todoPagination: PaginatorState;
  donePagination: PaginatorState;
}

export const tasksAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TasksState = tasksAdapter.getInitialState({
  tasks: [],
  loading: false,
  error: null,
  todoPagination: {
    from: 0,
    limit: 5,
    tasksNumber: 0,
  },
  donePagination: {
    from: 0,
    limit: 5,
    tasksNumber: 0,
  },
});

const tasksReducer = createReducer(
  initialState,
  on(TasksActions.init, () => ({ ...initialState })),
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    loading: false,
    tasks,
    todoPagination: {
      ...state.todoPagination,
      tasksNumber: tasks.reduce((s, c) => s + +!c.completed, 0),
    },
    donePagination: {
      ...state.donePagination,
      tasksNumber: tasks.reduce((s, c) => s + +c.completed, 0),
    },
  })),
  on(TasksActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(TasksActions.loadTasksRequest, (state) => ({ ...state, loading: true })),
  on(TasksActions.taskCreate, (state) => state),
  on(TasksActions.taskDelete, (state) => state),
  on(TasksActions.taskEdit, (state) => state),
  on(TasksActions.changePageRequest, (state, changedPaginator) => ({
    ...state,
    ...changedPaginator,
  }))
);

export function reducer(state: TasksState | undefined, action: Action) {
  return tasksReducer(state, action);
}
