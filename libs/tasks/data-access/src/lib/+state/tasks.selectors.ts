import { TASKS_FEATURE_KEY, TasksState } from './tasks.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// Lookup the 'Tasks' feature state managed by NgRx
export const getTasksState = createFeatureSelector<TasksState>(
  TASKS_FEATURE_KEY
);

export const getAllTasks = createSelector(
  getTasksState,
  (state) => state.tasks
);

export const getTasksLoading = createSelector(
  getTasksState,
  (state: TasksState) => state.loading
);

export const getTasksError = createSelector(
  getTasksState,
  (state: TasksState) => state.error
);

export const getTodoPaginationState = createSelector(
  getTasksState,
  (state: TasksState) => state.todoPagination
);

export const getDonePaginationState = createSelector(
  getTasksState,
  (state: TasksState) => state.donePagination
);
