## FRONT-END
### Completed
* App-Component
  * Reworked user-icon to act as a login/logout icon.
* Side-Bar
  * Reworked so only linked pages show up (i.e. Student only has Student-View).
* Login-Component
  * Visual Changes (Now uses a outline input-field)
  * Added functionality with back-end. Able to login with only registered username/passcode.
  * Added a signed-in status. More info in data-component service.
* Student-View
  * Now uses functions from data-component service for data.
  * Has an iframe for DialogFlow that is somewhat interactable (target for Sprint4).
* Teacher-View
  * Classes displayed as individual cards that provide course information.
  * 4 Classes are hardcoded, any extra are grabbed from the back-end.
  * View course syllabus button added that opens a pdf syllabus in a new tab (Uses data-component service).
* Course-View
  * Now uses functions from data-component service for data.
  * Shows a list of questions (hard-coded, but setup so minor changes needed for back-end implementation).
  * Visual change for submission form (adapts to screen by stretching).
* Signup
  * Added simple data entries for name, phone, address, etc.
  * Still in the works, so changes are expected.
* DataComponent Service
  * This service stores most of the data, and is accessed by any component requiring information.
  * Functions include:
    * Navigate()
    * SetUserSerial(), GetUserSerial(), SetLoggedIn(), GetLoggedIn()
    * GetProfName(), GetProfFirstName(), GetProfLastName()
    * GetCourses(), GetCourse(), GetCourseName(), GetCourseID(), GetNumCourses()
    * AddCourse(), ClearCourses()
    * GetQuestions(), GetQuestion(), GetNumQuestions()
    * OpenSyllabus()
* DataBackend Service
  * Functions Include:
    * LoginStudent(), LoginTeacher(), Register()
    * GetTeacherNameAsStudent(), GetTeacherNameAsTeacher()
    * GetCourseNameAsStudent(), GetCourseNameAsTeacher()
    * GetCoursesAsTeacher(), GetQuestionsAsTeacher(), 
* General
  * Removed non-cypress testing as it was causing issues.
  * Shifted from Flex Layout to CSS Flexbox as the former is deprecated.
  * Added error catching for http requests.
### Testing
* Component
  * Removed stepper, made sure components work by importing HttpClientTestingModule.
* Cypress Tests (11/11 passing)
  * Verifies existence of Home page
  * Verifies existence of Login page
  * Verifies existence of Student View page
  * Verifies existence of Teacher View page
  * Verifies existence of Course View page
  * Verifies existence of Signup page
  * Clicks login button and verifies navigation to login page
  * Inputs student login credentials, clicks login, and verifies navigation to student dashboard
  * Selects the student syllabus button within the dashboard and verifies that it opens (from student)
  * Selects the student syllabus button within the dashboard and verifies that it opens (from teacher)
  * Verifies that the teacher dashboard is active, navigable and verifies the number of courses displayed in teacher’s dashboard.
### TODO
* Find an alternative to Cypress Testing function cy.visit() and implement additional tests using it.
* Registered student data is maintained in the backend and accessible at login.
* Registered teacher data is maintained in the backend and accessible in the dashboard.
* Get DialogFlow to interact with the backend and update on the frontend.
### Video
https://youtu.be/KKxzyzib2dw

## BACK-END

### Completed
* app.go
  * Finished API functionality for user registration with proper error handling
  * Finished API functionality for teacher login with proper error handling
  * Finished API functionality for student login with proper error handling
    * In the future, student login will require both a course ID and a passcode. Implementing this has been paused for the sake of simplicity during testing; however, it is ready to be included as soon as necessary
  * GetCourseInfoAsStudent function
    * Returns a course struct object marshalled into an appropriate JSON object to be used in front-end display
      * Full functionality is not finished due to time constraints. Currently does not return course information directly from database; however, is it ready to be implemented as soon as necessary.
  * GetCoursesAsTeacher function
    * Returns a JSON object with an array of course object structs
    * Accesses 'professorcourses' table to grab all courseID's attached to logged-in user -> takes these courseIDs and accesses 'courses' table to grab all necessary information from matching courses -> marshalled all collected courses as an array into JSON object
  * GetQuestionsAsTeacher function
    * Similar to GetCoursesAsTeacher, returns JSON object with array of question objects
    * Accesses 'questions' table to grab all questions/answers of matching ID-> takes these questions and grabs all necessary information and answers -> marshalls all collected information as an array in a JSON object
* course.go
  * Updated GetManyCourses function to match functionality with GetCoursesAsTeacher
    * Traverses 'professorcourses' and 'courses' table for list of user's courses and course information respectively
* user.go
  * GetUserSerial function
    * Returns only user ID
    * Used during login-in process, taking username and password and returning user_serial for necessary functionality for functions like GetCoursesAsTeacher which requires a user_id to grab list of courses
* endpoints
  * Added endpoints directory to store all files necessary for frontend-backend communication through properly formed JSON objects
  * login_register.go (temporary file name)
    * Register struct for matching form of the registration field
    * StudentLogin for matching form of the student login field
    * TeacherLogin for matching form of the teacher login field
    * ProfessorCourse for matching form of the 'professorcourse' mysql table
    * User for matching form of the 'user' mysql table
