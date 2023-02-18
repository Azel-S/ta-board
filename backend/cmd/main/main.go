package main

import (
	"github.com/NickkRodriguez/TA-Bot/pkg/config"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// telling golang where our routes are; creating the server defining our local host
func main() {
	var a config.App
	a.Initialize("", "", "") // these string inputs are WIP for future connections with databases
	addr := "localhost:9010"
	a.Run(addr)

	// a.Initialize(
	// 	os.Getenv("APP_DB_USERNAME"),
	// 	os.Getenv("APP_DB_PASSWORD"),
	// 	os.Getenv("APP_DB_NAME"),
	// )
	// http.Handle("/", a.GetRTR())
}
