# Teacher Assistant Board (TA-Board)
An alternative to canvas messaging system or email, this web applications acts as a comprehensive discussion board for both professors and students in order to ask questions, recieve answers, and see the questions other students have asked in the past.

## Available functionality
  - Professor: Add, edit, and delete and number of individually-made courses. Each course has a course name, course id, and a unique passcode to allow your students to log into and view your course. Each course can be modified and deleted as necessary; furthermore, redundent or inappropriate questions can be freely deleted in order to guarantee the question board is always on-topic and up-to-date.
  - Student: Ask questions directly to your professor and view other student's questions and professor-provided answers. This allows an easy website to access each of your courses and have all commonly asked questions answers as well as each of your unique questions.

## APIs & Languages:
   - Angular (Typescript)
   - Golang
   - MySQL

## To run:
   - Before beginning, make sure all required packages are installed for Angular and Go
     - Go: `go mod download`
     - Angular: `npm install`
   - Run the angular server (`ng serve`). This will run the application on `http://localhost:4200`
   - Begin a MySQL database and configure tablename and password in the Main.go file of the backend.
   - Run `go run backend/cmd/main/main.go` in order to begin the backend API. The router will listen from `localhost:4222`
   - Access `http://localhost:4200` and begin using the web application!

## Members:
### Front End
Abbas Shah, Carlo Quick

### Back-End
Nick Rodriguez, Riley Willis
