import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksFeatureComponent } from './tasks-feature.component';

describe('TasksFeatureComponent', () => {
  let component: TasksFeatureComponent;
  let fixture: ComponentFixture<TasksFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksFeatureComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
