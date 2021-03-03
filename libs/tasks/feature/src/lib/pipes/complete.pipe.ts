import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '@todo-workspace/tasks/data-access';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'complete',
})
export class CompletePipe implements PipeTransform {
  transform(tasks: Observable<Task[]>, completed: boolean): Observable<Task[]> {
    return tasks.pipe(
      map((tasks) => tasks.filter((value) => value.completed === completed))
    );
  }
}
