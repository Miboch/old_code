import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TodoModel } from "../model/todo.model";
import { BehaviorSubject, Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { TaskModel } from "../model/task.model";

@Injectable({ providedIn: "root" })
export class TodoService {
  baseUrl = "http://localhost:3200/api/";
  todoTitles: EventEmitter<Array<{ id: number; title: string }>>;
  todoList: EventEmitter<TodoModel[]>;
  specificTodo: EventEmitter<TodoModel>;

  constructor(private http: HttpClient) {
    this.todoTitles = new EventEmitter<Array<{ id: number; title: string }>>();
    this.todoList = new EventEmitter<TodoModel[]>();
    this.specificTodo = new EventEmitter<TodoModel>();
  }

  get base() {
    return this.baseUrl;
  }

  getTodos() {
    this.http
      .get<TodoModel[]>(this.base + "todo")
      .pipe(
        take(1),
        tap(e => this.todoList.emit(e)),
        map(x => x.map(xx => ({ title: xx.title, id: xx.id }))),
        tap(e => this.todoTitles.emit(e))
      )
      .subscribe(r => {});
  }

  getSpecificTodo(id: number) {
    this.http
      .get<TodoModel>(this.base + "todo/" + id)
      .pipe(
        take(1),
        tap(e => this.specificTodo.emit(e))
      )
      .subscribe(r => {});
  }

  deleteTodo(todoId: number) {
    if (!todoId) {
      return;
    }
    this.http.delete(this.base + "todo/" + todoId).subscribe(r => {
      this.getTodos();
    });
  }

  completeTask(task: TaskModel) {
    this.http
      .put<any>(this.base + "task/" + task.id + "/complete", {})
      .subscribe(r => {});
  }

  deleteTask(task: TaskModel) {
    this.http.delete(this.base + "task/" + task.id).subscribe(r => {});
  }

  postTask(task: TaskModel) {
    this.http.post<any>(this.base + "task", task).subscribe(r => {
      this.getTodos();
      this.getSpecificTodo(task.todo_id);
    });
  }

  postTodo(todo: TodoModel) {
    this.http.post<any>(this.base + "todo", todo).subscribe(r => {
      this.getTodos();
    });
  }
}
