import { Component } from '@angular/core';
import { TaskListResponseModel } from 'src/app/service/task-list.page.model';
import { TaskListService } from 'src/app/service/task-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  /** Holds the current input value for the new task description */
  newTaskDescription: string = '';

  /** Tracks the current filter applied on the task list */
  currentFilter: 'all' | 'active' | 'completed' = 'all';

  /** List of tasks displayed on the UI */
  taskList!: TaskListResponseModel[];

  constructor(protected taskListService: TaskListService) {
    // Load all tasks initially
    this.getAllTaskList();
  }

  /**
   * Sets the task filter and reloads the list accordingly.
   * @param filter The filter type: 'all', 'active', or 'completed'
   */
  setFilter(filter: 'all' | 'active' | 'completed') {
    this.currentFilter = filter;

    if (this.currentFilter === 'all') {
      this.getAllTaskList();
    } else {
      // true if filter is 'completed', false if 'active'
      this.getTaskListByIsCompletedStatus(this.currentFilter === 'completed');
    }
  }

  /**
   * Fetches all tasks from the backend and updates the task list.
   */
  getAllTaskList(): void {
    this.taskList = [];
   this.taskListService.getAllTaskList().subscribe({
  next: (res) => {
    this.taskList.push(...res);
  },
  error: (err) => {
    debugger;
    this.taskListService.setErrorMessage(err?.message);
  }
});
  }

  /**
   * Fetches tasks filtered by completion status and updates the task list.
   * @param isCompleted true for completed tasks, false for active tasks
   */
  getTaskListByIsCompletedStatus(isCompleted: boolean): void {
    this.taskList = [];
    
    this.taskListService.getTaskListByIsCompletedStatus(isCompleted).subscribe({
      next: (res) => {
    this.taskList.push(...res);
  },
  error: (err) => {
    this.taskListService.setErrorMessage(err?.message);
  }
    });
  }

  /**
   * Creates a new task with the current input description.
   * Clears the input and reloads the task list on success.
   */
  createTask(): void {
    // Prevent empty task creation
    if (!this.newTaskDescription.trim()) return;

     this.taskListService.createTask({
      description: this.newTaskDescription,
      isCompleted: false,
    }).subscribe({
      next: (res) => {
    if (res) {
        this.newTaskDescription = ''; // Clear input field
        this.getAllTaskList();       // Refresh the task list
      }
  },
  error: (err) => {
    this.taskListService.setErrorMessage(err?.message);
  }
    });
  }

  /**
   * Event handler triggered when a child task component signals a change.
   * Reloads the task list if needed.
   * @param event Boolean flag indicating if task list should be refreshed
   */
  onTaskChanged(event: boolean): void {
    if (event) {
      this.getAllTaskList();
    }
  }
}
  
   



