import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '@todo-workspace/tasks/domain';

@Pipe({
  name: 'complete'
})
export class CompletePipe implements PipeTransform {
  transform(tasks: Task[], completed: boolean): Task[] {
    return tasks.filter((task) => task.completed === completed);
  }
}
