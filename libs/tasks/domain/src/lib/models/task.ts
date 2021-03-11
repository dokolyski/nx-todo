/**
 * Interface for the 'Tasks' data
 */
export class Task {
  _id?: string;
  completed?: boolean = false;
  dueDate: Date | null;
  name: string;
}
