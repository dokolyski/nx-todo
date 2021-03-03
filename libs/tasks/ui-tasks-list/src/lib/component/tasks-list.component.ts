import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '@todo-workspace/tasks/data-access';

@Component({
  selector: 'todo-workspace-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent {
  @Input() tasks: Task[];
}
