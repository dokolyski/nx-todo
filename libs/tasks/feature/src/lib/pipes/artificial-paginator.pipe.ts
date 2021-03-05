import { Pipe, PipeTransform } from '@angular/core';
import { PaginatorState, Task } from '@todo-workspace/tasks/domain';

@Pipe({
  name: 'artificialPaginator'
})
export class ArtificialPaginatorPipe implements PipeTransform {
  transform(tasks: Task[], paginatorState: PaginatorState): Task[] {
    return tasks.slice(
      paginatorState.from,
      paginatorState.limit != null
        ? paginatorState.from + paginatorState.limit
        : undefined
    );
  }
}
