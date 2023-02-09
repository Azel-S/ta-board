package routes

import (
	"github.com/NickkRodriguez/TA-Bot/pkg/controllers"
	"github.com/gorilla/mux" //helps create the routes
)

// This func has all routes which will help get control of the controllers
var RegisterTABotRoutes = func(router *mux.Router) {
	router.HandleFunc("/user/", controllers.CreateUser).Methods("POST")
	router.HandleFunc("/user/", controllers.GetUser).Methods("GET")
}
