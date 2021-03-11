import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ChangePagePayload,
  PaginatorState,
  Task,
} from '@todo-workspace/tasks/domain';

@Component({
  selector: 'todo-workspace-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent {
  @Input() tasks: Task[];
  @Input() pagination: PaginatorState;
  @Input() checked = false;
  @Output() completionChangeEvent = new EventEmitter<Task>();
  @Output() editEvent = new EventEmitter<Task>();
  @Output() deleteEvent = new EventEmitter<Task>();
  @Output() changePage = new EventEmitter<ChangePagePayload>();

  completionChange(task: Task) {
    this.completionChangeEvent.emit(task);
  }

  editTask(task: Task) {
    this.editEvent.emit(task);
  }

  deleteTask(task: Task) {
    this.deleteEvent.emit(task);
  }
}
