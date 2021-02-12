import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { TaskPageComponent } from "./components/pages/tasks/task-page.component";
import { ExamplePageComponent } from "./components/pages/example/example-page.component";
import { ApiPageComponent } from "./components/pages/api/api-page.component";
import { MenuComponent } from "./components/menu/menu.component";
import { TodosListComponent } from "./components/todos-list/todos-list.component";
import { ListSelectorComponent } from "./components/list-selector/list-selector.component";
import { DrawerComponent } from "./components/drawer/drawer.component";

const route: Routes = [
  {
    path: "",
    redirectTo: "project",
    pathMatch: "full"
  },
  {
    path: "project",
    component: TaskPageComponent
  },
  {
    path: "apidoc",
    component: ApiPageComponent
  },
  {
    path: "example",
    component: ExamplePageComponent
  }
];

const pages = [TaskPageComponent, ExamplePageComponent, ApiPageComponent];

const components = [MenuComponent, TodosListComponent, ListSelectorComponent, DrawerComponent];

@NgModule({
  declarations: [AppComponent, ...pages, ...components],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(route),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
