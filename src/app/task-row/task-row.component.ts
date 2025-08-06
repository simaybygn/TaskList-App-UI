import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { TaskListResponseModel } from "../service/task-list.page.model";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
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

  /** Stores the previous description before editing */
  editedDescription = '';

  /** Formly field configuration (not used in this version, but ready for dynamic form use) */
  fields!: FormlyFieldConfig[];

  /** Reactive form group instance */
  form = new FormGroup({});

  /** Task object passed from parent component */
  @Input() task!: TaskListResponseModel;

  /** Model used for two-way binding during editing */
  model: { description: string } = { description: '' };

  /** Event emitter to notify parent that task list needs to be refreshed */
  @Output() taskChanged = new EventEmitter<boolean>();

  constructor(protected taskListService: TaskListService) {}

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
   * Switches the component into edit mode.
   */
  startEdit() {
    this.editedDescription = this.task.description;
    this.edit = true;
  }

  /**
   * Cancels editing and exits edit mode.
   */
  cancelEdit() {
    this.edit = false;
  }

  /**
   * Emits an event to notify the parent component that a task has changed.
   */
  emitTaskChanged() {
    this.taskChanged.emit(true);
  }

  /**
   * Sends a request to delete the current task.
   */
  deleteTask(): void {
    this.taskListService.deleteTask(this.task.id).subscribe((res) => {
      if (res) {
        this.emitTaskChanged();
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
    }).subscribe((res) => {
      if (res) {
        this.emitTaskChanged();
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
    }).subscribe((res) => {
      if (res) {
        this.emitTaskChanged();
      }
    });
  }
}

