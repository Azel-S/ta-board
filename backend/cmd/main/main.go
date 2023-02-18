package main

import (
	"log"
	"net/http"
	"os"

	"github.com/NickkRodriguez/TA-Bot/pkg/config"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// telling golang where our routes are; creating the server defining our local host
func main() {
	//r := mux.NewRouter()
	//routes.RegisterTABotRoutes(r)
	var a config.App
	a.Initialize(
		os.Getenv("APP_DB_USERNAME"),
		os.Getenv("APP_DB_PASSWORD"),
		os.Getenv("APP_DB_NAME"),
	)
	a.Run("localhost:9010")
	http.Handle("/", a.GetRTR())
	log.Fatal(http.ListenAndServe("localhost:9010", a.GetRTR()))
	// Todo: figure out how to either use mux or gin, if gin, replace all instances of mux router with gin alternative
	// 		 otherwise, if mux, find out how to do the equivalent gin.POST and gin.Use(cors.New(config)).
	//		 - Create custom middleware for talking to localhost:4200 to connect everything!
	// Note: Will have to make some functions in between all the .go files such as the user creation in the tutorial
	// tutorial: https://rasyue.com/angular-login-with-golang-and-mysql/
	// bingo: https://semaphoreci.com/community/tutorials/building-and-testing-a-rest-api-in-go-with-gorilla-mux-and-postgresql
	//r.Use(routes.Middleware)

}
