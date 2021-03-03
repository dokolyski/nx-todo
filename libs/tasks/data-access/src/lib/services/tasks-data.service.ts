import { Inject, Injectable } from '@angular/core';
import { STORAGE_ITEM_CONFIG } from '../resources/injection-tokens/storage-item-config.injection';
import { Task } from '../resources/models/task';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TASKS_API } from '../resources/injection-tokens/tasks-api.injection';

@Injectable({
  providedIn: 'root',
})
export class TasksDataService {
  constructor(
    @Inject(STORAGE_ITEM_CONFIG) private storageItem: string,
    @Inject(TASKS_API) private api: string,
    private http: HttpClient
  ) {}

  getAll(from: number, limit?: number | null): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.api)
      .pipe(
        map((tasks) =>
          tasks.slice(from, limit != null ? from + limit : undefined)
        )
      );
  }

  create(newTask: Task): Observable<any> {
    newTask = { ...newTask, completed: false };
    return this.http.post(this.api, newTask);
  }

  update(task: Task): Observable<any> {
    const id = task._id;
    delete task._id;
    return this.http.put(`${this.api}/${id}`, task);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  changeCompletion(task: Task, completed: boolean): Observable<void> {
    task.completed = completed;
    return this.update(task);
  }
}
