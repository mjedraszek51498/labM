import {Component, OnInit} from '@angular/core';
import {Task} from '../task';
import { TasksService } from '../tasks';
import {FormsModule} from '@angular/forms';
import {forkJoin, Observable} from 'rxjs';
import {MatButton} from '@angular/material/button';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormField, MatHint} from '@angular/material/form-field.d';
import {MatLabel} from '@angular/material/form-field-module';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-tasks',
  imports: [
    FormsModule,
    MatButton,
    MatCheckbox,
    MatFormField,
    MatLabel,
    MatHint,
    MatInput
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',

  standalone: true
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {};
  isProcessing = false;
  constructor(private tasksService: TasksService) {
  }
  ngOnInit():void {
    this.tasksService.index().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (this.newTask.title === undefined){
      return;
    }
    this.isProcessing = true;
    this.newTask.completed = false;
    this.newTask.completed = false;

    this.tasks.unshift(this.newTask);

    this.tasksService.post(this.newTask).subscribe((task) => {
      this.newTask = {};
      this.ngOnInit();
    });

  }
  handleChanges(task: Task): void {
    this.tasksService.put(task).subscribe({
      error: err => {
        alert(err);
        this.ngOnInit();
      }
    });
  }

  archiveCompleted(): void {
   const observables: Observable<any>[] = [];
   for (const task of this.tasks) {
      if (!task.completed) {
        continue;
      }
      task.archived = true;
      observables.push(this.tasksService.put(task));
  }

   forkJoin(observables).subscribe(() => {
     this.ngOnInit();
   });
   }

  canArchiveCompleted() {
    return false
  }

  canAddTask() {
    return false
  }
}
