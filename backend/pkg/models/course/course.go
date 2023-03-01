package models

import (
	"github.com/jinzhu/gorm"
)

const CoursesCreationQuery = `CREATE TABLE IF NOT EXISTS courses
(
	id SERIAL,
	class_id TEXT NOT NULL,
	class_name TEXT NOT NULL,
	class_info_raw TEXT NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
)`

type Course struct {
	ID            int    `json:"id"`
	ClassID       string `json:"class_id"`
	ClassName     string `json:"class_name"`
	ClassInfo_raw string `json:"class_info_raw"`
}

func (Course) TableName() string {
	return "courses"
}

func (c *Course) GetCourse(db *gorm.DB) error {
	ret := db.First(&c)
	return ret.Error
}

func (c *Course) UpdateCourse(db *gorm.DB) error {
	ret := db.Model(&c).Omit("id").Updates(Course{ClassID: c.ClassID, ClassName: c.ClassName, ClassInfo_raw: c.ClassInfo_raw})
	return ret.Error
}

func (c *Course) DeleteCourse(db *gorm.DB) error {
	ret := db.Delete(&c)
	return ret.Error
}

func (c *Course) CreateCourse(db *gorm.DB) error {
	ret := db.Create(&c)
	return ret.Error
}

func GetManyCourses(db *gorm.DB, start, count int) ([]Course, error) {
	rows, err := db.Raw("SELECT id, class_id, class_name, class_info_raw FROM courses LIMIT ? OFFSET ?", count, start).Rows()
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	courses := []Course{}
	for rows.Next() {
		var c Course
		if err := rows.Scan(&c.ID, &c.ClassID, &c.ClassName, &c.ClassInfo_raw); err != nil {
			return nil, err
		}
		courses = append(courses, c)
	}
	return courses, nil
}
