package routes

import (
	"github.com/NickkRodriguez/TA-Bot/pkg/controllers"
	"github.com/gorilla/mux" //helps create the routes
)

// This func has all routes which will help get control of the controllers
var RegisterTABotRoutes = func(router *mux.Router) {
	router.HandleFunc("/users/", controllers.CreateUser).Methods("POST")
	router.HandleFunc("/users/", controllers.GetUser).Methods("GET")
}
