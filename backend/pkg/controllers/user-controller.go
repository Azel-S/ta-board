package controllers

import (
	//"encoding/json"
	"net/http"

	"github.com/NickkRodriguez/TA-Bot/pkg/models"
	//"github.com/NickkRodriguez/TA-Bot/pkg/utils"
)

// creating a new user (NewUser) of type User from pkg/models/user.go's User struct/model
var NewUser models.User

func GetUser(w http.ResponseWriter, r *http.Request) {
	// newUsers := models.GetAllUsers() // list of users in newUsers
	// res, _ := json.Marshal(newUsers) // convert db info into json
	// w.Header().Set("Content-Type", "pkglication/json")
	// w.WriteHeader(http.StatusOK) // will give us 200
	// w.Write(res)                 // helps us send response (json ver. of list of users from our db) to postman
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	// CreateUser := &models.User{}
	// // this is inside of user.go as createNewUser to be implemented
	// utils.ParseBody(r, CreateUser) //getting input from user in json, using ParseBody to pass that into something our db will understand
	// b := CreateUser.CreateUser()   // sent it to db, db sent us the same record
	// res, _ := json.Marshal(b)      // we convert the record into json
	// w.WriteHeader(http.StatusOK)
	// w.Write(res) // sending it back to our user
}
