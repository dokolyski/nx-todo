import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ChangePagePayload,
  OpenDialogPayload,
  PaginatorState,
  Task
} from '@todo-workspace/tasks/domain';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'todo-workspace-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss']
})
export class TasksContainerComponent {
  @Input() todoPage: PaginatorState;
  @Input() donePage: PaginatorState;
  @Input() isLoading: boolean;
  @Input() tasks: Task[];
  @Input() error: HttpErrorResponse;

  @Output() deleteTask = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() changePage = new EventEmitter<ChangePagePayload>();
  @Output() openDialog = new EventEmitter<OpenDialogPayload>();
  @Output() changeCompletion = new EventEmitter<Task>();
}
