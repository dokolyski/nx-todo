import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as TasksActions from './tasks.actions';
import { Task } from '../../../../../resources/models/task';

export const TASKS_FEATURE_KEY = 'tasks';

export interface TasksState extends EntityState<Task> {
  tasks: Task[];
  selectedId?: string | number; // which Tasks record has been selected
  loaded: boolean; // has the Tasks list been loaded
  error?: string | null; // last known error (if any)
  from?: number;
  limit?: number;
}

export interface TasksPartialState {
  readonly [TASKS_FEATURE_KEY]: TasksState;
}

export const tasksAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TasksState = tasksAdapter.getInitialState({
  // set initial required properties
  tasks: [],
  loaded: false
});

const tasksReducer = createReducer(
  initialState,
  on(TasksActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(TasksActions.loadTasksSuccess, (state, { tasks }) =>
    tasksAdapter.setAll(tasks, { ...state, loaded: true })
  ),
  on(TasksActions.loadTasksFailure, (state, { error }) => ({ ...state, error })),
  on(TasksActions.loadTaskRequest, (state) => state),
  on(TasksActions.taskCreate, (state, { task }) => Object.assign(state, { tasks: [...state.tasks, task] })),
  on(TasksActions.taskDelete, (state, { id }) =>
    Object.assign(state, { tasks: state.tasks.splice(state.tasks.findIndex(task => task.id === id), 1) })
  ),
  on(TasksActions.taskEdit, (state, { task: editedTask }) =>
    Object.assign(state, { tasks: state.tasks.splice(state.tasks.findIndex(task => task.id === editedTask.id), 1, editedTask) })
  )
);

export function reducer(state: TasksState | undefined, action: Action) {
  return tasksReducer(state, action);
}
