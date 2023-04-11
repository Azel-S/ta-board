package models

import (
	"TA-Bot/backend/pkg/endpoints"
	"fmt"

	"github.com/jinzhu/gorm"
)

const CoursesCreationQuery = `CREATE TABLE IF NOT EXISTS courses
(
	id SERIAL,
	course_id TEXT NOT NULL,
	course_name TEXT NOT NULL,
	passcode TEXT NOT NULL,
	professor_name TEXT NOT NULL,
	course_info_raw TEXT NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
)`

const CourseAddAdminQuery = `INSERT INTO courses(course_id, course_name, passcode, professor_name, course_info_raw)
VALUES('ADMIN', 'ADMIN101', 'ADMIN', 'ADMIN', 'ADMIN COURSE INFO')
`
const CourseAddTESTQuery = `INSERT INTO courses(course_id, course_name, passcode, professor_name, course_info_raw)
VALUES('jon123', 'johnnys class', 'ADMIN', 'Johnny', 'Johnny\'s class for bad students')
`
const CoursesQuestionsCreationQuery = `CREATE TABLE IF NOT EXISTS courses
(
	course_serial SERIAL,
	question TEXT NOT NULL,
	answer TEXT NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (course_serial)
)`

type Course struct {
	ID             int    `json:"id"`
	CourseID       string `json:"course_id"`
	CourseName     string `json:"course_name"`
	Passcode       string `json:"passcode"`
	ProfessorName  string `json:"professor_name"`
	CourseInfo_raw string `json:"course_info_raw"`
}

type CourseQuestions struct {
	Course_serial int    `json:"course_serial"`
	Question      string `json:"question"`
	Answer        string `json:"answer"`
}

func (Course) TableName() string {
	return "courses"
}

// RETURNS THE FIRST INSTANCE OF MATCHING COURSE IN DATABASE
func (c *Course) GetCourse(db *gorm.DB) error {
	ret := db.Where(Course{CourseID: c.CourseID, Passcode: c.Passcode}).First(&c) // Find course where classID matches
	return ret.Error
}

func (c *Course) GetCourseID(db *gorm.DB, course_id string, passcode string) int {
	type Result struct {
		course_serial int
	}
	var ret Result
	db.Table("courses").Select("id").Where(Course{CourseID: course_id, Passcode: passcode}).Scan(&ret)
	return ret.course_serial
}

// UPDATES THE FIRST INSTANCE OF MACHING COURSE IN DATABASE WITH NEW VALUES
func (c *Course) UpdateCourse(db *gorm.DB) error {
	ret := db.Model(&c).Omit("id").Updates(Course{CourseID: c.CourseID, CourseName: c.CourseName, CourseInfo_raw: c.CourseInfo_raw})
	return ret.Error
}

// DELETES THE FIRST INSTANCE OF MACHING COURSE IN DATABASE
func (c *Course) DeleteCourse(db *gorm.DB) error {
	ret := db.Delete(&c)
	return ret.Error
}

// CREATES COURSE IN DATABASE
func (c *Course) CreateCourse(db *gorm.DB) error {
	ret := db.Create(&c)

	return ret.Error
}

// CONSTRUCTS AND RETURNS AN ARRAY OF COURSES STARTING FROM 'START' INDEX AND 'COUNT' INDICES FORWARD
func GetManyCourses(db *gorm.DB, user_serial int) ([]Course, error) {
	rows, err := db.Raw("SELECT * FROM professorcourses WHERE user_serial=?", user_serial).Rows()
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	pcList := []endpoints.ProfessorCourse{}
	for rows.Next() {
		var c endpoints.ProfessorCourse
		if err := rows.Scan(&c.ID, &c.User_serial, &c.Course_serial); err != nil {
			return nil, err
		}

		pcList = append(pcList, c)
	}

	courseList := []Course{}
	for i := 0; i < len(pcList); i++ {
		c_rows, err := db.Raw("SELECT * FROM courses WHERE id=?", pcList[i].Course_serial).Rows()
		if err != nil {
			return nil, err
		}

		for c_rows.Next() {
			var c Course
			var trash string

			if err := c_rows.Scan(&c.ID, &c.CourseID, &c.CourseName, &trash, &c.ProfessorName, &c.CourseInfo_raw); err != nil {
				return nil, err
			}

			courseList = append(courseList, c)
		}
	}
	return courseList, nil
}

func GetManyQuestions(db *gorm.DB, course_serial int) ([]CourseQuestions, error) {
	fmt.Println("Test")
	rows, err := db.Raw("SELECT * FROM questions WHERE course_serial=?", course_serial).Rows()
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	fmt.Println("Test2")
	qList := []endpoints.CourseQuestions{}
	for rows.Next() {
		var c endpoints.CourseQuestions
		if err := rows.Scan(&c.Course_serial, c.Question, c.Answer); err != nil {
			return nil, err
		}

		qList = append(qList, c)
	}
	fmt.Println("Test3")

	questionsList := []CourseQuestions{}
	for i := 0; i < len(qList); i++ {
		c_rows, err := db.Raw("SELECT * FROM questions WHERE id=?", qList[i].Course_serial).Rows()
		if err != nil {
			return nil, err
		}

		for c_rows.Next() {
			var c CourseQuestions

			if err := c_rows.Scan(&c.Course_serial, &c.Question, &c.Answer); err != nil {
				return nil, err
			}

			questionsList = append(questionsList, c)
		}
	}
	fmt.Println("Test4")

	return questionsList, nil
}
