import { Component, OnInit } from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { TodoModel } from "src/app/model/todo.model";
import { TaskModel } from "src/app/model/task.model";

@Component({
  styleUrls: ["./example-page.component.scss"],
  templateUrl: "./example-page.component.html"
})
export class ExamplePageComponent implements OnInit {
  selectedTodo: TodoModel;

  taskName: string;
  todoName: string;
  todoDescription: string;

  constructor(private service: TodoService) {}

  ngOnInit() {
    this.service.getTodos();
    this.service.specificTodo.subscribe(r => (this.selectedTodo = r));
  }

  selectChange(todoNumber: number) {
    this.service.getSpecificTodo(todoNumber);
  }

  createTodo() {
    const newTodo: TodoModel = {
      description: this.todoDescription,
      title: this.todoName
    };
    this.service.postTodo(newTodo);
    this.todoDescription = "";
    this.todoName = "";
  }

  createTask() {
    const newTask: TaskModel = {
      completed: false,
      taskname: this.taskName,
      todo_id: this.selectedTodo.id
    };
    this.taskName = "";
    this.service.postTask(newTask);
  }
}
