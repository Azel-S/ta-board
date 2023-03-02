## Front-End
### COMPLETED:
* Worked on student-view component
  * Added placeholder syllabus
  * Added placeholder course & professor information.
  * Added sample bot for chatting.
  * Worked on student-view component
* Worked on a signup page
  * Added forms and such that are navigated using a stepper
* Worked on teacher-view component
  * Accordion drop down placeholder to display unresponded student questions with their name, a form to fill out, and a submit button
  * Added placeholder syllabus
* Worked on login component
  * Added credentials object for logging and testing.
  * Made back-end work with register, currently:
    * When the username is get, a get request is made.
    * When the username is post, a post request is made.
* General
  * Added custom component schemas to certain components to fix issues with testing.
### TESTING:
* Cypress
  * Implemented a stepper counter with simple buttons for incrementing and decrementing a displayed count.
* Unit Tests
  * Each tests were written in pairs (returning True and False)
    * Tests comparing “password” and “confirm password” in the login component
    * Tests checking for “admin” as Course ID to enter the student-view
    * Test verifying the sidebar component is created
    * Tests comparing the (currently fixed) total questions in teacher-view are displayed
    * Tests verifying the expansion panels in teacher-view
### VIDEO:
https://youtu.be/hxaVOUsGPDI


## Back-End
### VIDEO:
https://youtu.be/8O6WIjRaCd0

COMPLETED:
* Worked on the user.go & course.go file for user/course objects; Implemented:
  * GetUser & GetCourse function to get a user's/course's info from the database
  * UpdateUser & UpdateCourse function to change a user's/course's info in the database
  * DeleteUser & DeleteCourse function to delete a user/course from the database
  * CreateUser & CreateCourse function to add a user/course to the database
  * GetManyUsers & GetManyCourses function to get a range of users/courses from the database
* Worked on the app.go file for app functionality; Implemented:
  * Initialize function to initialize the connection to the database, initialize the mux router and its routes and start it to listen and serve.
  * GetUser & GetCourse function to get a user/course based on its ID from an HTTP request
  * GetManyUsers & GetManyCourses function to get a range of users/courses based on a start and count index from an HTTP request
  * CreateUser & CreateCourse function to create and send a user/course to be added to the database from an HTTP request
  * UpdateUser & UpdateCourse function to update the information of a user/course from an HTTP request
  * DeleteUser & DeleteCourse function to delete a matching user/course from the database from an HTTP request
* Created and worked on the main_test.go file for unit testing; Implemented:
  * checkTableExistence function to test for a successfully created table in database
  * TestEmptyTable function to test for empty tables
  * TestGetNonExistUser to test for querying to GET a user from the database that doesn't exist (would work the same way for courses as well)
  * TestCreateUser to test for querying to POST a user to the database
  * TestGetUser to test for querying to GET a user from the database that does exist
  * TestUpdateUser to test for querying to PUT a user in the database with new values
  * TestDeleteUser to test for querying to DELETE a user in the database
  * Note: No two unit test functions use two different functions (e.g: GetUser and CreateUser) in order to assure that the unit test tests for only one functionality at a time.
* General:
  * Implemented communication between the Angular frontend and the Golang backend application as successful GET and POST requests between the webpage and the app's router.
## Functions


## ========
## app.go
## ========


### app.Initialize
#### func (a *App) Initialize(user, password, dbname string)
Description: Initializes the connection to the mySQL database and initializes the routes for the app's mux router.
Parameters:
* user - 1st string
* password - 2nd string
* dbname - 3rd string, database name

### app.Run
#### func (a *App) Run(addr string)
Description:
	Initiates the http.ListenAndServe function through the app's mux router on the given address
Parameters:
* addr -  1st string
Returns: 
	Logs a fatal error if one occurs during ListenAndServe.

### app.GetUser
#### func (a *App) GetUser(w http.ResponseWriter, r *http.Request)
Description: 
	Obtains a user ID and finds the user with the associated ID
