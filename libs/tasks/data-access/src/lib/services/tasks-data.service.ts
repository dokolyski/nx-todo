import { Inject, Injectable } from '@angular/core';
import { Task, TASKS_API } from '@todo-workspace/tasks/domain';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksDataService {
  constructor(
    @Inject(TASKS_API) private api: string,
    private http: HttpClient
  ) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api).pipe(
      map((value) =>
        value
          .map((task) =>
            Object.assign(task, {
              dueDate: task.dueDate == null ? null : new Date(task.dueDate)
            })
          )
          .sort((a, b) => a.dueDate?.getTime() - b.dueDate?.getTime())
      )
    );
  }

  create(newTask: Task): Observable<any> {
    newTask = { ...newTask, completed: false };
    return this.http.post(this.api, newTask);
  }

  update(task: Task): Observable<any> {
    const newTask = { ...task };
    delete newTask._id;
    return this.http.put(`${this.api}/${task._id}`, newTask);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  changeCompletion(task: Task, completed: boolean): Observable<void> {
    task.completed = completed;
    return this.update(task);
  }
}
