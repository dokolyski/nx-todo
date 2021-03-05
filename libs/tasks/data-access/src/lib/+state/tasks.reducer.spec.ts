import * as TasksActions from './tasks.actions';
import { initialState, reducer, TasksState } from './tasks.reducer';
import { Task } from '@todo-workspace/tasks/domain';

describe('Tasks Reducer', () => {
  test.only('tests not ready!');

  const createTasksEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      dueDate: null
    } as Task);

  beforeEach(() => {});

  describe('valid Tasks actions', () => {
    it('loadTasksSuccess should return set the list of known Tasks', () => {
      const tasks = [
        createTasksEntity('PRODUCT-AAA'),
        createTasksEntity('PRODUCT-zzz')
      ];
      const action = TasksActions.loadTasksSuccess({ tasks });

      const result: TasksState = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