Parameters:
* w - HTTP Response Writer
* r - HTTP Request object pointer
Returns:
	The HTTP Response Writer, HTTP Status OK, and the user as a marshalled JSON object  using the respondWithJSON helper function. Also will respond with appropriate errors during error handling.


### app.GetManyUsers
#### func (a *App) GetManyUsers(w http.ResponseWriter, r *http.Request)
Description:
	Obtains an array of consecutive user objects given a start and count value from the HTTP request
Parameters:
* w - HTTP Response Writer
* r - HTTP Request object pointer
Returns:
	HTTP Response Writer, HTTP Status OK, and the users array marshalled as an array of JSON objects using the respondWithJSON helper function. Also will respond with appropriate errors during error handling.


### app.CreateUser
#### func (a *App) CreateUser(w http.ResponseWriter, r *http.Request)
Description: 
	Creates a user given a JSON request payload and adds to the mySQL database
Parameters:
* w - HTTP Response Writer
* r - HTTP Request object pointer
Returns:
	HTTP Response Writer, HTTP Status Created, and the created user as a marshalled JSON object using the respondWithJSON helper function. Also will respond with appropriate errors during error handling.


### app.UpdateUser
#### func (a *App) UpdateUser(w http.ResponseWriter, r *http.Request)
Description:
	Updates a user's information in the database given a JSON request payload
Parameters:
* w - HTTP Response Writer
* r - HTTP Request object pointer
Returns:
	HTTP Response Writer, HTTP Status OK, and the updated user as a marshalled JSON object using the respondWithJSON helper function. Also will respond with appropriate errors during error handling.


### app.DeleteUser
#### func (a *App) DeleteUser(w http.ResponseWriter, r *http.Request)
Description:
	Deletes a user given a matching ID obtained from a HTTP request payload.
Parameters:
* w - HTTP Response Writer
* r - HTTP Request object pointer
Returns:
	HTTP Response Writer, HTTP Status OK, and a map of string to strings of the results and successes of the deletion using the respondWithJSON helper function. Also will respond with appropriate errors during error handling.


### app.GetCourse
#### func (a *App) GetCourse(w http.ResponseWriter, r *http.Request)
Description: 
	Obtains a course's ID and finds the course with the associated ID
Parameters:
* w - HTTP Response Writer
* r - HTTP Request object pointer
Returns:
	The HTTP Response Writer, HTTP Status OK, and the course as a marshalled JSON object using the respondWithJSON helper function. Also will respond with appropriate errors during error handling.


### app.GetManyCourses
#### func (a *App) GetManyCourses(w http.ResponseWriter, r *http.Request)
Description:
	Obtains an array of consecutive course objects given a start and count value from the HTTP request
Parameters:
* w - HTTP Response Writer
* r - HTTP Request object pointer
Returns:
	HTTP Response Writer, HTTP Status OK, and the course array marshalled as an array of JSON objects using the respondWithJSON helper function. Also will respond with appropriate errors during error handling.


### app.CreateCourse
#### func (a *App) CreateCourse(w http.ResponseWriter, r *http.Request)
Description: 
	Creates a course given a JSON request payload and adds to the mySQL database
Parameters:
* w - HTTP Response Writer
* r - HTTP Request object pointer
Returns:
	HTTP Response Writer, HTTP Status Created, and the created course as a marshalled JSON object using the respondWithJSON helper function. Also will respond with appropriate errors during error handling.


### app.UpdateCourse
#### func (a *App) UpdateCourse(w http.ResponseWriter, r *http.Request)
Description:
	Updates a user's information in the database given a JSON request payload
Parameters:
* w - HTTP Response Writer
* r - HTTP Request object pointer
Returns:
	HTTP Response Writer, HTTP Status OK, and the updated course as a marshalled JSON object using the respondWithJSON helper function. Also will respond with appropriate errors during error handling.


### app.DeleteCourse
#### func (a *App) DeleteCourse(w http.ResponseWriter, r *http.Request)
Description:
	Deletes a course given a matching ID obtained from a HTTP request payload.
