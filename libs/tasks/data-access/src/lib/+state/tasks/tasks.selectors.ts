import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TASKS_FEATURE_KEY,
  TasksState,
  TasksPartialState,
  tasksAdapter,
} from './tasks.reducer';

// Lookup the 'Tasks' feature state managed by NgRx
export const getTasksState = createFeatureSelector<TasksPartialState, TasksState>(
  TASKS_FEATURE_KEY
);

const { selectAll, selectEntities } = tasksAdapter.getSelectors();

export const getTasksLoaded = createSelector(
  getTasksState,
  (state: TasksState) => state.loaded
);

export const getTasksError = createSelector(
  getTasksState,
  (state: TasksState) => state.error
);

export const getAllTasks = createSelector(getTasksState, (state: TasksState) =>
  selectAll(state)
);

export const getTasksEntities = createSelector(getTasksState, (state: TasksState) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getTasksState,
  (state: TasksState) => state.selectedId
);

export const getSelected = createSelector(
  getTasksEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
