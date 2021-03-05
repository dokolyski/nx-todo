import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { TasksEffects } from './tasks.effects';
import * as TasksActions from './tasks.actions';

describe('TasksEffects', () => {
  test.only('tests not ready!');

  let actions: Observable<any>;
  let effects: TasksEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        TasksEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(TasksEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TasksActions.init() });

      const expected = hot('-a-|', {
        a: TasksActions.loadTasksSuccess({ tasks: [] })
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
