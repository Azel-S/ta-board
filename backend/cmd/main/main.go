package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/mysql"

	"github.com/NickkRodriguez/TA-Bot/pkg/routes"
)

// telling golang where our routes are; creating the server defining our local host
func main() {
	r := mux.NewRouter()
	routes.RegisterTABotRoutes(r)
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe("localhost:9010", r))
}
