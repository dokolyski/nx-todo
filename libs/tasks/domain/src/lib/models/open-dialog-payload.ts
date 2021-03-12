import { Task } from './task';

export interface OpenDialogPayload {
  type: 'create' | 'edit';
  task?: Task;
}
