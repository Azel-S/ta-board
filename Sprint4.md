## Reflection (Final Thoughts)
### Front-End
  * Overall, this project was a great learning experience.  There were multiple areas in which I learned about software engineering and improved as a developer: professional communication, task prioritization, code cohesion, and project organization.
    * Professional Communication: From the onset, our team committed to weekly meetings at 7pm on Mondays.  We met to discuss challenges encountered and next steps.  Additionally, the front-end team committed to live coding sessions every Tuesday and Thursdays.  Here we worked together as if in the workplace trying to solve problems.
* Throughout the project, I learned to prioritize different tasks. I learned the importance of creating a prototype. Without having a proof of concept, it is much harder to bring your idea to fruition.
  * Learning to navigate different types of languages was also a valuable learning experience. Now I can switch between HTML/CSS/JS without much issue. It has also helped me better grasp the connection between the three different files and how they interact with each other.  Typescript, at first look, was daunting, but we slowly got better the more we used it.  In other classes, we are given libraries and directions, however, we were forced to find our own solutions to our truly unique problems.
  * Lastly, having worked with the backend to solve small but hair-scratching issues, I can now better appreciate good documentation. Having to learn why a certain feature is not working is very hard if you have no previous knowledge. For example, earlier on, we ran into a CORS request issue, and this was causing us many headaches, we tried to use a proxy, send headers, and so much more. In the end, it turned out that having the backend respond to an OPTIONS request was the best way to solve it.

### Back-End
  * This project opened the opportunity for a lot of self-guided learning of various topics whose practical application is often out of scope of many other courses. Organization of projects, communication between team-members, and working on a single program as a long-term team are three soft skills that most stood out during this project
  * Project organization was the first big hurdle to overcome. The project had a very large initial scope and we knew it would require a plethora of new skills, both soft and practical, to learn individually and as a group. Organizing the frontend and backend work to work in tandem was a struggle that we tried to originally separate and try to merge together during meetings; however, we quickly learned it was much easier to simply work together on smaller functionalities at a time, something that required even further communication. Overall was a great learning experience communicating between a group working on separate things, albeit still together.
  * The back-end originally required a lot of research into Golang. Learning and applying a new language in a short time frame was an interesting challenge and I believe was valuable in order to learn to be flexible and quick on our feet. Using Golang to implement an API with a frontend service taught us a considerable amount about HTTP requests and routing. We used a REST structured API and I believe this was intuitive and definitely applicable to future work.
  * The project went through a multitude of ideas, versions, and structures both in planning and in actual code. Discussing what was realistic vs what new ideas could be added made for a constantly-evolving project that incorporated new skills at each turn. I think this flexibility was one of the most valuable lessons of this project. It required us being quick on our feet to offer new ideas and theorize what could and couldn't be implemented within our timeframes, and it led to learning a lot of new practical and applicable skills that closely resembled real-career problems that I am sure will be invaluable moving forward.

## FRONT-END
### Completed
* App-Component

* Side-Bar
  * Previously all data was being cleared when a refresh was performed.  LocalStorage was added to ensure data was consistent after logging in and out as a teacher or student.  

