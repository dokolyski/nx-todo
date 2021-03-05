import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let matSnackBarMock;

  beforeEach(() => {
    matSnackBarMock = {
      open: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: matSnackBarMock }]
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
