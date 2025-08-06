/**
 * Represents a task returned from the backend.
 */
export interface TaskListResponseModel {
  /** Unique identifier of the task */
  id: string;

  /** Task description or title */
  description: string;

  /** Completion status of the task */
  isCompleted: boolean;
}

/**
 * Data model used when creating a new task.
 */
export interface CreateTaskRequestModel {
  /** Description of the new task */
  description: string;

  /** Whether the new task is completed or not */
  isCompleted: boolean;
}

/**
 * Data model used to update the description of an existing task.
 */
export interface UpdateTaskDescriptionRequestModel {
  /** ID of the task to update */
  id: string;

  /** New description for the task */
  description: string;
}

/**
 * Data model used to update the completion status of an existing task.
 */
export interface UpdateTaskCompleteStatusRequestModel {
  /** ID of the task to update */
  id: string;

  /** New completion status (true/false) */
  isCompleted: boolean;
}