package models

import (
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

const CourseAddAdminQuery = `INSERT INTO courses(id, course_id, course_name, passcode, professor_name, course_info_raw)
VALUES('1', 'ADMIN', 'ADMIN101', 'ADMIN', 'ADMIN PROF', 'ADMIN COURSE INFO')
`

type Course struct {
	ID             int    `json:"id"`
	CourseID       string `json:"course_id"`
	CourseName     string `json:"course_name"`
	ProfessorName  string `json:"professor_name"`
	CourseInfo_raw string `json:"course_info_raw"`
}

func (Course) TableName() string {
	return "courses"
}

// RETURNS THE FIRST INSTANCE OF MATCHING COURSE IN DATABASE
func (c *Course) GetCourse(db *gorm.DB) error {
	ret := db.Where(Course{CourseID: c.CourseID}).First(&c) // Find course where classID matches
	return ret.Error
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
func GetManyCourses(db *gorm.DB, start, count int) ([]Course, error) {
	rows, err := db.Raw("SELECT id, class_id, class_name, class_info_raw FROM courses LIMIT ? OFFSET ?", count, start).Rows()
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	courses := []Course{}
	for rows.Next() {
		var c Course
		if err := rows.Scan(&c.ID, &c.CourseID, &c.CourseName, &c.CourseInfo_raw); err != nil {
			return nil, err
		}
		courses = append(courses, c)
	}
	return courses, nil
}
