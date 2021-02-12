import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { TodoService } from "src/app/services/todo.service";
import { DrawerComponent } from "../drawer/drawer.component";

@Component({
  selector: "app-list-selector",
  templateUrl: "./list-selector.component.html",
  styleUrls: ["./list-selector.component.scss"]
})
export class ListSelectorComponent implements OnInit {
  selectedOption;
  todoTitles: Array<{ id: number; title: string }>;
  @Input() drawer: DrawerComponent;
  @Output() whenSelect: EventEmitter<number>;

  constructor(private service: TodoService) {
    this.whenSelect = new EventEmitter<number>();
  }

  ngOnInit() {
    this.service.todoTitles.subscribe(r => {
      this.todoTitles = r;
      if (r.length > 0 && !this.selectedOption) {
        this.selectedOption = r[0].id;
        this.whenSelect.emit(this.selectedOption);
      }
    });
  }

  deleteSelected() {
    this.service.deleteTodo(this.selectedOption);
  }

  updatedTodo(selected: number) {
    this.selectedOption = selected;
    this.whenSelect.emit(selected);
  }
}
