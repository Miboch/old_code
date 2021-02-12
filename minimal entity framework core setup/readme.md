# Ef Core and .NET Core 3.1 bare-bones example.
A small quick implementation of a bare-bones web api in .NET Core 3.1

## Technologies utilized
* .NET Core 3.1
* EntityFramework Core
* Sqlite Database Driver

## Gotcha's for your first time setup
You'll need to download the appropriate NuGet packages to utilize Entity Framework.
For this project the following NuGet packages have been used.

* Microsoft.EntityFrameworkCore
* Microsoft.EntityFrameworkCore.Sqlite
* Microsoft.EntityFrameworkCore.Tools

## General Structure
The database context is made available through dependency injection in the `Startup.cs` class via the following line of code

```
services.AddDbContext<MyDatabaseContext>(options => options.UseSqlite("Data Source=database name.db"));
```

Whenever you make changes to your database model, such as adding another DbSet, you must run the following two commands:

* Add-Migration [Migration Name]
* Update-Database

**Add-Migration** is run to stage the changes you want to apply to the database.

**Update-Database** is run to apply the changes prepared with the Add-Migration step to the actual database

## How to add another endpoint to the example
 * Create a new model in the models folder
 * Extend the newly created model from the DataEntity class
 * Create a new controller in the Controllers folder: By convention the naming pattern follows: [ModelName]Controller. So if your model was named Foo, your controller would be FooController.
 * Inherit the BaseController from your newly created controller.
 * Edit the MyDatabaseContext.cs file, and add another public DbSet<ModelType> property.
 * Run the Add-Migration and Update-Database commands.
 
 That's it. You've added another endpoint to your web api.
 
 # Things not covered in this example
 * Error handling
 * Proper project structuring
 * Authentication and Authorization
 
## Intent of this project
The intent of this project is merely to demonstrate the bare bones setup required to get a simple web api up and running in .NET Core 3.1 using dependency injection to provide the database context.

## Purpose
This project was made to help a recent C# DotNetCore developer by creating an example they could study with minimal distraction and patterns as the focus of their learning was on DI and the EF-Core usage.