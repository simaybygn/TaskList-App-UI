import { Injectable } from "@angular/core";
import { CreateTaskRequestModel, TaskListResponseModel, UpdateTaskCompleteStatusRequestModel, UpdateTaskDescriptionRequestModel } from "./task-list.page.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

/**
 * Service for handling task-related API calls.
 */
export class TaskListService {
    /** Base URL for the task-related API endpoints */
    baseApiUrl = 'https://localhost:5001/Task/';
    /** Tracks the error messages */
   errorMessage: string | null = null;

    constructor(private httpClient: HttpClient) {}

    setErrorMessage(message: string): void {
  this.errorMessage = message;

  // clear the error message after 3 seconds
  setTimeout(() => {
    this.errorMessage = null;
  }, 3000);
}

  /**
   * Gets the full list of tasks from the backend.
   * @returns An observable containing an array of task items.
   */
  getAllTaskList(): Observable<TaskListResponseModel[]> {
    return this.httpClient.get<TaskListResponseModel[]>(this.baseApiUrl + 'GetAllTaskList');
  }

  /**
   * Gets tasks filtered by their completion status.
   * @param isCompleted Boolean value to filter tasks (true for completed, false for active).
   * @returns An observable containing the filtered list of tasks.
   */
  getTaskListByIsCompletedStatus(isCompleted: boolean): Observable<TaskListResponseModel[]> {
    return this.httpClient.get<TaskListResponseModel[]>(this.baseApiUrl + 'GetTaskListByIsCompletedStatus', {
      params: { isCompleted: isCompleted }
    });
  }

  /**
   * Sends a request to create a new task.
   * @param createTaskRequestModel The data for the new task.
   * @returns An observable containing the ID of the created task.
   */
  createTask(createTaskRequestModel: CreateTaskRequestModel): Observable<string> {
    return this.httpClient.post<string>(this.baseApiUrl + 'CreateTask', createTaskRequestModel);
  }

  /**
   * Sends a request to update the description of an existing task.
   * @param updateTaskDescriptionRequestModel The updated description and task ID.
   * @returns An observable indicating success or failure.
   */
  updateTaskDescription(updateTaskDescriptionRequestModel: UpdateTaskDescriptionRequestModel): Observable<boolean> {
    return this.httpClient.post<boolean>(this.baseApiUrl + 'UpdateTaskDescription', updateTaskDescriptionRequestModel);
  }

  /**
   * Sends a request to update the completion status of a task.
   * @param updateTaskCompleteStatusRequestModel The updated status and task ID.
   * @returns An observable indicating success or failure.
   */
  updateTaskCompleteStatus(updateTaskCompleteStatusRequestModel: UpdateTaskCompleteStatusRequestModel): Observable<boolean> {
    return this.httpClient.post<boolean>(this.baseApiUrl + 'UpdateTaskCompleteStatus', updateTaskCompleteStatusRequestModel);
  }

  /**
   * Sends a request to delete a task by its ID.
   * @param id The ID of the task to delete.
   * @returns An observable indicating success or failure.
   */
  deleteTask(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseApiUrl}DeleteTask?id=${id}`);
  }
}