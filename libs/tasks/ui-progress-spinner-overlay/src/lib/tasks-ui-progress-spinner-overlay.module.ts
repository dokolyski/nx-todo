import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerOverlayComponent } from './component/progress-spinner-overlay.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [ProgressSpinnerOverlayComponent],
  exports: [ProgressSpinnerOverlayComponent],
})
export class TasksUiProgressSpinnerOverlayModule {}
