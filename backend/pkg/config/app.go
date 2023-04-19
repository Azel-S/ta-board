package config

import (
	models "TA-Bot/backend/pkg/models"

	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	_ "github.com/jinzhu/gorm/dialects/mysql"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

type App struct {
	DB     *gorm.DB
	Router *mux.Router
}

const DropPrevTables = `DROP TABLE IF EXISTS users, courses, questions`

// Opens a connection with the database
func (a *App) Connect(cPath string) {
	d, err := gorm.Open("mysql", cPath)
	if err != nil {
		panic(err)
	}
	a.DB = d
}

func (a *App) Initialize(username, password, dbname string) {
	// Opens database according to given paramaters
	a.Connect(username + ":" + password + "@tcp(localhost:3306)/" + dbname + "?charset=utf8&parseTime=True&loc=Local")
	a.Router = mux.NewRouter()
	a.initializeRoutes()

	UsersTableQuery := `CREATE TABLE IF NOT EXISTS users
	(
		user_serial SERIAL,
		username TEXT NOT NULL,
		password TEXT NOT NULL,
		professor_name TEXT NOT NULL,
		CONSTRAINT users_pkey PRIMARY KEY (user_serial)
	)`

	CoursesTableQuery := `CREATE TABLE IF NOT EXISTS courses
	(
		course_serial SERIAL,
		user_serial INT,
		course_id TEXT NOT NULL,
		course_code TEXT NOT NULL,
		course_name TEXT NOT NULL,
		professor_name TEXT NOT NULL,
		description TEXT NOT NULL,
		CONSTRAINT users_pkey PRIMARY KEY (course_serial)
	)`

	QuestionsTableQuery := `CREATE TABLE IF NOT EXISTS questions
	(
		id SERIAL,
		course_serial INT,
		question varchar(255),
		answer varchar(255),
		date_time varchar(255),
		CONSTRAINT pkey PRIMARY KEY (id)
	)`

	// Drop/Remove old tables
	a.DB.Exec(DropPrevTables)

	// Executes table creation queries
	a.DB.Exec(UsersTableQuery)
	a.DB.Exec(CoursesTableQuery)
	a.DB.Exec(QuestionsTableQuery)

	// Add User John's data
	a.AddUserParam("john", "john", "John Doe")
	a.AddCourseParam(1, "CEN3031", "#0000", "Software Engineering", "John Doe", "This course goes over the fundamentals of programming in the real world.")
	a.AddCourseParam(1, "COP4600", "#0003", "Operating Systems", "John Doe", "This course teaches the student about core concepts within the modern operating system.")
	a.AddCourseParam(1, "JOHN1001", "#0002", "How to John: The Intro", "John Doe", "John's class for bad students!")

	a.AddQuestionParam(1, "What is software Engineering anyways?", "No response", "03/12/2019 05:54PM")
	a.AddQuestionParam(1, "Is this worth all the trouble? No, really?", "No response", "03/12/2019 05:54PM")
	a.AddQuestionParam(2, "Is linux actually better?", "No!", "03/12/2019 05:54PM")
	a.AddQuestionParam(2, "MacOS is the best system ever made, right?", "Hell nah!", "03/12/2019 05:54PM")
	a.AddQuestionParam(2, "What about Windows?", "XP FTW!", "03/12/2019 05:54PM")
	a.AddQuestionParam(3, "What does it mean to John?", "No response", "03/12/2019 05:54PM")
	a.AddQuestionParam(3, "Why do I never get a response?", "Extra no response", "03/12/2019 05:54PM")

	// Add User Jane's data
	a.AddUserParam("jane", "jane", "Jane Doe")
	a.AddCourseParam(2, "JANE1001", "#0001", "How to Jane: The Sequel", "Jane Doe", "Jane's class for great students!")
	a.AddCourseParam(2, "LEI2818", "#1003", "Leisure", "Jane Doe", "Learn about how relaxing is great, however you don\"t get to do that because you are taking this course! Mwahaahaha.")
	a.AddCourseParam(2, "FOS2001", "#0022", "Mans Food", "Jane Doe", "Learn about why eating tasty stuff is bad.")

	a.AddQuestionParam(4, "What does it mean to Jane?", "No response", "03/12/2019 05:54PM")
	a.AddQuestionParam(4, "I liked the prequel, John better. Thoughts?", "This is a sequel, they always suck!", "03/12/2019 05:54PM")
	a.AddQuestionParam(5, "Why is called Mans food, I thought we were all for equality?", "No response", "03/12/2019 05:54PM")
	a.AddQuestionParam(5, "Sugar is good, right?", "No response", "03/12/2019 05:54PM")
	a.AddQuestionParam(6, "How come I never have any leisure in this class?", "No response", "03/12/2019 05:54PM")

	a.AddUserParam("jay", "jay", "Jay Day")
	a.AddCourseParam(3, "JAY2004", "#4004", "Music", "Jay Day", "Music is great, learn about it and stuff...")
	a.AddQuestionParam(7, "So glad this is not a country music class, it's all the same now! Agreed?", "No response", "03/12/2019 05:54PM")
}

func (a *App) AddUserParam(username string, password string, professor_name string) {
	userObj := models.User{Username: username, Password: password, ProfessorName: professor_name}
	a.DB.Table(userObj.TableName()).Save(&userObj)
}

func (a *App) AddCourseParam(user_serial int, course_id string, course_code string, course_name string, professor_name string, description string) {
	courseObj := models.Course{UserSerial: user_serial, CourseID: course_id, CourseCode: course_code, CourseName: course_name, ProfessorName: professor_name, Description: description}
	a.DB.Table(courseObj.TableName()).Save(&courseObj)
}

// func (a *App) AddQuestionParam(courseSerial int, questionStr string, answer string, date_time time.Time) {
func (a *App) AddQuestionParam(courseSerial int, questionStr string, answer string, date_time string) {
	questionObj := models.Question{CourseSerial: courseSerial, Question: questionStr, Answer: answer, DateTime: date_time}
	a.DB.Table(questionObj.TableName()).Save(&questionObj)
}

// Listens for incoming requests from Angular
func (a *App) Run(addr string) {
	log.Fatal(http.ListenAndServe(addr, a.Router))
}

// Returns pointer to database
func (a *App) GetDB() *gorm.DB {
	return a.DB
}

// Returns pointer to database
func (a *App) GetRTR() *mux.Router {
	return a.Router
}

/*

	USER FUNCTIONS

*/

// DELETES A USER IN DATABASE
func (a *App) DeleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r) // Same pattern as in UpdateUser() and GetUser()
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid user ID")
		return
	}
	u := models.User{UserSerial: id} // Create user struct with given ID
	// Attempts to find the User row with matching ID as created user struct above and delete it
	if err := u.DeleteUser(a.DB); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJSON(w, http.StatusOK, map[string]string{"result": "success"})
}

