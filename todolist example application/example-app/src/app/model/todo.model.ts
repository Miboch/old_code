import { TaskModel } from "./task.model";

export class TodoModel {
  id?: number;
  title: string;
  description: string;
  tasks?: TaskModel[];
}
