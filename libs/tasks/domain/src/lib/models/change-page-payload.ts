import { PageEvent } from '@angular/material/paginator';

export interface ChangePagePayload {
  event: PageEvent;
  tasksNumber: number;
}
