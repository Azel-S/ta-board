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
	var a config.App
	addr := "localhost:4222"

	fmt.Println("Initializing...")
	a.Initialize("", "", "") // these string inputs are WIP for future connections with databases
	fmt.Println("Initializing done...")

	fmt.Println("Handling...")
	http.Handle("/", a.Router)
	fmt.Println("Handling done...")

	fmt.Println("Running...")
	a.Run(addr)
	fmt.Println("Running done...")

	// a.Initialize(
	// 	os.Getenv("APP_DB_USERNAME"),
	// 	os.Getenv("APP_DB_PASSWORD"),
	// 	os.Getenv("APP_DB_NAME"),
	// )
	// http.Handle("/", a.GetRTR())
}