Parameters:
* w - HTTP Response Writer
* r - HTTP Request object pointer
Returns:
	HTTP Response Writer, HTTP Status OK, and a map of string to strings of the results and successes of the deletion using the respondWithJSON helper function. Also will respond with appropriate errors during error handling.


### app.respondWithJSON
#### func respondWithJSON(w http.ResponseWriter, code int, payload interface{})
Description:
	Helper function that marshals a payload into a JSON object and writes the object with the HTTP Response Writer
Parameters:
* w - HTTP Response Writer
* code - integer, some form of http.Status
* payload - interface{}, to be marshalled and returned
Returns:
	Writes the marshalled payload through the HTTP Response Writer


### app.respondWithError
#### func respondWithError(w http.ResponseWriter, code int, message string)
Description:
	Helper function to return an error during error handling.
Parameters:
* w - HTTP Response Writer
* code - integer, some form of http.Status
* message - string
Returns:
	Map of string to strings with errors and messages marshalled into a JSON object using the respondWithJSON helper function.
### app.initializeRoutes
#### func (a *App) initializeRoutes()
Description:
	Initializes routes for the app's mux router to handle when GET/POST/DELETE/PUT/Etc requests are made on a particular URL


## =========
## user.go
## =========


### user.GetUser
#### func (u *User) GetUser(db *gorm.DB) error
Description:
	Gets a user from the mySQL database matching the user's information
Parameters:
* db - GORM database object pointer
Returns:
	Any error during querying the database; returns nil when successful.
  
### user.UpdateUser
#### func (u *User) UpdateUser(db *gorm.DB) error
Description:
	Updates a user's information in the mySQL database matching the user's ID
Parameters:
* db - GORM database object pointer
Returns:
	Any error during querying the database; returns nil when successful.


### user.DeleteUser
#### func (u *User) DeleteUser(db *gorm.DB) error
Description:
	Deletes a user from the mySQL database matching the user's information
Parameters:
* db - GORM database object pointer
Returns:
	Any error during querying the database; returns nil when successful.


### user.CreateUser
#### func (u *User) CreateUser(db *gorm.DB) error
Description:
	Adds a user to the mySQL database with the user's information
Parameters:
* db - GORM database object pointer
Returns:
	Any error during querying the database; returns nil when successful.


### user.GetManyUsers
#### func GetManyUsers(db *gorm.DB, start, count int) ([]User, error)
Description:
	Gets an array of consecutive users from the mySQL database starting from the start integer index and forward count integer times. 
Parameters:
* db - GORM database object pointer
* start - 1st integer
* count - 2nd integer
Returns:
	Array of users and any errors during querying the database; returns arrays of users and nil when successful.


## =========
## course.go
## =========


### course.GetCourse
#### func (c *Course) GetCourse(db *gorm.DB) error
Description:
	Gets a course from the mySQL database matching the course's information
Parameters:
* db - GORM database object pointer
Returns:
	Any error during querying the database; returns nil when successful.


### course.UpdateCourse
#### func (c *Course) UpdateCourse(db *gorm.DB) error
Description:
	Updates a course's information in the mySQL database matching the course's ID
Parameters:
* db - GORM database object pointer
Returns:
	Any error during querying the database; returns nil when successful.


### course.DeleteCourse
#### func (c *Course) DeleteCourse(db *gorm.DB) error 
Description:
	Deletes a course from the mySQL database matching the course's information
Parameters:
* db - GORM database object pointer
Returns:
	Any error during querying the database; returns nil when successful.


### course.CreateCourse
#### func (u *User) CreateUser(db *gorm.DB) error
Description:
	Adds a course to the mySQL database with the course's information
Parameters:
* db - GORM database object pointer
Returns:
	Any error during querying the database; returns nil when successful.


### course.GetManyCourses
#### func GetManyCourses(db *gorm.DB, start, count int) ([]Course, error) 
Description:
	Gets an array of consecutive courses from the mySQL database starting from the start integer index and forward count integer times. 
Parameters:
* db - GORM database object pointer
* start - 1st integer
* count - 2nd integer
Returns:
	Array of courses and any errors during querying the database; returns arrays of courses and nil when successful.
