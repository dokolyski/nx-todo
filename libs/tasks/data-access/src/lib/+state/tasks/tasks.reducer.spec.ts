import { TasksEntity } from '../../../../../resources/models/task';
import * as TasksActions from './tasks.actions';
import { State, initialState, reducer } from './tasks.reducer';

describe('Tasks Reducer', () => {
  const createTasksEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TasksEntity);

  beforeEach(() => {});

  describe('valid Tasks actions', () => {
    it('loadTasksSuccess should return set the list of known Tasks', () => {
      const tasks = [
        createTasksEntity('PRODUCT-AAA'),
        createTasksEntity('PRODUCT-zzz'),
      ];
      const action = TasksActions.loadTasksSuccess({ tasks });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
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
