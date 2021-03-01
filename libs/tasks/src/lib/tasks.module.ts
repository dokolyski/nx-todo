import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProducts from './+state/products/products.reducer';
import { ProductsEffects } from './+state/products/products.effects';
import { ProductsFacade } from './+state/products/products.facade';
import * as fromProducts from './+state/tasks/products.reducer';
import { ProductsEffects } from './+state/tasks/products.effects';
import { ProductsFacade } from './+state/tasks/products.facade';
import * as fromTasks from './+state/tasks/tasks.reducer';
import { TasksEffects } from './+state/tasks/tasks.effects';
import { TasksFacade } from './+state/tasks/tasks.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.reducer
    ),
    EffectsModule.forFeature([ProductsEffects]),
    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.reducer
    ),
    StoreModule.forFeature(fromTasks.TASKS_FEATURE_KEY, fromTasks.reducer),
    EffectsModule.forFeature([TasksEffects]),
  ],
  providers: [ProductsFacade, TasksFacade],
})
export class TasksModule {}
