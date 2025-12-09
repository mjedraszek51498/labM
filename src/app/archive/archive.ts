import { Component } from '@angular/core';
import {TasksService} from '../tasks';
import {Task} from '../task';

@Component({
  selector: 'app-archive',
  imports: [],
  templateUrl: './archive.html',
  styleUrl: './archive.css',
  standalone: true
})
export class Archive {
  public tasks: Task[] = [];

  constructor(private tasksService: TasksService) {
  }

  ngOnInit():void {
    this.tasksService.index(true).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  delete(task: Task){
    if(!confirm('Are you sure you want to delete this task?')){
      return;
    }
    this.tasksService.delete(task).subscribe(() => {
      this.ngOnInit();

    });

  }
}
