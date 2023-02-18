package test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/NickkRodriguez/TA-Bot/pkg/config"
)

// const tableCreationQuery = `CREATE TABLE IF NOT EXISTS users
// (
//
//	id SERIAL,
//	ProfessorName TEXT NOT NULL,
//	ClassID TEXT NOT NULL,
//	ClassName TEXT NOT NULL,
//	CONSTRAINT users_pkey PRIMARY KEY (id)
//
// )`
const tableCreationQuery = `CREATE TABLE IF NOT EXISTS users
(
	id SERIAL,
	ProfessorName TEXT NOT NULL,
	ClassID TEXT NOT NULL,
	ClassName TEXT NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
)`

var a config.App

/*
	can run go test -v in the /test directory to see all of these tests in action
	note: all tests will fail right now due to no actual application yet
*/

func TestMain(m *testing.M) {
	a.Initialize(
		os.Getenv("APP_DB_USERNAME"),
		os.Getenv("APP_DB_PASSWORD"),
		os.Getenv("APP_DB_NAME"),
	)
	// if !checkTableExistence() {
	// 	panic("ERROR: Table failed to exist")
	// }
	if !checkTableExistence() {
		panic("Table failed to exist")
	}
	code := m.Run()
	clearTable()
	os.Exit(code)
}

func checkTableExistence() bool {
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

func TestGetNonExistUser(t *testing.T) {
	clearTable()
	req, _ := http.NewRequest("GET", "/users/11", nil)
	response := executeRequest(req)
	checkResponseCode(t, http.StatusNotFound, response.Code)
	var m map[string]string
	json.Unmarshal(response.Body.Bytes(), &m)
	if m["error"] != "User not found" {
		t.Errorf("Expected the 'error' key of the response to be set to 'User not found'")
	}
}

func TestCreateProduct(t *testing.T) {
	clearTable()

	var jsonStr = []byte(`{"ProfessorName":"test user", "ClassID":"ABC123", "ClassName":"Alphabet101"}`)
	req, _ := http.NewRequest("POST", "/users", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	response := executeRequest(req)
	checkResponseCode(t, http.StatusCreated, response.Code)

	var m map[string]interface{}
	json.Unmarshal(response.Body.Bytes(), &m)

	if m["ProfessorName"] != "test user" {
		t.Errorf("Expected name = 'test user'. Got '%v'", m["professorName"])
	}
	if m["ClassID"] != "ABC123" {
		t.Errorf("Expected cID = 'ABC123'. Got '%v'", m["classID"])
	}
	if m["ClassName"] != "Alphabet101" {
		t.Errorf("Expected class = 'Alphabet101'. Got '%v'", m["className"])
	}
	if m["id"] != 1.0 {
		t.Errorf("Expected ID = '1'. Got '%v'", m["id"])
	}
}

func TestGetUser(t *testing.T) {
	clearTable()
	addUser("test user", "ABC123", "Alphabet101")
	req, _ := http.NewRequest("GET", "/users/1", nil)
	response := executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)
}

func addUser(name, ID, class string) {
	// users := models.User{
	// 	ProfessorName: name,
	// 	ClassID:       ID,
	// 	ClassName:     class,
	// }
	// a.DB.Create(&users)
	a.DB.Exec(`INSERT INTO users(ProfessorName, ClassID, ClassName) VALUES(?, ?, ?)`, name, ID, class)
}

func TestUpdateProduct(t *testing.T) {
	clearTable()
	addUser("test user", "ABC123", "Alphabet101")

	req, _ := http.NewRequest("GET", "/users/1", nil)
	response := executeRequest(req)
	var ogUser map[string]interface{}
	json.Unmarshal(response.Body.Bytes(), &ogUser)

	var jsonStr = []byte(`{"ProfessorName":"updated user", "ClassID":"UPD101", "ClassName":"Updates101"}`)
	req, _ = http.NewRequest("PUT", "/users/1", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	response = executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)

	var m map[string]interface{}
	json.Unmarshal(response.Body.Bytes(), &m)

	if m["ProfessorName"] == ogUser["ProfessorName"] {
		t.Errorf("Expected the name to change from '%v' to '%v'. Got %v", ogUser["ProfessorName"], m["ProfessorName"], m["ProfessorName"])
	}
	if m["ClassID"] == ogUser["ClassID"] {
		t.Errorf("Expected the name to change from '%v' to '%v'. Got '%v'", ogUser["ClassID"], m["ClassID"], m["ClassID"])
	}
	if m["ClassName"] == ogUser["ClassName"] {
		t.Errorf("Expected the price to change from '%v' to '%v'. Got '%v'", ogUser["ClassName"], m["ClassName"], m["ClassName"])
	}
}

func TestDeleteUser(t *testing.T) {
	clearTable()
	addUser("test user", "ABC123", "Alphabet101")

	req, _ := http.NewRequest("GET", "/users/1", nil)
	response := executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)

	req, _ = http.NewRequest("DELETE", "/users/1", nil)
	response = executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)

	req, _ = http.NewRequest("GET", "/users/1", nil)
	response = executeRequest(req)
	checkResponseCode(t, http.StatusNotFound, response.Code)
}
