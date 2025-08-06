import { Injectable } from "@angular/core";
import { CreateTaskRequestModel, TaskListResponseModel, UpdateTaskCompleteStatusRequestModel, UpdateTaskDescriptionRequestModel } from "./task-list.page.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskListService {
    baseApiUrl = 'https://localhost:5001/Task/';

    constructor(private httpClient : HttpClient){
 
    }

    getAllTaskList(): Observable<TaskListResponseModel[]> {
       return this.httpClient.get<TaskListResponseModel[]>(this.baseApiUrl+ 'GetAllTaskList');
    }

    getTaskListByIsCompletedStatus(isCompleted: boolean): Observable<TaskListResponseModel[]> {
  return this.httpClient.get<TaskListResponseModel[]>(this.baseApiUrl + 'GetTaskListByIsCompletedStatus', {
    params: { isCompleted: isCompleted.toString() }
  });
}

createTask(createTaskRequestModel : CreateTaskRequestModel) : Observable<string>{
    return this.httpClient.post<string>(this.baseApiUrl + 'CreateTask',createTaskRequestModel)
  }

  updateTaskDescription(updateTaskDescriptionRequestModel : UpdateTaskDescriptionRequestModel) : Observable<boolean>{
    return this.httpClient.post<boolean>(this.baseApiUrl + 'UpdateTaskDescription',updateTaskDescriptionRequestModel)
  }

  updateTaskCompleteStatus(updateTaskCompleteStatusRequestModel : UpdateTaskCompleteStatusRequestModel) : Observable<boolean>{
    return this.httpClient.post<boolean>(this.baseApiUrl + 'UpdateTaskCompleteStatus',updateTaskCompleteStatusRequestModel)
  }

  deleteTask(id: string): Observable<boolean> {
  return this.httpClient.delete<boolean>(`${this.baseApiUrl}DeleteTask?id=${id}`);
}
}