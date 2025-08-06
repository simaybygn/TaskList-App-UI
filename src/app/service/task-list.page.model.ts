export interface TaskListResponseModel{
    id:string;
    description:string;
    isCompleted:boolean;
}

export interface CreateTaskRequestModel {
    description: string;
    isCompleted: boolean;
}

export interface UpdateTaskDescriptionRequestModel  {
    id: string;
    description: string;
}

export interface UpdateTaskCompleteStatusRequestModel  {
    id: string;
    isCompleted: boolean;
}