/*

	COURSE FUNCTIONS

*/

// DELETES A COURSE IN DATABASE
func (a *App) DeleteCourse(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid course identifier")
		return
	}
	c := models.Course{CourseSerial: id}
	if err := c.DeleteCourse(a.DB); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJSON(w, http.StatusOK, map[string]string{"result": "success"})
}

/*

	Frontent Integration

*/

// Inputs: username, password
func (a *App) Register(w http.ResponseWriter, r *http.Request) {
	// Non-CORS request
	if !HandleCORS(&w, r) {
		var userObj models.User

		// JSON decode success
		if json.NewDecoder(r.Body).Decode(&userObj) == nil {
			// TODO: Check for exists of username.
			if err := userObj.CreateUser(a.DB); err == nil {
				fmt.Println("Register(): Added ", userObj)
				respondWithJSON(w, http.StatusCreated, userObj)
			} else {
				fmt.Println("Register(): Error adding user")
				respondWithError(w, http.StatusInternalServerError, err.Error())
			}
		} else {
			fmt.Println("TeacherLogin(): Invalid JSON recieved")
			respondWithError(w, http.StatusBadRequest, "Invalid JSON recieved")
		}

		r.Body.Close()
	}
}

// Inputs: user_serial, professor_name
func (a *App) UpdateName(w http.ResponseWriter, r *http.Request) {
	// Non-CORS request
	if !HandleCORS(&w, r) {
		var userObj models.User

		// JSON decode success
		if json.NewDecoder(r.Body).Decode(&userObj) == nil {
			if userObj.Exists(a.DB) {
				userObj.UpdateName(a.DB)
				respondWithJSON(w, http.StatusOK, userObj)
				fmt.Println("UpdateName(): Added ", userObj)
			} else {
				fmt.Println("UpdateName(): User not found in database")
				respondWithError(w, http.StatusNotFound, "User not found in database")
			}
		} else {
			fmt.Println("UpdateName(): Invalid JSON recieved")
			respondWithError(w, http.StatusBadRequest, "Invalid JSON recieved")
		}

		r.Body.Close()
	}
}

