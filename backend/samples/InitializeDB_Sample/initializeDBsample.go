/*
package InitializeDB_Sample

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var dsn = "root:password@tcp(127.0.0.1:3306)/testdb?charset=utf8mb4&parseTime=True&loc=Local"
var db, _ = gorm.Open(mysql.Open(dsn), &gorm.Config{})
var sqlDB, _ = db.DB()

func InitializeDB_Sample() {
	sqlDB.SetMaxOpenConns(10)
	http.HandleFunc("/createuser/", GoDBCreate) // when go to localhost:8080/createtestuser, do things
	user := User{Name: "Ronald", ID: "09876"}
	db.Create(&user)
	if err := db.Create(&user).Error; err != nil {
		panic(err)
	}
	log.Fatal(http.ListenAndServe(":8080", nil))
	fmt.Println(db.First(&user))
}

type User struct {
	gorm.Model
	Name string
	ID   string
}

func GoDBCreate(w http.ResponseWriter, r *http.Request) {
	user := User{
		Name: "John",
		ID:   "12345",
	}
	db.Create(&user)
	if err := db.Create(&user).Error; err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(user)

	fmt.Println("Successful", user)
}
*/