package models

import (
	"github.com/jinzhu/gorm"
)

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

func (u *User) GetUser(db *gorm.DB) error {
	//ret := db.Exec("SELECT professor_name, class_id, class_name FROM users WHERE id=?", u.ID) //.Row().Scan(&u.ProfessorName, &u.ClassID, &u.ClassName)
	ret := db.First(&u)
	return ret.Error
}

func (u *User) UpdateUser(db *gorm.DB) error {
	//ret := db.Raw("UPDATE users SET professor_name=?, class_id=?, class_name=? WHERE id=?", u.ProfessorName, u.ClassID, u.ClassName, u.ID)
	ret := db.Model(&u).Omit("id").Updates(User{ProfessorName: u.ProfessorName, ClassID: u.ClassID, ClassName: u.ClassName})
	return ret.Error
}

func (u *User) DeleteUser(db *gorm.DB) error {
	//ret := db.Exec("DELETE FROM users WHERE id=?", u.ID)
	ret := db.Delete(&u)
	return ret.Error
}

func (u *User) CreateUser(db *gorm.DB) error {
	//ret := db.Raw("INSERT INTO users(professor_name, class_id, class_name) VALUES(?, ?, ?) RETURNING id", u.ProfessorName, u.ClassID, u.ClassName) //.Scan(&u.ID)
	ret := db.Create(&u)
	return ret.Error
}

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