// Inputs: username, password
func (a *App) Teacher(w http.ResponseWriter, r *http.Request) {
	// Non-CORS request
	if !HandleCORS(&w, r) {
		var userObj models.User

		// JSON decode success
		if json.NewDecoder(r.Body).Decode(&userObj) == nil {
			if userObj.Exists(a.DB) {
				userObj.Fill(a.DB)
				respondWithJSON(w, http.StatusOK, userObj)
				fmt.Println("TeacherLogin(): Sent", userObj)
			} else {
				fmt.Println("TeacherLogin(): User not found in database")
				respondWithError(w, http.StatusNotFound, "User not found in database")
				// should have a check for error type and a respondWithError(w, http.StatusInternalServerError, err.Error()), but it's causing some issues
			}
		} else {
			fmt.Println("TeacherLogin(): Invalid JSON recieved")
			respondWithError(w, http.StatusBadRequest, "Invalid JSON recieved")
		}

		r.Body.Close()
	}
}

// Inputs: course_id, course_code
func (a *App) Student(w http.ResponseWriter, r *http.Request) {
	// Non-CORS request
	if !HandleCORS(&w, r) {
		var courseObj models.Course

		// JSON decode success
		if json.NewDecoder(r.Body).Decode(&courseObj) == nil {
			if courseObj.Exists(a.DB) {
				courseObj.Fill(a.DB)
				respondWithJSON(w, http.StatusOK, courseObj)
				fmt.Println("Student(): Sent", courseObj)
			} else {
				fmt.Println("Student(): Course not found in database")
				respondWithError(w, http.StatusNotFound, "Course not found in database")
			}
		} else {
			fmt.Println("Student(): Invalid JSON recieved")
			respondWithError(w, http.StatusBadRequest, "Invalid JSON recieved")
		}

		r.Body.Close()
	}
}

// Inputs: user_serial
func (a *App) Courses(w http.ResponseWriter, r *http.Request) {
	// Non-CORS request
	if !HandleCORS(&w, r) {
		var courseObj models.Course

		// JSON decode success
		if json.NewDecoder(r.Body).Decode(&courseObj) == nil {
			courses, err := courseObj.GetCourses(a.DB)
			if err == nil {
				respondWithJSON(w, http.StatusOK, courses)
				fmt.Println("GetCourses(): Sent " + strconv.Itoa(len(courses)) + " courses")
			} else {
				fmt.Println("GetCourses(): Error encountered")
				respondWithError(w, http.StatusInternalServerError, err.Error())
			}
		} else {
			fmt.Println("GetCourses(): Invalid JSON recieved")
			respondWithError(w, http.StatusBadRequest, "Invalid JSON recieved")
		}

		r.Body.Close()
	}
}

// Inputs: user_serial course_id course_code course_name professor_name desciption
func (a *App) AddCourse(w http.ResponseWriter, r *http.Request) {
	// Non-CORS request
	if !HandleCORS(&w, r) {
		var courseObj models.Course

		// JSON decode success
		if json.NewDecoder(r.Body).Decode(&courseObj) == nil {
			err := courseObj.CreateCourse(a.DB)
			if err == nil {
				respondWithJSON(w, http.StatusOK, courseObj)
				fmt.Println("AddCourse(): Added ", courseObj)
			} else {
				fmt.Println("AddCourse(): Error encountered")
				respondWithError(w, http.StatusInternalServerError, err.Error())
			}
		} else {
			fmt.Println("AddCourse(): Invalid JSON recieved")
			respondWithError(w, http.StatusBadRequest, "Invalid JSON recieved")
		}

		r.Body.Close()
	}
}

