import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-workspace-progress-spinner-overlay',
  templateUrl: './progress-spinner-overlay.component.html',
  styleUrls: ['./progress-spinner-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerOverlayComponent {}
