import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { TasksEntity } from './tasks.models';
import { TasksEffects } from './tasks.effects';
import { TasksFacade } from './tasks.facade';

import * as TasksSelectors from './tasks.selectors';
import * as TasksActions from './tasks.actions';
import {
  TASKS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './tasks.reducer';

interface TestSchema {
  tasks: State;
}

describe('TasksFacade', () => {
  let facade: TasksFacade;
  let store: Store<TestSchema>;
  const createTasksEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TasksEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TASKS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([TasksEffects]),
        ],
        providers: [TasksFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
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
        let list = await readFirst(facade.allTasks$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allTasks$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

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
        let list = await readFirst(facade.allTasks$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          TasksActions.loadTasksSuccess({
            tasks: [createTasksEntity('AAA'), createTasksEntity('BBB')],
          })
        );

        list = await readFirst(facade.allTasks$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
