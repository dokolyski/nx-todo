import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { TasksEffects } from './tasks.effects';
import { TasksFacade } from './tasks.facade';

import * as TasksActions from './tasks.actions';
import { TASKS_FEATURE_KEY, TasksState, reducer } from './tasks.reducer';
import { Task } from '@todo-workspace/tasks/domain';

interface TestSchema {
  tasks: TasksState;
}

describe('TasksFacade', () => {
  test.only('tests not ready!');
  let facade: TasksFacade;
  let store: Store<TestSchema>;
  const createTasksEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      dueDate: null
    } as Task);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TASKS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([TasksEffects])
        ],
        providers: [TasksFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(TasksFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.tasks$);
        expect(list.length).toBe(0);
        facade.init();
        list = await readFirst(facade.tasks$);
        expect(list.length).toBe(0);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadTasksSuccess` to manually update list
     */
    it('allTasks$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.tasks$);

        expect(list.length).toBe(0);

        store.dispatch(
          TasksActions.loadTasksSuccess({
            tasks: [createTasksEntity('AAA'), createTasksEntity('BBB')]
          })
        );

        list = await readFirst(facade.tasks$);

        expect(list.length).toBe(2);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
