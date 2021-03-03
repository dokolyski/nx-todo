import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as TasksActions from './tasks.actions';
import { Task } from '../resources/models/task';

export const TASKS_FEATURE_KEY = 'tasks';

export interface TasksState extends EntityState<Task> {
  tasks: Task[];
  selectedId: number | null; // which Tasks record has been selected
  loaded: boolean; // has the Tasks list been loaded
  error: string | null; // last known error (if any)
  tasksNumber: number;
  limit: number | null;
  from: number;
}

export const tasksAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TasksState = tasksAdapter.getInitialState({
  tasks: [],
  loaded: true,
  selectedId: null,
  error: null,
  from: 0,
  limit: null,
  tasksNumber: 0,
});

const tasksReducer = createReducer(
  initialState,
  on(TasksActions.init, () => ({ ...initialState })),
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    loaded: true,
    tasks,
  })),
  on(TasksActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    error,
    loaded: true,
    tasks: [],
  })),
  on(TasksActions.loadTaskRequest, (state) => ({ ...state, loaded: false })),
  on(TasksActions.taskCreate, (state) => state),
  on(TasksActions.taskDelete, (state) => state),
  on(TasksActions.taskEdit, (state) => state)
);

export function reducer(state: TasksState | undefined, action: Action) {
  return tasksReducer(state, action);
}
