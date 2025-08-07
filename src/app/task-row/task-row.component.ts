import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { TaskListResponseModel } from "../service/task-list.page.model";
import { FormGroup } from "@angular/forms";
import { TaskListService } from "../service/task-list.service";

@Component({
    selector: "task-row",
    templateUrl: "./task-row.component.html",
})
/**
 * Component responsible for displaying and managing a single task row.
 */
export class TaskRowComponent implements OnChanges{
     /** Flag to determine if the task is in edit mode */
  edit = false;

  /** Task object passed from parent component */
  @Input() task!: TaskListResponseModel;

  /** Model used for two-way binding during editing */
  model: { description: string } = { description: '' };

  /** Event emitter to notify parent that task list needs to be refreshed */
  @Output() taskChanged = new EventEmitter<boolean>();

  /** Event emitter to emit error message */
  @Output() errorMessage = new EventEmitter<string>();

  constructor(private taskListService: TaskListService) {}

  /**
   * Called when input properties change. Used to initialize model data from task.
   * @param changes The set of changed inputs
   */
  ngOnChanges(changes: SimpleChanges): void {
    const task = changes['task'];
    if (task?.currentValue) {
      this.task = task.currentValue;
      this.model.description = this.task.description;
    }
  }

  /**
   * Switches the component edit mode status.
   */
  changeEditModeStatus(isEditMode: boolean) {
    if(!isEditMode) {
      this.model.description = this.task.description; // Initialize model with current task description
    }
    this.edit = isEditMode;
  }

  /**
   * Emits an event to notify the parent component that a task has changed.
   */
  emitTaskChanged() {
    this.taskChanged.emit(true);
  }

  /**
   * Emits an event to notify the parent component that a task has changed.
   */
  emitErrorMessage(errorMessage: string) {
    this.errorMessage.emit(errorMessage);
  }

  /**
   * Sends a request to delete the current task.
   */
  deleteTask(): void {
   this.taskListService.deleteTask(this.task.id).subscribe({
    next: (res) => {
      if (res) {
        this.emitTaskChanged();
      }
    },
    error: (err) => {
      this.emitErrorMessage(err?.message);
    }
  });
  }

  /**
   * Sends a request to toggle the task's completion status.
   */
  updateTaskCompleteStatus(): void {
    this.taskListService.updateTaskCompleteStatus({
    id: this.task.id,
    isCompleted: !this.task.isCompleted
  }).subscribe({
    next: (res) => {
      if (res) {
        this.emitTaskChanged();
      }
    },
    error: (err) => {
      this.emitErrorMessage(err?.message);
    }
  });
  }

  /**
   * Sends a request to update the task's description.
   */
  updateTaskDescription(): void {
   this.taskListService.updateTaskDescription({
    id: this.task.id,
    description: this.model.description
  }).subscribe({
    next: (res) => {
      if (res) {
        this.emitTaskChanged();
      }
    },
    error: (err) => {
      this.emitErrorMessage(err?.message);
    }
  });
  }
}

