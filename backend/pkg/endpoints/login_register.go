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
	User_serial   int `json:"user_serial"`
	Course_serial int `json:"course_serial"`
}

type User struct {
	ID       int
	Username string `mux:"column:professor_name"`
	Password string `mux:"column:password"`
}

type Tabler interface {
	TableName() string
}

func TableName() string {
	return "testdb"
}