// Inputs: course_serial
func (a *App) Questions(w http.ResponseWriter, r *http.Request) {
	// Non-CORS request
	if !HandleCORS(&w, r) {
		var questionObj models.Question

		// JSON decode success
		if json.NewDecoder(r.Body).Decode(&questionObj) == nil {
			questions, err := questionObj.GetQuestions(a.DB)
			if err == nil {
				respondWithJSON(w, http.StatusOK, questions)
				fmt.Println("GetQuestions(): Sent " + strconv.Itoa(len(questions)) + " question(s)")
			} else {
				fmt.Println("GetQuestions(): Error encountered")
				respondWithError(w, http.StatusInternalServerError, err.Error())
			}
		} else {
			fmt.Println("GetQuestions(): Invalid JSON recieved")
			respondWithError(w, http.StatusBadRequest, "Invalid JSON recieved")
		}

		r.Body.Close()
	}
}

// Inputs: course_serial, question, answer
func (a *App) AddQuestion(w http.ResponseWriter, r *http.Request) {
	// Non-CORS request
	if !HandleCORS(&w, r) {
		var questionObj models.Question

		// JSON decode success
		if json.NewDecoder(r.Body).Decode(&questionObj) == nil {
			if questionObj.DateTime == "" {
				s := time.Now()
				time_string := s.Format("01/02/2006 03:04:05PM")
				// TODO: Verify am/pm

				questionObj.DateTime = time_string
			}

			err := questionObj.AddQuestion(a.DB)
			if err == nil {
				respondWithJSON(w, http.StatusOK, questionObj)
				fmt.Println("AddQuestion(): Added ", questionObj)
			} else {
				fmt.Println("AddQuestion(): Error encountered")
				respondWithError(w, http.StatusInternalServerError, err.Error())
			}
		} else {
			fmt.Println("AddQuestion(): Invalid JSON recieved")
			respondWithError(w, http.StatusBadRequest, "Invalid JSON recieved")
		}

		r.Body.Close()
	}
}

// Inputs: course_serial, question, answer
func (a *App) UpdateAnswer(w http.ResponseWriter, r *http.Request) {
	// Non-CORS request
	if !HandleCORS(&w, r) {
		var questionObj models.Question

		// JSON decode success
		if json.NewDecoder(r.Body).Decode(&questionObj) == nil {
			if questionObj.Exists(a.DB) {
				questionObj.UpdateAnswer(a.DB)
				respondWithJSON(w, http.StatusOK, questionObj)
				fmt.Println("UpdateAnswer(): Updated ", questionObj)
			} else {
				fmt.Println("UpdateAnswer(): Question not found in database")
				respondWithError(w, http.StatusNotFound, "Question not found in database")
			}
		} else {
			fmt.Println("UpdateAnswer(): Invalid JSON recieved")
			respondWithError(w, http.StatusBadRequest, "Invalid JSON recieved")
		}

		r.Body.Close()
	}
}

/*

	HELPER FUNCTIONS

*/

// HELPER FUNCTION TO RETURN PAYLOAD AS A JSON OBJECT AS WELL AS RETURN APPROPRIATE ERROR CODES IF ANY
func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

// HELPER FUNCTION TO RETURN AN ERROR AS A JSON OBJECT
func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

// Automatically Sets CORS Header and respons with OK if required
func HandleCORS(w *http.ResponseWriter, req *http.Request) bool {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	if (*req).Method == "OPTIONS" {
		(*w).WriteHeader(http.StatusOK)
		return true
	} else {
		return false
	}
}

// Sets up routes that need handling -> WHEN ROUTER SEES A HTTP REQUEST MATCHING THE TYPE AND URL, EXECUTE A GIVEN FUNCTION
func (a *App) initializeRoutes() {
	a.Router.HandleFunc("/RegisterCredentials", a.Register).Methods("POST", "OPTIONS")
	a.Router.HandleFunc("/UpdateName", a.UpdateName).Methods("POST", "OPTIONS")

	a.Router.HandleFunc("/Teacher", a.Teacher).Methods("POST", "OPTIONS")
	a.Router.HandleFunc("/Student", a.Student).Methods("POST", "OPTIONS")

	a.Router.HandleFunc("/GetCourses", a.Courses).Methods("POST", "OPTIONS")
	a.Router.HandleFunc("/AddCourse", a.AddCourse).Methods("POST", "OPTIONS")

	a.Router.HandleFunc("/GetQuestions", a.Questions).Methods("POST", "OPTIONS")
	a.Router.HandleFunc("/AddQuestion", a.AddQuestion).Methods("POST", "OPTIONS")
	a.Router.HandleFunc("/UpdateAnswer", a.UpdateAnswer).Methods("POST", "OPTIONS")
}
