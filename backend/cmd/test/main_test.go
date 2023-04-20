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
	models "TA-Bot/backend/pkg/models"
)

const UsersTableQuery = `CREATE TABLE IF NOT EXISTS users
(
	user_serial SERIAL,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	professor_name TEXT NOT NULL,
	CONSTRAINT users_pkey PRIMARY KEY (user_serial)
)`

const CoursesTableQuery = `CREATE TABLE IF NOT EXISTS courses
	(
		course_serial SERIAL,
		user_serial INT,
		course_id TEXT NOT NULL,
		course_code TEXT NOT NULL,
		course_name TEXT NOT NULL,
		professor_name TEXT NOT NULL,
		description TEXT NOT NULL,
		CONSTRAINT users_pkey PRIMARY KEY (course_serial)
	)`

var a config.App

// RUNS TESTS AND CHECKS FOR 'USERS' TABLE EXISTENCE
func TestMain(m *testing.M) {
	a.Initialize("root", "password", "testdb")
	if !checkTableExistence() {
		panic("Table failed to exist")
	}
	code := m.Run()
	clearTable()
	os.Exit(code)
}

// CHECK WHETHER OR NOT TABLE 'USERS' EXISTS -> NECESSARY FOR TESTS TO RUN
func checkTableExistence() bool {
	a.DB.Exec("DROP TABLE IF EXISTS users")
	a.DB.Exec("DROP TABLE IF EXISTS courses")
	exists := a.DB.Exec(UsersTableQuery)
	if exists.Error == nil {
		exists = a.DB.Exec(CoursesTableQuery)
		return exists.Error == nil
	}
	return exists.Error == nil
}

// CLEARS ENTIRE 'USERS' TABLE
func clearTable() {
	a.DB.Exec("DELETE FROM users")
	a.DB.Exec("DELETE FROM courses")
}

// TESTS TO GET A USER NOT IN THE DATABASE (HANDLED BY ROUTER TO GetUser())
func TestGetNonExistUser(t *testing.T) {
	clearTable()
	var jsonDATA = []byte(`{
		"username":"NOT HERE",
		"password":"NON EXISTENT",
		"professor_name":"NOPE"
		}`)
	// Issue here: When set to "/users/10" or any ID greater than 9 (two digits+), it doesn't return an error like it should...
	req, _ := http.NewRequest("POST", "/testget", bytes.NewBuffer(jsonDATA))
	response := executeRequest(req)
	checkResponseCode(t, http.StatusNotFound, response.Code)
}

// TESTS TO CREATE A USER IN DATABASE (HANDLED BY ROUTER TO CreateUser())
func TestCreateUser(t *testing.T) {
	clearTable()

	var jsonDATA = []byte(`{
		"username":"test_user",
		"password":"test_pass",
		"professor_name":"test_name"
		}`)
	req, _ := http.NewRequest("POST", "/testadd", bytes.NewBuffer(jsonDATA))
	req.Header.Set("Content-Type", "application/json")

	response := executeRequest(req)
	checkResponseCode(t, http.StatusCreated, response.Code)

	var m map[string]interface{}
	json.Unmarshal(response.Body.Bytes(), &m)

	if m["professor_name"] != "test_name" {
		t.Errorf("Expected name = 'test user'. Got '%v'", m["professorName"])
	}
	if m["password"] != "test_pass" {
		t.Errorf("Expected cID = 'ABC123'. Got '%v'", m["classID"])
	}
	if m["username"] != "test_user" {
		t.Errorf("Expected class = 'Alphabet101'. Got '%v'", m["className"])
	}
}

// TEST TO GET USER IN DATABASE (HANDLED BY ROUTER TO GetUser())
func TestGetUser(t *testing.T) {
	clearTable()
	//addUserRaw("test user", "ABC123", "Alphabet101")
	u := models.User{Username: "test user", Password: "test pass"}
	u.CreateUser(a.DB)
	var jsonDATA = []byte(`{
		"username": "test user",
		"password": "test pass"
	}`)
	req, _ := http.NewRequest("POST", "/testget", bytes.NewBuffer(jsonDATA))
	response := executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)
}

// TESTS TO UPDATE A USER (HANDLED BY ROUTER TO UpdateUser())
func TestUpdateUser(t *testing.T) {
	clearTable()
	//addUserRaw("test user", "ABC123", "Alphabet101")
	u := models.User{Username: "test user", Password: "test pass"}
	u.CreateUser(a.DB)
	var jsonDATA = []byte(`{
		"username": "test user",
		"password": "test pass"
	}`)
	req, _ := http.NewRequest("POST", "/testget", bytes.NewBuffer(jsonDATA))
	response := executeRequest(req)
	var ogUser map[string]interface{}
	json.Unmarshal(response.Body.Bytes(), &ogUser)

	jsonDATA = []byte(`{
		"professor_name":"updated user",
		"username": "test user",
		"password": "test pass"
		}`)
	req, _ = http.NewRequest("POST", "/testupdate", bytes.NewBuffer(jsonDATA))
	req.Header.Set("Content-Type", "application/json")

	response = executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)

	var m map[string]interface{}
	json.Unmarshal(response.Body.Bytes(), &m)

	if m["professor_name"] == ogUser["professor_name"] {
		t.Errorf("Expected the name to change from '%v' to '%v'. Got %v", ogUser["professor_name"], m["professor_name"], m["professor_name"])
	}
}

// TESTS TO DELETE A USER (HANDLED BY ROUTER TO DeleteUser())
func TestDeleteCourse(t *testing.T) {
	clearTable()
	//addUserRaw("test user", "ABC123", "Alphabet101")
	u := models.Course{CourseID: "testid", CourseCode: "testcode"}
	u.CreateCourse(a.DB)
	var jsonDATA = []byte(`{
		"course_id": "testid",
		"course_code": "testcode"
	}`)

	req, _ := http.NewRequest("POST", "/testdeletecourse", bytes.NewBuffer(jsonDATA))
	response := executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)

	req, _ = http.NewRequest("POST", "/testgetcourse", bytes.NewBuffer(jsonDATA))
	response = executeRequest(req)
	checkResponseCode(t, http.StatusOK, response.Code)
}

// HELPER FUNCTION TO EXECUTE TEST HTTP REQUESTS
func executeRequest(req *http.Request) *httptest.ResponseRecorder {
	// Execute request and returns response
	rr := httptest.NewRecorder()
	a.Router.ServeHTTP(rr, req)
	return rr
}

// CHECK WHETHER A RETURNED RESPONSE CODE IS EQUAL TO AN EXPECTED RESPONSE CODE
func checkResponseCode(t *testing.T, expected, actual int) {
	if expected != actual {
		t.Errorf("Expected response code %d. Got %d\n", expected, actual)
	}
}
