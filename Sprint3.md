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

### Testing

### Video

### Functions
