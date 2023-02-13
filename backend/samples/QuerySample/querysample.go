package QuerySample

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func QuerySample() {
	// Enter your personal mySQL root password where [root_password] is
	db, err := sql.Open("mysql", "root:[root_password]@tcp(127.0.0.1:3306)/testdb")

	// To create the test database in the mySQL workbench for this sample:
	// 		1. "Create new schema" button at top row -> 2. Enter "testdb" for the database name (or anything you want, testdb is what I used in this example)
	// 		3. Go to "Schemas" on left lower side of UI -> 4. Right click "Tables", Create table, name it "item1" (again, or anything you want, I used "item1")
	//		5. Click on the wrench icon by the new table -> 6. Add 3 columns with names "id", "name", and "number" (None of the PK, NN, etc options need to be checked)
	// 		6. Right click the newly created table, Select Rows -> 7. Note the table is empty before running this sample

	if err != nil { // Check if database connection occurs, panics otherwise
		fmt.Println("Unable to connect to database")
		panic(err.Error())
	}
	fmt.Println("Connected")
	defer db.Close()

	err = db.Ping()
	if err != nil { // Check if database can be pinged (if the schema step was done correctly)
		fmt.Println("Unable to ping to database")
		panic(err.Error())
	}
	fmt.Println("Pinged")

	// The query function will attempt to send a SQL command to the database, in this case it's adding a row with the INSERT INTO command
	// formatting:			"INSERT INTO `schema/database_name`,`table_name` ('column1_name`,`column2_name`,`column3_name`) VALUES (`column1_value','column2_value','column3_value');"
	insert, err := db.Query("INSERT INTO `testdb`.`item1` (`id`, `name`, `number`) VALUES ('id:1', 'bob', '1');")
	if err != nil { // Checks if the query to add a table row was successful
		panic(err.Error())
	}
	defer insert.Close()
	fmt.Println("Queried")

}
