import { TestBed } from '@angular/core/testing';

import { TasksDataService } from './tasks-data.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('TasksDataService', () => {
  let service: TasksDataService;
  let httpMock: HttpClient;

  beforeEach(() => {
    httpMock = {
      get: () => {
        return of({});
      },
    };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksDataService],
      providers: [{ provide: http }],
    });
    service = TestBed.inject(TasksDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAll should return all records sorted by dueDate', () => {
    // TODO - complete test
    // service.getAll().subscribe((value) =>
    //   expect(value).toEqual([
    //     {
    //       _id: '604600e113120c03e81c75d2',
    //       name: '1',
    //       dueDate: new Date('2021-03-08T10:47:00Z'),
    //       completed: true,
    //     },
    //     {
    //       _id: '6046051213120c03e81c75d4',
    //       name: '2',
    //       dueDate: new Date('2021-03-08T11:05:00Z'),
    //       completed: true,
    //     },
    //     {
    //       _id: '6046051d13120c03e81c75d5',
    //       name: '3',
    //       dueDate: new Date('2021-03-08T11:06:00Z'),
    //       completed: false,
    //     },
    //   ])
    // );
  });
});
