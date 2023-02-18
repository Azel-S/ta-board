package models

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	id            int    `json:"id"`
	ProfessorName string `json:"ProfessorName"`
	ClassID       string `json:"ClassID"`
	ClassName     string `json:"ClassName"`
}

/*
-----------------------------------

	TODO: Hash/Decrypt Password Functions

-----------------------------------
*/
type Register struct {
	ClassID  string `json:"classid"`
	Password string `json:"password"`
}

type StudenLogin struct {
	ClassID string `json:"classid"`
}

type ProfessorLogin struct {
	ClassID  string `json:"classid"`
	Password string `json:"password"`
}

type Tabler interface {
	TableName() string
}

func (User) TableName() string {
	return "users"
}

func (u *User) getUser(db *gorm.DB) error {
	ret := db.Raw("SELECT ProfessorName, ClassID, ClassName FROM users WHERE id=?", u.id) //.Row().Scan(&u.ProfessorName, &u.ClassID, &u.ClassName)
	return ret.Error
}

func (u *User) updateUser(db *gorm.DB) error {
	ret := db.Raw("UPDATE users SET ProfessorName=?, ClassID=?, ClassName=? WHERE id=?", u.ProfessorName, u.ClassID, u.ClassName, u.id)
	return ret.Error
}

func (u *User) deleteUser(db *gorm.DB) error {
	ret := db.Raw("DELETE FROM users WHERE id=?", u.id)
	return ret.Error
}

func (u *User) createUser(db *gorm.DB) error {
	ret := db.Raw("INSERT INTO users(ProfessorName, ClassID, ClassName) VALUES(?, ?, ?) RETURNING id", u.ProfessorName, u.ClassID, u.ClassName).Scan(&u.id)
	return ret.Error
}

func getUsers(db *gorm.DB, start, count int) ([]User, error) {
	rows, err := db.Raw("SELECT id, ProfessorName, ClassID, ClassName FROM users LIMIT ? OFFSET ?", count, start).Rows()
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	users := []User{}
	for rows.Next() {
		var u User
		if err := rows.Scan(&u.id, &u.ProfessorName, &u.ClassID, &u.ClassName); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}

// returning what was created
// func (b *User) CreateUser() *User {
// 	db.NewRecord(b)
// 	db.Create(&b)
// 	return b
// }

// // returns a slice/list of users
// func GetAllUsers() []User {
// 	var Users []User
// 	db.Find(&Users)
// 	return Users
//}
