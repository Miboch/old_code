# TODO-Example
This project contains a small express server with a sqlite in-memory database that can serve as a back-end application for a simple todo application

Additionally, the project contains an example-application `./example-app` which implements the todo application using the angular framework.

## Purpose of this project
The purpose of this project is to help new learners who are about to learn their first front-end framework by providing them a working example and structured approach to building a TODO application (a common beginner scope).

The hope of the author is that this will allow the learner to focus entirely on implementing the front-end, but still allows them to have an actual API to interact with.

## How to use this project
To run this project you need the following prerequisites:
* Node and NPM or a similar package manager must be installed

To setup this project locally, perform the following steps:
* download the source code
  * either using `git clone https://github.com/Miboch/todo-example.git` 
  * or [download .zip directly](https://github.com/Miboch/todo-example/archive/master.zip)
* Once downloaded, navigate into the root folder of the project and open a command line | terminal with the root folder as its working directory.

**Using npm**
  * change your terminal's working directory to the "todo-example/server" directory and run the `npm install` command. Wait for it to finish.
  * change your terminal's working directory to the "todo-example/example-app" directory and run the `yarn install` command. Wait for it to finish.

**Using Yarn**
  * change your terminal's working directory to the "todo-example/server" directory and run `yarn install` command. Wait for it to finish
  * change your terminal's working directory to the "todo-example/example-app" directory and run the `yarn install` command. Wait for it to finish.

**You are now ready to run the application locally**

### To run the API Server
* Open a command line | terminal with the todo-example/server folder as its working directory

**using npm**
* run the command `npm run host`

**using yarn**
* run the command `yarn run host`

**The API is now running on `http://localhost:3200` while the command line/Terminal window is left open and running.**

### Run the Example Applicatiopn
* Open a command line | terminal with the todo-example/example-app folder as its working directory

**using npm**
* run the command `npm run start`

**using yarn**
* run the command `yarn run start`

**The Example App is now running on `http://localhost:4200` while the command line/Terminal window is left open and running.**

### See it in action
With both API and example app running, open your browser and navigate to http://localhost:4200/example to see the example todo application.

# Other places to find the example app
If you do not wish to run the example app locally, you can find a copy hosted here: https://todoexample.miboch.dev

**Note:** The hosted url may not always be available. If the connection times out you can contact the owner of this repository, or host your own copy locally.

# Structure of the Project
The server.js file utilizes express and sqlite3. It is is delivered as-is and it should not be necessary to change any code in this file to be able to build a todo application around the provided example.

### Example Application's structure
The example-app has three sections:
* Task List: Which outlines a structured approach to building the front-end for the todo application.
* Example: An example showing an implemented todo list using the provided server.js server.
* API Doc: A description of the endpoints available in the server.js server.
