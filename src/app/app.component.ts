import { Component } from '@angular/core';
import { TaskListResponseModel } from 'src/app/service/task-list.page.model';
import { TaskListService } from 'src/app/service/task-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent{
newTaskDescription: string = '';
  currentFilter: 'all' | 'active' | 'completed' = 'all';
  taskList!: TaskListResponseModel[]
  
  constructor(protected taskListService: TaskListService) {
     this.getAllTaskList();
  }

 setFilter(filter: 'all' | 'active' | 'completed') {
  this.currentFilter = filter;
  if(this.currentFilter === 'all') {
    this.getAllTaskList();
  }else{
      this.getTaskListByIsCompletedStatus(this.currentFilter === 'completed');
  }

}

 getAllTaskList():void{
    this.taskList=[];
    this.taskListService.getAllTaskList().subscribe((res)=>{
      this.taskList.push(...res);
    })
  }

  getTaskListByIsCompletedStatus(isCompleted:boolean):void{
    this.taskList=[];
    this.taskListService.getTaskListByIsCompletedStatus(isCompleted).subscribe((res)=>{
      this.taskList.push(...res);
    })
  }

  createTask(): void {
     if (!this.newTaskDescription.trim()) return;  // Boşsa işlem yapma
    this.taskListService.createTask({
      description: this.newTaskDescription,
      isCompleted: false
    }).subscribe((res)=>{
      if(res)
       {
         this.newTaskDescription = ''; // Inputu temizle
        this.getAllTaskList();
       }
    })
  }

  onTaskChanged(event: boolean): void {
    if(event) {
      this.getAllTaskList();
    }
}
}
  
   



