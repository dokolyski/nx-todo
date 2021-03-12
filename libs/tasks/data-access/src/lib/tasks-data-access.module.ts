import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsFeatureModule, EffectsModule } from '@ngrx/effects';
import * as fromTasks from './+state/tasks.reducer';
import { TasksEffects } from './+state/tasks.effects';
import { TasksFacade } from './+state/tasks.facade';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksDataService } from './services/tasks-data.service';
import { TASKS_API } from '@todo-workspace/tasks/domain';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataPersistence } from '@nrwl/angular';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromTasks.TASKS_FEATURE_KEY, fromTasks.reducer),
    EffectsModule.forFeature([TasksEffects]),
    BrowserAnimationsModule,
    MatSnackBarModule,
    EffectsFeatureModule
  ],
  providers: [
    TasksFacade,
    TasksDataService,
    { provide: TASKS_API, useValue: '/api/task' },
    DataPersistence
  ]
})
export class TasksDataAccessModule {}
