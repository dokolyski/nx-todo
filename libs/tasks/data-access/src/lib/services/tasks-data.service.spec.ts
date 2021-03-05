import { TasksDataService } from './tasks-data.service';
import { of } from 'rxjs';
import { TaskMock } from '@todo-workspace/tasks/domain';

describe('TasksDataService', () => {
  let service: TasksDataService;
  let httpMock;
  const taskMocks = [
    new TaskMock().withDueDate(new Date(3)),
    new TaskMock().withDueDate(new Date(1)),
    new TaskMock().withDueDate(new Date(2))
  ];

  beforeEach(() => {
    httpMock = {
      get: jest.fn(),
      delete: jest.fn(),
      put: jest.fn(),
      post: jest.fn()
    };

    service = new TasksDataService('', httpMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAll should return all records sorted by dueDate', () => {
    httpMock.get.mockReturnValue(
      of(taskMocks.map((value) => value.mockWithStringifyDate()))
    );

    service
      .getAll()
      .subscribe((value) =>
        expect(value).toEqual(
          taskMocks
            .sort((a, b) => +(a.getDueDate() >= b.getDueDate()))
            .map((value) => value.getModel())
        )
      );
  });
});
