import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTasks from './+state/tasks.reducer';
import { TasksEffects } from './+state/tasks.effects';
import { TasksFacade } from './+state/tasks.facade';
import { STORAGE_ITEM_CONFIG } from './resources/injection-tokens/storage-item-config.injection';
import { DEFAULT_LIST_LENGTH } from './resources/injection-tokens/default-list-length.injection';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksDataService } from './services/tasks-data.service';
import { TASKS_API } from './resources/injection-tokens/tasks-api.injection';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromTasks.TASKS_FEATURE_KEY, fromTasks.reducer),
    EffectsModule.forFeature([TasksEffects]),
    BrowserAnimationsModule,
  ],
  providers: [
    TasksFacade,
    TasksDataService,
    { provide: STORAGE_ITEM_CONFIG, useValue: 'todos' },
    { provide: DEFAULT_LIST_LENGTH, useValue: 10 },
    { provide: TASKS_API, useValue: '/api/task' },
  ],
})
export class TasksDataAccessModule {}
