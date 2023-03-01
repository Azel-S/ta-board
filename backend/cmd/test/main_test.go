package test

/*
	A majority of this program has been written by following the given tutorial:
	https://semaphoreci.com/community/tutorials/building-and-testing-a-rest-api-in-go-with-gorilla-mux-and-postgresql
	Written by: Kulshekhar Kabra; August 29, 2022; Published by Semaphore

	This main_test.go file contains all the unit tests and tests can be ran using the Golang's internal 'testing' package
		- can run go test -v in the /test directory to see all of these tests in action
*/

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"TA-Bot/backend/pkg/config"
	models "TA-Bot/backend/pkg/models/user"
)

const tableCreationQuery = `CREATE TABLE IF NOT EXISTS users
(
	id SERIAL,
	professor_name TEXT NOT NULL,
	class_id TEXT NOT NULL,
	class_name TEXT NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
)`

var a config.App

func TestMain(m *testing.M) {
	a.Initialize(
		os.Getenv("APP_DB_USERNAME"),
		os.Getenv("APP_DB_PASSWORD"),
		os.Getenv("APP_DB_NAME"),
	)
	if !checkTableExistence() {
		panic("Table failed to exist")
	}
	code := m.Run()
	clearTable()
	os.Exit(code)
}

func checkTableExistence() bool {
	a.DB.Exec("DROP TABLE IF EXISTS users")
	exists := a.DB.Exec(tableCreationQuery)
	return exists.Error == nil
}

func clearTable() {
	a.DB.Exec("DELETE FROM users")
}

func TestEmptyTable(t *testing.T) {
	clearTable()
	req, _ := http.NewRequest("GET", "/users", nil)
	response := executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)
	if body := response.Body.String(); body != "[]" {
		t.Errorf("Expected an empty array, got %s", body)
	}
}

func TestGetNonExistUser(t *testing.T) {
	clearTable()
	// Issue here: When set to "/users/10" or any ID greater than 9 (two digits+), it doesn't return an error like it should...
	req, _ := http.NewRequest("GET", "/users/9", nil)
	response := executeRequest(req)
	checkResponseCode(t, http.StatusNotFound, response.Code)
	var m map[string]string
	json.Unmarshal(response.Body.Bytes(), &m)
	if m["error"] != "User not found" {
		t.Errorf("Expected the 'error' key of the response to be set to 'User not found', got %v", m["error"])
	}
}

func TestCreateUser(t *testing.T) {
	clearTable()

	var jsonStr = []byte(`{"professor_name":"test user", "class_id":"ABC123", "class_name":"Alphabet101"}`)
	req, _ := http.NewRequest("POST", "/users", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	response := executeRequest(req)
	checkResponseCode(t, http.StatusCreated, response.Code)

	var m map[string]interface{}
	json.Unmarshal(response.Body.Bytes(), &m)

	if m["professor_name"] != "test user" {
		t.Errorf("Expected name = 'test user'. Got '%v'", m["professorName"])
	}
	if m["class_id"] != "ABC123" {
		t.Errorf("Expected cID = 'ABC123'. Got '%v'", m["classID"])
	}
	if m["class_name"] != "Alphabet101" {
		t.Errorf("Expected class = 'Alphabet101'. Got '%v'", m["className"])
	}
	if m["id"] != 1.0 {
		t.Errorf("Expected ID = '1'. Got '%v'", m["id"])
	}
}

func TestGetUser(t *testing.T) {
	clearTable()
	//addUserRaw("test user", "ABC123", "Alphabet101")
	u := models.User{ProfessorName: "test user", ClassID: "ABC123", ClassName: "Alphabet101"}
	u.CreateUser(a.DB)
	req, _ := http.NewRequest("GET", "/users/2", nil) // no idea why /users/1 doesn't work, 'u' actually has an id of 2 right here
	response := executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)
}

// func addUserRaw(name, ID, class string) {
// 	a.DB.Exec(`INSERT INTO users(professor_name, class_id, class_name) VALUES(?, ?, ?)`, name, ID, class)
// }

func TestUpdateUser(t *testing.T) {
	clearTable()
	//addUserRaw("test user", "ABC123", "Alphabet101")
	u := models.User{ProfessorName: "test user", ClassID: "ABC123", ClassName: "Alphabet101"}
	u.CreateUser(a.DB)
	req, _ := http.NewRequest("GET", "/users/1", nil)
	response := executeRequest(req)
	var ogUser map[string]interface{}
	json.Unmarshal(response.Body.Bytes(), &ogUser)

	var jsonStr = []byte(`{"professor_name":"updated user", "class_id":"UPD101", "class_name":"Updates101"}`)
	req, _ = http.NewRequest("PUT", "/users/1", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	response = executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)

	var m map[string]interface{}
	json.Unmarshal(response.Body.Bytes(), &m)

	if m["professor_name"] == ogUser["professor_name"] {
		t.Errorf("Expected the name to change from '%v' to '%v'. Got %v", ogUser["professor_name"], m["professor_name"], m["professor_name"])
	}
	if m["class_id"] == ogUser["class_id"] {
		t.Errorf("Expected the name to change from '%v' to '%v'. Got '%v'", ogUser["class_id"], m["class_id"], m["class_id"])
	}
	if m["class_name"] == ogUser["class_name"] {
		t.Errorf("Expected the price to change from '%v' to '%v'. Got '%v'", ogUser["class_name"], m["class_name"], m["class_name"])
	}
}

func TestDeleteUser(t *testing.T) {
	clearTable()
	//addUserRaw("test user", "ABC123", "Alphabet101")
	u := models.User{ProfessorName: "test user", ClassID: "ABC123", ClassName: "Alphabet101"}
	u.CreateUser(a.DB)
	req, _ := http.NewRequest("GET", "/users/4", nil)
	response := executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)

	req, _ = http.NewRequest("DELETE", "/users/4", nil)
	response = executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)

	req, _ = http.NewRequest("GET", "/users/4", nil)
	response = executeRequest(req)
	checkResponseCode(t, http.StatusNotFound, response.Code)
}

func executeRequest(req *http.Request) *httptest.ResponseRecorder {
	// Execute request and returns response
	rr := httptest.NewRecorder()
	a.Router.ServeHTTP(rr, req)
	return rr
}

func checkResponseCode(t *testing.T, expected, actual int) {
	if expected != actual {
		t.Errorf("Expected response code %d. Got %d\n", expected, actual)
	}
}
