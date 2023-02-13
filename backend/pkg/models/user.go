package models

import (
	"github.com/NickkRodriguez/TA-Bot/pkg/config"
	"github.com/jinzhu/gorm"
)

var db *gorm.DB

type User struct {
	gorm.Model
	ProfessorsName string `gorm:""json:"professorsname"`
	ClassID        string `json:"classid"`
	ClassName      string `json:"classname"`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&User{})
}

// returning what was created
func (b *User) CreateUser() *User {
	db.NewRecord(b)
	db.Create(&b)
	return b
}

// returns a slice/list of users
func GetAllUsers() []User {
	var Users []User
	db.Find(&Users)
	return Users
}
