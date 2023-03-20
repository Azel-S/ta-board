package endpoints

type Register struct {
	Username        string `json:"username"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

type StudentLogin struct {
	CourseID string `json:"course_id"`
}

type TeacherLogin struct {
	Username string `json:"username"`
	Password string `json:"password"`
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
