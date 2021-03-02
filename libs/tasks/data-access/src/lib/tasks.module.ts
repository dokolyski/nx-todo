import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTasks from './+state/tasks/tasks.reducer';
import { TasksEffects } from './+state/tasks/tasks.effects';
import { TasksFacade } from './+state/tasks/tasks.facade';
import { STORAGE_ITEM_CONFIG } from '../../../resources/injection-tokens/storage-item-config.injection';
import { DEFAULT_LIST_LENGTH } from '../../../resources/injection-tokens/default-list-length.injection';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTasks.TASKS_FEATURE_KEY, fromTasks.reducer),
    EffectsModule.forFeature([TasksEffects]),
    BrowserAnimationsModule
  ],
  providers: [
    TasksFacade,
    { provide: STORAGE_ITEM_CONFIG, useValue: 'todos' },
    { provide: DEFAULT_LIST_LENGTH, useValue: 10 }
  ],
})
export class TasksModule {
}
