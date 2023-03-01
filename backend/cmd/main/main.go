package main

// cd go/src/github.com/rw-w/TA-bot

import (
	"fmt"
	"net/http"

	"TA-Bot/backend/pkg/config"
	// Riley: "github.com/rw-w/TA-Bot/backend/pkg/config"
	// Abbas: "TA-Bot/backend/pkg/config"
)

// telling golang where our routes are; creating the server defining our local host
func main() {
	// CONSTANTS
	ADDR := "localhost:4222"
	USER := "root"
	PASSWORD := "password"
	DBNAME := "testdb"

	fmt.Println("Database: " + DBNAME + " | " + USER + " | " + PASSWORD)
	fmt.Println("Server Address: " + ADDR)

	var a config.App
	a.Initialize(USER, PASSWORD, DBNAME)
	http.Handle("/", a.Router)

	fmt.Println("\nServer listening...")
	a.Run(ADDR)
}
