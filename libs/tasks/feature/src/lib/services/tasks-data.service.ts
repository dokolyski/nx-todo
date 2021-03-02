import { Inject, Injectable } from '@angular/core';
import { STORAGE_ITEM_CONFIG } from '../../../../resources/injection-tokens/storage-item-config.injection';
import { Task } from '../../../../resources/models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksDataService {

  constructor(@Inject(STORAGE_ITEM_CONFIG) private storageItem: string) {
  }

  getData(from: number = 0, limit?: number | null): Task[] {
    const parsedValue = JSON.parse(localStorage.getItem(this.storageItem));
    if (parsedValue != null) {
      const loadedTasks: Task[] = parsedValue as Task[];
      if (loadedTasks == null) {
        throw new Error('Current todo list contains errors.')
      } else {
        return limit == null ? loadedTasks.slice(from, from + limit) : loadedTasks.slice(from);
      }
    } else {
      return [];
    }
  }
}
