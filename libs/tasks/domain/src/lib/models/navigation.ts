import { Task } from './task';

export class Navigation {
  dialogOpened: boolean;
  dialogType: 'edit' | 'create' | null;
  selectedTask?: Task;
  taskId?: string;
}
