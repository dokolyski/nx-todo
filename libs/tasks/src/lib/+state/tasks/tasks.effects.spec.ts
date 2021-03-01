import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { TasksEffects } from './tasks.effects';
import * as TasksActions from './tasks.actions';

describe('TasksEffects', () => {
  let actions: Observable<any>;
  let effects: TasksEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        TasksEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(TasksEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TasksActions.init() });

      const expected = hot('-a-|', {
        a: TasksActions.loadTasksSuccess({ tasks: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
