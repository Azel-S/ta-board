## Work Completed during Sprint 2
__TODO__: Detail work completed in Sprint 2

## TA-Bot Frontend Cypress Documenation
__TODO__: List unit tests and Cypress test for frontend

## TA-Bot Backend API Documentation

### Package Dependencies
* github.com/gorilla/mux
* github.com/jinzhu/gorm

### Installation Guide for Dependencies
* On Windows: Command Prompt (Windows Key + R -> enter 'cmd')
* On Mac: Terminal (Command Key + Space -> search 'Terminal')
1. Change directory to GOPATH (Typically C:\Users\user\go on Windows)
2. Run the following commands: 
    * 'go install github.com/gorilla/mux@latest'
    * 'go install github.com/jinzhu/gorm@latest'

### Unit Tests
#### These unit tests are executed using the 'testing' package within Golang, to run the tests, execute the command 'go test -v' within the backend/cmd/test directory
* Test for empty MySQL table (TestEmptyTable)
* Getting a non-existent user (TestGetNonExistUser)
* Creating a new user (TestCreateUser)
* Getting an existing user (TestGetUser)
* Updating a user's information (TestUpdateUser)
* Deleting an existing user (TestDeleteUser)

### Functions
__TODO__: Add documentation for each function in backend API
