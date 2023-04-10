package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

const UsersCreationQuery = `CREATE TABLE IF NOT EXISTS users
(
	id SERIAL,
	username TEXT NOT NULL,
	professor_name TEXT NOT NULL,
	class_id TEXT NOT NULL,
	class_name TEXT NOT NULL,
	password TEXT NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
)`

const UsersAddAdminQuery = `INSERT INTO users(username, professor_name, class_id, class_name, password)
VALUES('ADMIN', 'ADMINNAME', 'ADMINCLASSID', 'ADMINCLASS', 'ADMIN')
`
const ProfessorCoursesAddQuery = `INSERT INTO professorcourses(user_serial, course_serial)
VALUES('1', '1')
`

// Note: make setVar() funcs for these later
// USER HAS TO BE USERNAME, FIRSTNAME, LASTNAME, PASSWORD - talk to frontend???
type User struct {
	ID            int    `json:"id"`
	Username      string `json:"username"`
	ProfessorName string `json:"professor_name"`
	ClassID       string `json:"class_id"`
	ClassName     string `json:"class_name"`
	Password      string `json:"password"`
}

/*
-----------------------------------

	TODO: Hash/Decrypt Password Functions

-----------------------------------
*/

// RETURNS THE FIRST INSTANCE OF A MACHING USER IN DATABASE
func (u *User) GetUser(db *gorm.DB) error {
	//ret := db.Exec("SELECT professor_name, password FROM users WHERE professor_name=? AND password=?", u.ProfessorName, u.Password) //.Row().Scan(&u.ProfessorName, &u.ClassID, &u.ClassName)
	ret := db.Where(User{Username: u.Username, Password: u.Password}).First(&u)
	//ret := db.First(&u)
	return ret.Error
}

func (u *User) GetProfName(db *gorm.DB) string {
	type Result struct {
		name string
	}
	var ret Result
	db.Table("users").Select("professor_name").Where(User{ID: u.ID}).Scan(&ret)
	fmt.Println(ret.name)
	return ret.name
}

func (u *User) GetUserSerial(db *gorm.DB, name string, pass string) int {
	type Result struct {
		ID int
	}
	var ret Result
	db.Table("users").Select("id").Where(User{Username: name, Password: pass}).Scan(&ret)
	//db.Raw("SELECT id FROM users WHERE professor_name = ? AND password = ?", name, pass).Scan(&ret)
	//fmt.Println("Serial:", ret.ID)
	return ret.ID
}

// UPDATES THE FIRST INSTANCE OF A MATCHING USER IN DATABASE WITH NEW VALUES
func (u *User) UpdateUser(db *gorm.DB) error {
	//ret := db.Raw("UPDATE users SET professor_name=?, class_id=?, class_name=? WHERE id=?", u.ProfessorName, u.ClassID, u.ClassName, u.ID)
	ret := db.Model(&u).Omit("id").Updates(User{Username: u.Username, ClassID: u.ClassID, ClassName: u.ClassName})
	return ret.Error
}

func (u *User) UpdateName(db *gorm.DB) error {
	ret := db.Model(&u).Updates(User{ProfessorName: u.ProfessorName})
	return ret.Error
}

// DELETES FIRST INSTANCE OF A MATCHING USER FROM DATABASE
func (u *User) DeleteUser(db *gorm.DB) error {
	//ret := db.Exec("DELETE FROM users WHERE id=?", u.ID)
	ret := db.Delete(&u)
	return ret.Error
}

// CREATES A USER IN DATABASE
func (u *User) CreateUser(db *gorm.DB) error {
	//ret := db.Raw("INSERT INTO users(professor_name, class_id, class_name) VALUES(?, ?, ?) RETURNING id", u.ProfessorName, u.ClassID, u.ClassName) //.Scan(&u.ID)
	ret := db.Create(&u)
	return ret.Error
}

// CONSTRUCTS AND RETURNS AN ARRAY OF USERS STARTING FROM 'START' INDEX AND 'COUNT' INDICES FORWARD
func GetManyUsers(db *gorm.DB, start, count int) ([]User, error) {
	rows, err := db.Raw("SELECT id, username, class_id, class_name FROM users LIMIT ? OFFSET ?", count, start).Rows()
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	users := []User{}
	for rows.Next() {
		var u User
		if err := rows.Scan(&u.ID, &u.Username, &u.ClassID, &u.ClassName); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}
