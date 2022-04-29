const express = require("express");
// Import and require mysql2
const PORT =  3001;
const mysql = require("mysql2");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function askQuestion() {
  inquirer
    //prompted to
    .prompt([
      {
        type: "list",
        message: "Following optiongs",
        name: "option",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((data) => {
      switch (data.option) {
        case "view all departments":
          viewDept();
          break;
        case "view all roles"
          viewRole();
          break;
        case "view all employees":
          viewEmployee();
          break;
        case "add a department":
          addDept();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "update an employee role":
          updateEmployee();
          break;
        default:
          console.log("Your team is built");
          break;
      }
    });
}

function viewDept(){

};

function viewRole(){

};

function viewEmployee(){

};

function addDept(){

};

function addRole(){

};

function addEmployee(){

};

function updateEmployee(){

};

askQuestion();
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "tracker_db",
  },
  console.log(`Connected to the tracker_db database.`)
);

db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Query database
db.query("SELECT * FROM course_names", function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
