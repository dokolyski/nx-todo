import { PageEvent } from '@angular/material/paginator';

export interface ChangePagePayload {
  type: 'todo' | 'done';
  event: PageEvent;
  tasksNumber: number;
}
