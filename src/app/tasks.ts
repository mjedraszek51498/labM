import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = 'http://localhost:41498/todos';
  constructor(
    private http: HttpClient,
  ) {
  }

  public index(archived = false): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?archived=${archived}`);
  }

  public post(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  public put(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  public delete(task: Task): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${task.id}`);
  }

}
