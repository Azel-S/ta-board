package config

import (
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// return a variable 'db' to assist other files in interacting with 'db'
// var (
//
//	db *gorm.DB
//
// )

type App struct {
	DB     *gorm.DB
	Router *mux.Router
}

// will help us open a connection with our database
func (a *App) Connect(cPath string) {
	d, err := gorm.Open("mysql", cPath)
	if err != nil {
		panic(err)
	}
	a.DB = d
}

func (a *App) Initialize(user, password, dbname string) {
	connectionPath := "root:iidgst1wngsT!@tcp(localhost:3306)/testdb?charset=utf8&parseTime=True&loc=Local"
	//cString := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", user, password, dbname)
	// ?charset=utf8&parseTime=True&loc=Local
	a.Connect(connectionPath)
	a.Router = mux.NewRouter()
	// routes.RegisterTABotRoutes(a.RTR)
	// a.DB.AutoMigrate(&models.User{})
}

func (a *App) Run(addr string) {}

func (a *App) GetDB() *gorm.DB {
	return a.DB
}

func (a *App) GetRTR() *mux.Router {
	return a.Router
}
