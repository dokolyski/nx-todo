import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  ChangePagePayload,
  PaginatorState,
  Task
} from '@todo-workspace/tasks/domain';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'todo-workspace-tasks-list[type]',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent {
  @Input() tasks: Task[];
  @Input() error: HttpErrorResponse;
  @Input() pagination: PaginatorState;
  @Input() type: 'todo' | 'done';
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

  dropTask(event: CdkDragDrop<Task>) {
    if (
      event.isPointerOverContainer &&
      event.previousContainer !== event.container
    ) {
      this.completionChange(event.item.data);
    }
  }
}
