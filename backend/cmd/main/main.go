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

	var a config.App

	fmt.Println("Initializing...")
	a.Initialize(USER, PASSWORD, DBNAME)
	fmt.Println("Initializing done...")

	fmt.Println("Handling...")
	http.Handle("/", a.Router)
	fmt.Println("Handling done...")

	fmt.Println("Running...")
	a.Run(ADDR)
	fmt.Println("Running done...")
}