* Login-Component
  * Student Login Validation - Improper input displays an error message in strong red
    * ValidateStudent(): Functions that check that login credentials are valid before proceeding to the student dashboard
      * Include a Course ID of length 7 (eg. CEN3031)
      * Course Codes must start with: # (eg. #1234)
      * Include a Course Code of length 5 (eg. #1234)
  * Teacher Registration Validation - Improper input displays an error message in strong red
    * ValidateRegister(): Functions that check that registration password is valid before proceeding to the registration stepper
      * Password of minimum length 4 (eg. abcd)
      * Confirm Password of minimum length 4 (eg. abcd)

* Student-View
  * Static form field removed from Student View dashboard
  * Time and Date functions added to display when posts have been added or responded to
  * Questions are now updated on submission. Updated with the backend as well.

* Teacher-View
  * Changed the modify button to a view button. Is more inline with the goal of it.
  * Delete button now deletes the course.

* Course-View
  * Responses are now updated on submission. Updated with the backend as well.
  * Added a delete button to the course-view.

* Signup
  * Modified password and confirm password verification

* DataComponent Service
  * Objects are now more in sync with the backend. (e.g. course_id is now called course_serial).
  * Added a notify method.

* DataBackend Service
  * Added UpdateName() function. Updates registered users name (on backend).
  * Added DeleteCourse() and DeleteQuestion() functions.

* General
  * Tried to incorporate a proxy, but could not make it work.

### Testing
* Cypress Tests (29/29 passing)
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
  * Verifies that the teacher dashboard is active, navigable and verifies the number of courses displayed in the teacher's dashboard.
  * Checks that a student can log in with a valid course code and course id
  * This test ensures that there is a button to ask a question when not actively posting
  * The questions form field is only active and visible after the ask question button is clicked
  * Verifies that a question can be submitted into the question form field
  * Ensures that students can cancel writing their question and the ask button returns as the form field goes away
  * Verify that students do not see submit and cancel after cancellation
  * Teacher Can Login (John)
  * Teacher Can Login (Jane)
  * Teacher Can Login (Jay)
  * Student Can Login (CEN3031)
  * Student Can Login (COP4600)
  * Student Can Login (JOHN1001)
  * Student Can Login (JANE1001)
  * Student Can Login (LEI2818)
  * Student Can Login (FOS2001)
  * Student Can Login (JAY2004)


### Front-end Video
https://youtu.be/jmSSTUuAtq8


## BACK-END

### Completed

* App.go
  * Updated functionality of functions: Register, UpdateName (previously UpdateUser), Teacher (previously TeacherLogin), Student (previously StudentLogin), Courses (previously GetCourses), AddCourse, and HandleCors
  * Added functions: DeleteCourse, DeleteQuestions, Questions (GetQuestions), AddQuestion, and UpdateAnswer


* Models.go
  * Updated functionality of functions: Exists (previously GetUser and GetCourse), Fill (previously AddUser), CreateCourse, GetCourses
  * Added functions: UpdateName, DeleteCourse, AddQuestion, UpdateAnswer, GetQuestions, GetUserSerial, DeleteQuestions


* main_test
  * Updated unit tests to reflect present functionality.

* Documentation
  * App.go
    * func (a *App) DeleteCourse(w http.ResponseWriter, r *http.Request)
      * Description: After receiving a matching 'post' request from '/RegisterCredentials', decodes http request body into Course endpoint, then if there are no errors reading the payload, adds the information into a Course object in order to be added to the database. Returns http.StatusOK if no errors occur.
    * func (a *App) DeleteQuestion(w http.ResponseWriter, r *http.Request)
      * Description: After receiving a matching 'post' request from '/DeleteQuestion, decodes http request body into Question endpoint, then if there are no errors reading the payload, adds the information into a Questions object in order to be added to the database. Returns http.StatusOK if no errors occur.
    * func (a *App) Register(w http.ResponseWriter, r *http.Request)
      * Description: After receiving a matching 'post' request from '/RegisterCredentials, decodes http request body into User endpoint, then if there are no errors reading the payload, adds the information into a User object in order to be added to the database. Returns http.StatusOK if no errors occur.
    * func (a *App) UpdateName(w http.ResponseWriter, r *http.Request)
      * Description: After receiving a matching 'post' request from '/UpdateName, decodes http request body into User endpoint, then if there are no errors reading the payload, adds the information into a User object in order to update matching User in the database. Returns http.StatusOK if no errors occur.
    * func (a *App) Teacher(w http.ResponseWriter, r *http.Request)
      * Description: After receiving a matching 'post' request from '/Teacher, decodes http request body into User endpoint, then if there are no errors reading the payload, adds the information into a User object in order to get User in the database for login. Returns http.StatusOK if no errors occur.
    * func (a *App) Student(w http.ResponseWriter, r *http.Request)
      * Description: After receiving a matching 'post' request from '/Student, decodes http request body into Course endpoint, then if there are no errors reading the payload, adds the information into a Course object in order to get Course in the database for login. Returns http.StatusOK if no errors occur.
    * func (a *App) Courses(w http.ResponseWriter, r *http.Request)
      * Description: After receiving a matching 'post' request from '/GetCourses, decodes http request body into Course endpoint, then if there are no errors reading the payload, adds the information into a Course object in order to get courses in the database for displaying info. Returns http.StatusOK if no errors occur.
    * func (a *App) AddCourse(w http.ResponseWriter, r *http.Request)
      * Description: After receiving a matching 'post' request from '/AddCourse, decodes http request body into Course endpoint, then if there are no errors reading the payload, adds the information into a Course object in order to add Course into the database. Returns http.StatusOK if no errors occur.
    * func (a *App) Questions(w http.ResponseWriter, r *http.Request)
      * Description: After receiving a matching 'post' request from '/GetQuestions, decodes http request body into Question endpoint, then if there are no errors reading the payload, adds the information into a Question object in order to get questions from the database for displaying info. Returns http.StatusOK if no errors occur.
    * func (a *App) AddQuestion(w http.ResponseWriter, r *http.Request)
      * Description: After receiving a matching 'post' request from '/AddQuestion, decodes http request body into Question endpoint, then if there are no errors reading the payload, adds the information into a Question object in order to add to questions table in database. Returns http.StatusOK if no errors occur.
    * func (a *App) UpdateAnswer(w http.ResponseWriter, r *http.Request)
      * Description: After receiving a matching 'post' request from '/AddQuestion, decodes http request body into Question endpoint, then if there are no errors reading the payload, updates the answer field of matching question in the database. Returns http.StatusOK if no errors occur.

  * Models.go
    * func (u *User) Exists(db *gorm.DB) bool
      * Description: Check user's existence in database by querying User table
    * func (u *User) Fill(db *gorm.DB)
      * Description: Fills missing information for user objects
    * func (u *User) UpdateName(db *gorm.DB)
      * Description: Updates Professor_Name column in Users table for matching user
    * func (c *Course) Exists(db *gorm.DB) bool
      * Description: Check course's existence in database by querying Course table
    * func (c *Course) Fill(db *gorm.DB)
      * Description: Fills missing information for course objects
    * func (c *Course) CreateCourse(db *gorm.DB) error
      * Description: Adds a user to database in User table
    * func (c *Course) GetCourses(db *gorm.DB) ([]Course, error)
      * Description: Gets an array of courses in Courses table
    * func (c *Course) DeleteCourse(db *gorm.DB) error
      * Description: Deletes matching course in Courses table
    * func (q *Question) Exists(db *gorm.DB) bool
      * Description: Check question's existence in database by querying Question table
    * func (q *Question) AddQuestion(db *gorm.DB) error
      * Description: Adds a question to database in Questions table
    * func (q *Question) UpdateAnswer(db *gorm.DB)
      * Description: Updates Answer column in Questions table for matching question
    * func (q *Question) GetQuestions(db *gorm.DB) ([]Question, error)
      * Description: Gets an array of courses in Courses table
    * func (u *User) GetUserSerial(db *gorm.DB) int
      * Description: Gets a user's serial from matching username and password. This is to send to the front end in order to send back when requesting information.
    * func (q *Question) DeleteQuestion(db *gorm.DB) error
      * Description: Deletes matching question in Questions table
    * func (u *User) DeleteUser(db *gorm.DB) error
      * Description: Deletes matching user in User table (for testing)
    * func (u *User) CreateUser(db *gorm.DB) error
      * Description: Creates user in User table (for testing)

### Back-end Video
https://youtu.be/EXTn8LxCtOc