* Front-end files
  * Modified data-backend.service.ts for necessary functionality for all completed functions for API
  * Modified login.component.ts for necessary functionality for register, teacherlogin, and studentlogin
  * Modified student-view.component.ts and teacher-view.component.ts for necessary functionality for sending and recieving necessary information for respective functions
* Miscellaneous Goals Completed
  * These are general things that were completed that weren't necessary related to code.
  * Researched and understood 'get' http request with success and ability to display returned information
    * Success in the GetCourseInfoAsStudent function; many future functions will use similar pattern of code to return various information
  * Researched and understood http request to return multiple pieces of information between a chain of tables with success and ability to recieve returned information to frontend
    * Success in the GetCoursesAsTeacher function; many future functions will use similar pattern of code to return multiple pieces of information (e.g. GetQuestions)
  * Further research and full understanding of 'post' http request with success and ability to store recieved information and display sent back information on frontend
    * Success in Register, GetCoursesAsTeacher, and login functions. Many functions have already used similar patterns of code, and we now understand how to alter existing functions to meet necessities of new functions
  * Furthered research into angular and typescript; can comfortable modify .ts files in order to conform functions and page initialization to recieve and send various information from/to API

### Testing
* No new unit testings functions have been necessary nor implemented; all 'get', 'post', 'put', and 'delete' tests retained functionality and maintain enough similarity to in-use functions

### Video
https://youtu.be/1iUgtzFpr68

### Functions
  * app.go
    * func (a *App) Register(w http.ResponseWriter, r *http.Request)
      * Description: After recieving a matching 'post' request from '/Register', decodes http request body into Register endpoint (username, password), then if there are no errors reading the payload, adds the information from Register endpoint into a User object in order to be added to the database. Returns http.StatusOK if no errors occur.
    * func (a *App) TeacherLogin(w http.ResponseWriter, r *http.Request)
      * Description: After recieving a matching 'post' request from '/TeacherLogin', decodes http request body into TeacherLogin endpoint (username, password), then if there are no errors reading payload, attempts to get matching user in database. Returns 404 not found if no user is found. Returns http.StatusOK if no errors occur.
    * func (a *App) StudentLogin(w http.ResponseWriter, r *http.Request)
      * Description: After recieving a matching 'post' request from '/StudentLogin', decodes http request body into StudentLogin endpoint (courseID), then if there are no errors reading payload, attempts to get matching courseID in database. Returns 404 not found if no course is found. Returns http.StatusOK if no errors occur.
    * func (a *App) GetCourseInfoAsStudent(w http.ResponseWriter, r *http.Request)
      * Description: After recieving a matching 'get' request from '/CourseNameAsStudent', constructs an appropriate course object and sends back as a marshalled JSON object. Full functionality as of returning information from database not implemented due to time constraints, but is able to be implemented as soon as possible.
    * func (a *App) GetCoursesAsTeacher(w http.ResponseWriter, r *http.Request)
      * Description: After recieving a matching 'post' request from '/CoursesAsTeacher', decodes http request body into ProfessorCourse endpoint (user_serial, course_serial), then if there are no errors reading payloaad, calls GetManyCourses function (see GetManyCourses for further description)
    * func (a *App) GetQuestionsAsTeacher(w http.ResponseWriter, r *http.Request)
      * Description: After recieving a matching 'post' requestion from '/GetQuestionsAsTeacher', decodes http request body into CourseQuestions endpoint(course_serial, Question, Answer), then if there are no errors reading payload, calls GetManyQuestions function (see getManyQuestions for further description)
  * course.go
    * func GetManyCourses(db *gorm.DB, user_serial int) ([]Course, error)
      * Description: After recieving user_serial from GetCoursesAsTeacher function, queries 'professorcourses' table for all course_serial matching with given user_serial, and takes these course_serials and stores them in an array. Next, queries 'courses' table for all course informatiion matching with given course_serial (found in array created earlier) and stores that course information into a course object then into an array of course objects. Returns the array of course objects inside of a marshalled JSON object.
    * func GetManyQuestions(db *gorm.DB, user_serial int) ([]CourseQuestions, error)
      * Description: After recieving course_serial from GetQuestionsAsTeacher function, queries 'professorcourses' table for all course_serial matching with given user_serial, and takes these course_serialsand stores them in an array. Next, queries 'questions' table for all questions with given course_serial (found in array created earlier) and stores that question information into a question object then into an array of question objects. Returns the array of question objects inside of a marshalled JSON object. Note: Full functionality of splitting questions by courses to be displayed easily by frontend is WIP due to time constrains, but is ready to be worked on as soon as possible.
    
  * user.go
    * func (u *User) GetUserSerial(db *gorm.DB, name string, pass string) int 
      * Description: Queries 'users' table to find the user_id matching a given username and password. Used during login process to send user_id to frontend to send back to backend API for use in functions like GetManyCourses.
