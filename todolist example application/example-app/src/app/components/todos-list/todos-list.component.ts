import { Component, Input } from "@angular/core";
import { TodoModel } from "src/app/model/todo.model";
import { TaskModel } from "src/app/model/task.model";
import { TodoService } from "src/app/services/todo.service";
import { DrawerComponent } from "../drawer/drawer.component";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todos-list.component.html",
  styleUrls: ["./todos-list.component.scss"]
})
export class TodosListComponent {
  @Input() selectedTodo: TodoModel;
  @Input() drawer: DrawerComponent;
  constructor(private service: TodoService) {}

  completeTask(task: TaskModel) {
    task.completed = true;
    this.service.completeTask(task);
  }

  deleteTask(task: TaskModel) {
    this.service.deleteTask(task);
    const i = this.selectedTodo.tasks.findIndex(e => e.id === task.id);
    this.selectedTodo.tasks.splice(i, 1);
  }
}
