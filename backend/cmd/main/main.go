package main

// cd go/src/github.com/rw-w/TA-bot

import (
	"fmt"
	"net/http"

	"github.com/rw-w/TA-Bot/backend/pkg/config"
)

// telling golang where our routes are; creating the server defining our local host
func main() {
	var a config.App
	addr := "localhost:4200"
	a.Initialize("", "", "") // these string inputs are WIP for future connections with databases
	fmt.Println("Test0")
	http.Handle("/", a.Router)
	fmt.Println("Test1")
	a.Run(addr)
	fmt.Println("Test2")
	// a.Initialize(
	// 	os.Getenv("APP_DB_USERNAME"),
	// 	os.Getenv("APP_DB_PASSWORD"),
	// 	os.Getenv("APP_DB_NAME"),
	// )
	// http.Handle("/", a.GetRTR())
}
