import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as TasksActions from './tasks.actions';
import { Navigation, PaginatorState, Task } from '@todo-workspace/tasks/domain';
import { HttpErrorResponse } from '@angular/common/http';

export const TASKS_FEATURE_KEY = 'tasks';

export const NAVIGATION_DEFAULT = {
  dialogOpened: false,
  dialogType: null
};

export interface TasksState extends EntityState<Task> {
  loading: boolean; // has the Tasks list been loaded
  error: HttpErrorResponse | null; // last known error (if any)
  todoPagination: PaginatorState;
  donePagination: PaginatorState;
  navigation: Navigation;
}

export interface TasksPartialState {
  readonly tasks: TasksState;
}

export const tasksAdapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task) => task._id ?? '',
  sortComparer: (a, b) =>
    a.dueDate.toISOString().localeCompare(b.dueDate.toISOString())
});

export const initialState: TasksState = tasksAdapter.getInitialState({
  loading: false,
  error: null,
  todoPagination: {
    from: 0,
    limit: 5,
    tasksNumber: 0
  },
  donePagination: {
    from: 0,
    limit: 5,
    tasksNumber: 0
  },
  navigation: {
    ...NAVIGATION_DEFAULT
  }
});

const tasksReducer = createReducer(
  initialState,
  on(TasksActions.init, () => ({ ...initialState })),
  on(TasksActions.loadTasksSuccess, (state, { tasks }) =>
    tasksAdapter.setAll(tasks, {
      ...state,
      error: null,
      loading: false,
      todoPagination: {
        ...state.todoPagination,
        tasksNumber: tasks.reduce((s, c) => s + +!c.completed, 0)
      },
      donePagination: {
        ...state.donePagination,
        tasksNumber: tasks.reduce((s, c) => s + +c.completed, 0)
      }
    })
  ),
  on(TasksActions.loadTasksFailure, (state, { error }) =>
    tasksAdapter.removeAll({
      ...state,
      error,
      loading: false
    })
  ),
  on(TasksActions.loadTasksRequest, (state) => ({ ...state, loading: true })),
  on(TasksActions.taskCreate, (state, task) =>
    tasksAdapter.addOne(task, state)
  ),
  on(TasksActions.taskDelete, (state, { id }) =>
    tasksAdapter.removeOne(id, state)
  ),
  on(TasksActions.taskEdit, (state, task) =>
    tasksAdapter.upsertOne(task, state)
  ),
  on(TasksActions.changePageRequest, (state, changedPaginator) => ({
    ...state,
    ...changedPaginator
  })),
  on(TasksActions.openList, (state) => ({
    ...state,
    navigation: { ...NAVIGATION_DEFAULT }
  })),
  on(TasksActions.openEdit, (state, { id }) => ({
    ...state,
    navigation: {
      dialogOpened: true,
      dialogType: 'edit',
      taskId: id,
      selectedTask: state.entities[id]
    }
  })),
  on(TasksActions.openCreate, (state) => ({
    ...state,
    navigation: {
      dialogOpened: true,
      dialogType: 'create'
    }
  }))
);

export function reducer(state: TasksState | undefined, action: Action) {
  return tasksReducer(state, action);
}
