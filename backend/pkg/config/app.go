package config

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/rw-w/TA-Bot/backend/pkg/models"
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
	a.Connect(connectionPath)
	a.Router = mux.NewRouter()
	a.initializeRoutes()
	a.DB.AutoMigrate(&models.User{})
	// routes.RegisterTABotRoutes(a.RTR)
}

func (a *App) Run(addr string) {
	log.Fatal(http.ListenAndServe(addr, a.Router))
}

func (a *App) GetDB() *gorm.DB {
	return a.DB
}

func (a *App) GetRTR() *mux.Router {
	return a.Router
}

func (a *App) GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid user ID")
		return
	}
	u := models.User{ID: id}
	if err := u.GetUser(a.DB); err != nil {
		respondWithError(w, http.StatusNotFound, "User not found")
		// should have a check for error type and a respondWithError(w, http.StatusInternalServerError, err.Error()), but it's causing some issues
		return
	}
	respondWithJSON(w, http.StatusOK, u)
}

func (a *App) GetManyUsers(w http.ResponseWriter, r *http.Request) {
	count, _ := strconv.Atoi(r.FormValue("count"))
	start, _ := strconv.Atoi(r.FormValue("start"))

	if count > 10 || count < 1 {
		count = 10
	}
	if start < 0 {
		start = 0
	}
	users, err := models.GetManyUsers(a.DB, start, count)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJSON(w, http.StatusOK, users)
}

func (a *App) CreateUser(w http.ResponseWriter, r *http.Request) {
	var u models.User
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&u); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	defer r.Body.Close()

	if err := u.CreateUser(a.DB); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJSON(w, http.StatusCreated, u)
}

func (a *App) UpdateUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid user ID")
		return
	}
	var u models.User
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&u); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	defer r.Body.Close()
	u.ID = id

	if err := u.UpdateUser(a.DB); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJSON(w, http.StatusOK, u)
}

func (a *App) DeleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid user ID")
		return
	}
	u := models.User{ID: id}
	if err := u.DeleteUser(a.DB); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondWithJSON(w, http.StatusOK, map[string]string{"result": "success"})
}

func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func (a *App) initializeRoutes() {
	a.Router.HandleFunc("/users", a.GetManyUsers).Methods("GET")
	a.Router.HandleFunc("/users", a.CreateUser).Methods("POST")
	a.Router.HandleFunc("/users/{id:[0-9]}", a.GetUser).Methods("GET")
	a.Router.HandleFunc("/users/{id:[0-9]}", a.UpdateUser).Methods("PUT")
	a.Router.HandleFunc("/users/{id:[0-9]}", a.DeleteUser).Methods("DELETE")
}
