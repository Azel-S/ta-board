package config

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// return a variable 'db' to assist other files in interacting with 'db'
var (
	db *gorm.DB
)

// will help us open a connection with our database
func Connect() {
	d, err := gorm.Open("mysql", "root:password1@tcp(localhost:3306)/ta-bot-db?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic(err)
	}
	db = d
}

func GetDB() *gorm.DB {
	return db
}
