import { createAction, props } from '@ngrx/store';
import { TasksEntity } from './tasks.models';

export const init = createAction('[Tasks Page] Init');

export const loadTasksSuccess = createAction(
  '[Tasks/API] Load Tasks Success',
  props<{ tasks: TasksEntity[] }>()
);

export const loadTasksFailure = createAction(
  '[Tasks/API] Load Tasks Failure',
  props<{ error: string }>()
);

export const taskCreate = createAction(
  '[Tasks/API] Create Task',
  props<{ task: TasksEntity }>()
);

export const taskEdit = createAction(
  '[Tasks/API] Delete Task',
  props<{ task: TasksEntity }>()
);

export const taskDelete = createAction(
  '[Tasks/API] Delete Task',
  props<{ id: string }>()
);
