import { createAction, props } from '@ngrx/store';
import { PaginatorState, Task } from '@todo-workspace/tasks/domain';
import { HttpErrorResponse } from '@angular/common/http';

export const init = createAction('[Tasks] Init');

export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksRequest = createAction('[Tasks] Load Tasks Request');

export const changePageRequest = createAction(
  '[Tasks] Load Tasks Request',
  props<{ [key: string]: PaginatorState }>()
);

export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: HttpErrorResponse }>()
);

export const taskCreate = createAction('[Tasks] Create Task', props<Task>());

export const taskEdit = createAction('[Tasks] Edit Task', props<Task>());

export const taskDelete = createAction(
  '[Tasks] Delete Task',
  props<{ id: string }>()
);
