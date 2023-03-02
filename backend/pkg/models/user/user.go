package models

import (
	"github.com/jinzhu/gorm"
)

const UsersCreationQuery = `CREATE TABLE IF NOT EXISTS users
(
	id SERIAL,
	professor_name TEXT NOT NULL,
	class_id TEXT NOT NULL,
	class_name TEXT NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
)`

// Note: make setVar() funcs for these later
type User struct {
	ID            int    `json:"id"`
	ProfessorName string `json:"professor_name"`
	ClassID       string `json:"class_id"`
	ClassName     string `json:"class_name"`
}

/*
-----------------------------------

	TODO: Hash/Decrypt Password Functions

-----------------------------------
*/
type Register struct {
	ClassID  string `json:"class_id"`
	Password string `json:"password"`
}

type StudenLogin struct {
	ClassID string `json:"class_id"`
}

type ProfessorLogin struct {
	ClassID  string `json:"class_id"`
	Password string `json:"password"`
}

type Tabler interface {
	TableName() string
}

func (User) TableName() string {
	return "users"
}

// RETURNS THE FIRST INSTANCE OF A MACHING USER IN DATABASE
func (u *User) GetUser(db *gorm.DB) error {
	//ret := db.Exec("SELECT professor_name, class_id, class_name FROM users WHERE id=?", u.ID) //.Row().Scan(&u.ProfessorName, &u.ClassID, &u.ClassName)
	ret := db.First(&u)
	return ret.Error
}

// UPDATES THE FIRST INSTANCE OF A MATCHING USER IN DATABASE WITH NEW VALUES
func (u *User) UpdateUser(db *gorm.DB) error {
	//ret := db.Raw("UPDATE users SET professor_name=?, class_id=?, class_name=? WHERE id=?", u.ProfessorName, u.ClassID, u.ClassName, u.ID)
	ret := db.Model(&u).Omit("id").Updates(User{ProfessorName: u.ProfessorName, ClassID: u.ClassID, ClassName: u.ClassName})
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
	rows, err := db.Raw("SELECT id, professor_name, class_id, class_name FROM users LIMIT ? OFFSET ?", count, start).Rows()
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	users := []User{}
	for rows.Next() {
		var u User
		if err := rows.Scan(&u.ID, &u.ProfessorName, &u.ClassID, &u.ClassName); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}
