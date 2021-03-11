/**
 * Interface for the 'Tasks' data
 */
export class Task {
  _id?: number;
  completed?: boolean = false;
  dueDate: Date | null;
  name: string;
}
