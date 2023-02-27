package routes

import (
	"github.com/gorilla/mux" //helps create the routes
	"github.com/rw-w/TA-Bot/backend/pkg/controllers"
)

// This func has all routes which will help get control of the controllers
var RegisterTABotRoutes = func(router *mux.Router) {
	router.HandleFunc("/users/", controllers.GetUser).Methods("GET")
	router.HandleFunc("/users/", controllers.CreateUser).Methods("POST")
}
