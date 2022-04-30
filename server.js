const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password",
    database: "tracker_db",
  },
  console.log(`Connected to the tracker_db database.`)
);

function askQuestion() {
  inquirer
    //prompted to
    .prompt([
      {
        type: "list",
        message: "What would you like to do",
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
        case "view all roles":
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

function viewDept() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
  });
}

function viewRole() {
  db.query(
    "SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary FROM role LEFT JOIN department ON role.department_id = department.id;",
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log(results);
    }
  );
}

function viewEmployee() {
  db.query(
    "SELECT employee.id AS id, employee.first_name AS first_name , employee.last_name AS last_name, department.name AS department, role.salary AS salary, employee.manager AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ;",
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log(results);
    }
  );
}
//How to save the result from viewRole???

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "what is the name of Department?",
      },
    ])
    .then((answers) => {
      const sql = "INSERT INTO department (name) VALUES (?)";

      db.query(sql, data, (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results);
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "what is the name of role?",
      },
      {
        type: "input",
        name: "salary",
        message: "what is the salary of role",
      },
      {
        type: "list",
        message: "Which department does the role belong to",
        name: "dept",
        choices: ["sales", "Engineering", "Finance", "Legal"],
      },
    ])
    .then((answers) => {
      answers.roleName;
      answers.salary;
      answers.dept;
      const sql = "INSERT INTO department (name) VALUES (?)";

      db.query(sql, data, (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results);
      });
    });
}

function addEmployee() {
  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "what is the employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "what is the employee's last name?",
        },
        {
          type: "list",
          message: "what is the employee's role?",
          name: "role",
          choices: [
            "Sales Lead",
            "Salesperson",
            "Lead engineer",
            "Software engineer",
            "Account Manager",
            "Accountant",
            "Legal Team Lead",
            "Lawyer",
          ],
        },
        {
          type: "list",
          message: "what is the employee's manager?",
          name: "role",
          choices: ["John Smith", "Ashley Lee", "Kunal Wan", "Sarah Lourd"],
        },
      ])
      .then((answers) => {
        // answers.roleName;
        // answers.salary
        // answers.dept;
        // const sql = "INSERT INTO department (name) VALUES (?)";
        // db.query(sql,data, (err, results) => {
        //   if (err) {
        //     console.log(err);
        //   }
        //   console.log(results);
      });
  }
}
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "which employee do you want to update",
        name: "employeeName",
        choices: [
          "John Smith",
          "Mike Chan",
          "Ashley Lee",
          "Kevin Rodriguez",
          "Kunal Wan",
          "Malia Stein",
          "Sarah Lourd",
          "Tom Allen",
        ],
      },
      {
        type: "list",
        message: "which role do you want to assign the selected employee?",
        name: "role",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead engineer",
          "Software engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
      },
    ])
    .then((answers) => {
      //   const sql = "INSERT INTO department (name) VALUES (?)";
      //   db.query(sql,data, (err, results) => {
      //     if (err) {
      //       console.log(err);
      //     }
      //     console.log(results);
      // });
    });
}

askQuestion();
