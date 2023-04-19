package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

// --- Structs ---

// --User--
type User struct {
	UserSerial    int    `gorm:"column:user_serial; PRIMARY_KEY" json:"user_serial"`
	Username      string `gorm:"column:username" json:"username"`
	Password      string `gorm:"column:password" json:"password"`
	ProfessorName string `gorm:"column:professor_name" json:"professor_name"`
}

func (User) TableName() string {
	return "users"
}

// --Course--
type Course struct {
	CourseSerial  int    `gorm:"column:course_serial; PRIMARY_KEY" json:"course_serial"`
	UserSerial    int    `gorm:"column:user_serial" json:"user_serial"`
	CourseID      string `gorm:"column:course_id" json:"course_id"`
	CourseCode    string `gorm:"course_code" json:"course_code"`
	CourseName    string `gorm:"course_name" json:"course_name"`
	ProfessorName string `gorm:"professor_name" json:"professor_name"`
	Description   string `gorm:"description" json:"description"`
}

func (Course) TableName() string {
	return "courses"
}

// --Question--
type Question struct {
	ID           int    `gorm:"column:id; PRIMARY_KEY" json:"id"`
	CourseSerial int    `gorm:"column:course_serial" json:"course_serial"`
	Question     string `gorm:"column:question" json:"question"`
	Answer       string `gorm:"column:answer" json:"answer"`
	DateTime     string `gorm:"column:date_time" json:"date_time"`
}

func (Question) TableName() string {
	return "questions"
}

// --- USER FUNCTIONS ---

// Returns true if Username && Password exists, or user_serial exists.
// Note: Does not validate full object
func (u *User) Exists(db *gorm.DB) bool {
	var temp User

	if db.Where("username = ? AND password = ?", u.Username, u.Password).Limit(1).Find(&temp).RowsAffected > 0 {
		return true
	} else {
		return db.Where("user_serial = ?", u.UserSerial).Limit(1).Find(&temp).RowsAffected > 0
	}
}

// Fills missing fields. Use Exists for verification.
func (u *User) Fill(db *gorm.DB) {
	db.Table(u.TableName()).Where(u).First(&u)
}

// Update Name
func (u *User) UpdateName(db *gorm.DB) {
	db.Model(&u).Where("user_serial = ?", u.UserSerial).Update("professor_name", u.ProfessorName)
}

// --- COURSE FUNCTIONS ---

// Returns true if course_id && course_code exists, or course_serial exists.
// Note: Does not validate full object
func (c *Course) Exists(db *gorm.DB) bool {
	var temp Course

	if db.Where("course_id = ? AND course_code = ?", c.CourseID, c.CourseCode).Limit(1).Find(&temp).RowsAffected > 0 {
		return true
	} else {
		return db.Where("course_serial = ?", c.CourseSerial).Limit(1).Find(&temp).RowsAffected > 0
	}
}

// Fills missing fields. Use Exists for verification.
func (c *Course) Fill(db *gorm.DB) {
	db.Table(c.TableName()).Where(c).First(&c)
}

// Creates course in database
func (c *Course) CreateCourse(db *gorm.DB) error {
	ret := db.Create(&c)
	return ret.Error
}

func (c *Course) GetCourses(db *gorm.DB) ([]Course, error) {
	rows, err := db.Raw("SELECT * FROM courses WHERE user_serial=?", c.UserSerial).Rows()
	if err != nil {
		return nil, err
	}

	var courseList []Course
	for rows.Next() {
		var c Course
		if err := rows.Scan(
			&c.CourseSerial,
			&c.UserSerial,
			&c.CourseID,
			&c.CourseCode,
			&c.CourseName,
			&c.ProfessorName,
			&c.Description); err != nil {
			return nil, err
		}
		//c.Fill(db)
		courseList = append(courseList, c)
	}
	rows.Close()

	return courseList, nil
}

// DELETES THE FIRST INSTANCE OF MACHING COURSE IN DATABASE
func (c *Course) DeleteCourse(db *gorm.DB) error {
	ret := db.Delete(&c)
	return ret.Error
}

// --- QUESTION FUNCTIONS ---

// Returns true if course_serial && question exists, or id exists.
// Note: Does not validate full object
func (q *Question) Exists(db *gorm.DB) bool {
	var temp Question

	if db.Where("course_serial = ? AND question = ?", q.CourseSerial, q.Question).Limit(1).Find(&temp).RowsAffected > 0 {
		return true
	} else {
		return db.Where("id = ?", q.ID).Limit(1).Find(&temp).RowsAffected > 0
	}
}

// Creates a question in database.
func (q *Question) AddQuestion(db *gorm.DB) error {
	//q.Date_time.String();
	ret := db.Table(q.TableName()).Create(&q)
	return ret.Error
}

// Updates the answer of a question
func (q *Question) UpdateAnswer(db *gorm.DB) {
	db.Model(&q).Where("course_serial = ? AND question = ?", q.CourseSerial, q.Question).Update("answer", q.Answer)
}

func (q *Question) GetQuestions(db *gorm.DB) ([]Question, error) {
	rows, err := db.Raw("SELECT * FROM questions WHERE course_serial=?", q.CourseSerial).Rows()
	if err != nil {
		return nil, err
	}

	var questionsList []Question
	for rows.Next() {
		var q Question
		if err := rows.Scan(&q.ID, &q.CourseSerial, &q.Question, &q.Answer, &q.DateTime); err != nil {
			return nil, err
		}
		// q.Fill(db)
		questionsList = append(questionsList, q)
	}
	rows.Close()

	return questionsList, nil
}

func (u *User) GetUserSerial(db *gorm.DB) int {
	var user_serial int
	db.Table("users").Select("user_serial").Where(User{Username: u.Username, Password: u.Password}).Scan(&user_serial)
	fmt.Println("GetUserSerial():", user_serial)
	return user_serial
}

// DELETES FIRST INSTANCE OF A MATCHING USER FROM DATABASE
func (u *User) DeleteUser(db *gorm.DB) error {
	//ret := db.Exec("DELETE FROM users WHERE id=?", u.ID)
	ret := db.Delete(&u)
	return ret.Error
}

// CREATES A USER IN DATABASE
func (u *User) CreateUser(db *gorm.DB) error {
	ret := db.Create(&u)
	return ret.Error
}
