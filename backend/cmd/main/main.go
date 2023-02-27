package main

// cd go/src/github.com/rw-w/TA-bot

import (
	"log"
	"net/http"

	"github.com/rw-w/TA-Bot/backend/pkg/config"
)

// telling golang where our routes are; creating the server defining our local host
func main() {
	var a config.App
	addr := "localhost:4020"
	a.Initialize("", "", "") // these string inputs are WIP for future connections with databases
	a.Run(addr)
	http.Handle("/", a.Router)
	log.Fatal(http.ListenAndServe(addr, a.Router))
	// a.Initialize(
	// 	os.Getenv("APP_DB_USERNAME"),
	// 	os.Getenv("APP_DB_PASSWORD"),
	// 	os.Getenv("APP_DB_NAME"),
	// )
	// http.Handle("/", a.GetRTR())
}
