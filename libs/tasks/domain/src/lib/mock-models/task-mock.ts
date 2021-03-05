import { Task } from '../models/task';
import { IdGenerator, toDateTimeInputString } from '../utils/utils';

/**
 * Interface for mocking task data
 */
export class TaskMock {
  private _data: Task = {
    _id: IdGenerator.generateId(),
    completed: false,
    dueDate: new Date(0),
    name: 'name'
  };

  public mockWithStringifyDate() {
    return {
      ...this,
      _data: {
        ...this._data,
        dueDate: toDateTimeInputString(this._data.dueDate)
      }
    };
  }

  public withId(value: string): TaskMock {
    this._data._id = value;
    return this;
  }

  public withCompleted(value: boolean): TaskMock {
    this._data.completed = value;
    return this;
  }

  public withDueDate(value: Date | null): TaskMock {
    this._data.dueDate = value;
    return this;
  }

  public withName(value: string): TaskMock {
    this._data.name = value;
    return this;
  }

  public getDueDate(): Date | null {
    return this._data.dueDate;
  }

  public getModel(): Task {
    return this._data;
  }
}
