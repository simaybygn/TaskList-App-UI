import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { TaskListResponseModel } from "../service/task-list.page.model";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { TaskListService } from "../service/task-list.service";

@Component({
    selector: "task-row",
    templateUrl: "./task-row.component.html",
})
export class TaskRowComponent implements OnChanges{
    edit=false;
     editedDescription = '';
    fields!:FormlyFieldConfig[]; 
    form= new FormGroup({});
    @Input() task!: TaskListResponseModel; 
    model:{description:string}= {description: ''
    };
    @Output() taskChanged = new EventEmitter<boolean>();

    constructor(protected taskListService:TaskListService) {}

ngOnChanges(changes: SimpleChanges): void {
    const task =changes['task'];
    if(task?.currentValue){
        this.task = task.currentValue;
        this.model.description = this.task.description;
    }
}

 startEdit() {
    this.editedDescription = this.task.description;
    this.edit = true;
  }

  cancelEdit() {
    this.edit = false;
  }

  emitTaskChanged(){
    this.taskChanged.emit(true);
  }

  deleteTask(): void { 
    this.taskListService.deleteTask(this.task.id).subscribe((res)=>{
      if(res)
       {
         this.emitTaskChanged();
       }
    })
  }

  updateTaskCompleteStatus(): void { 
    this.taskListService.updateTaskCompleteStatus({
        id: this.task.id,
        isCompleted: !this.task.isCompleted
    }).subscribe((res)=>{
      if(res)
       {
         this.emitTaskChanged();
       }
    })
  }

  updateTaskDescription(): void { 
    this.taskListService.updateTaskDescription({
        id: this.task.id,
        description: this.model.description
    }).subscribe((res)=>{
      if(res)
       {
         this.emitTaskChanged();
       }
    })
  }
}

