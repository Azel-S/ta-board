package endpoints

type Register struct {
	Username        string `json:"username"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

type StudentLogin struct {
	CourseID string `json:"courseID"`
}

type TeacherLogin struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type ProfessorCourse struct {
	ID            int `json:"id"`
	User_serial   int `json:"user_serial"`
	Course_serial int `json:"course_serial"`
}

type CourseQuestions struct {
	Course_serial int    `json:"course_serial"`
	Question      string `json:"question"`
	Answer        string `json:"answer"`
}

type User struct {
	ID       int
	Username string `mux:"column:professor_name"`
	Password string `mux:"column:password"`
}

type Course struct {
	ID             int    `json:"id"`
	CourseID       string `json:"course_id"`
	CourseName     string `json:"course_name"`
	Passcode       string `json:"passcode"`
	ProfessorName  string `json:"professor_name"`
	CourseInfo_raw string `json:"course_info_raw"`
}

type Tabler interface {
	TableName() string
}

func TableName() string {
	return "testdb"
}
