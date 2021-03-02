import { createAction, props } from '@ngrx/store';
import { Task } from '../../resources/models/task';

export const init = createAction('[Tasks] Init');

export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const loadTaskRequest = createAction('[Tasks] Load Tasks Request');

export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: string }>()
);

export const taskCreate = createAction(
  '[Tasks] Create Task',
  props<{ task: Task }>()
);

export const taskEdit = createAction(
  '[Tasks] Edit Task',
  props<{ task: Task }>()
);

export const taskDelete = createAction(
  '[Tasks] Delete Task',
  props<{ id: string }>()
);
