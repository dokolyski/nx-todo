import { Task } from '@todo-workspace/tasks/domain';
import { TasksState, tasksAdapter, initialState } from './tasks.reducer';
import * as TasksSelectors from './tasks.selectors';

describe('Tasks Selectors', () => {
  test.only('tests not ready!');

  const ERROR_MSG = 'No Error Available';
  const getTasksId = (it) => it['id'];
  const createTasksEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      dueDate: null
    } as Task);

  let state;

  beforeEach(() => {
    state = {
      tasks: tasksAdapter.setAll(
        [
          createTasksEntity('PRODUCT-AAA'),
          createTasksEntity('PRODUCT-BBB'),
          createTasksEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Tasks Selectors', () => {
    it('getAllTasks() should return the list of Tasks', () => {
      const results = TasksSelectors.getAllTasks(state);
      const selId = getTasksId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getTasksLoading() should return the current 'loading' status", () => {
      const result = TasksSelectors.getTasksLoading(state);
      expect(result).toBe(false);
    });

    it("getTasksError() should return the current 'error' state", () => {
      const result = TasksSelectors.getTasksError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
