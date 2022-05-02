const express = require("express"); //?
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
          console.log("Tracker Done!");
          break;
      }
    });
}

function viewDept() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    askQuestion();
  });
}

function viewRole() {
  db.query(
    "SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary FROM role LEFT JOIN department ON role.department_id = department.id;",
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      askQuestion();
    }
  );
}
function viewEmployee() {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.salary AS salary, role.title AS title, CONCAT(manager.first_name," ", manager.last_name) AS manager
    FROM employee 
    JOIN role 
    ON employee.role_id = role.id
    JOIN department 
    ON role.department_id = department.id
    LEFT JOIN employee manager
    ON manager.id = employee.manager_id;`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      askQuestion();
    }
  );
}

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
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        answers.departmentName,
        function (err, results) {
          if (err) {
            console.log(err);
          }
          console.log(`Added (${answers.departmentName}) to Database`);
          askQuestion();
        }
      );
    });
}

function addRole() {
  db.query("SELECT id AS value, name FROM department", function (err, result) {
    if (err) {
      console.log(err);
    }
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
          choices: result,
        },
      ])
      .then((answers) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`; //INSERT MULTI
        db.query(
          sql,
          [answers.roleName, answers.salary, answers.dept],
          function (err, results) {
            if (err) {
              console.log(err);
            }
            console.log(`Added (${answers.roleName}) to Database`);
            askQuestion();
          }
        );
      });
  });
}

function addEmployee() {
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
          "customer service",
        ],
      },
      {
        type: "list",
        message: "what is the employee's manager?",
        name: "manager",
        choices: ["John Smith", "Ashley Lee", "Kunal Wan", "Sarah Lourd"],
      },
    ])
    .then((answers) => {
      let roleId = "0";
      let managerId = "0";
      switch (answers.role) {
        case "sales Lead":
          roleId = "1";
          break;
        case "Salesperson":
          roleId = "2";
          break;
        case "Lead engineer":
          roleId = "3";
          break;
        case "Software engineer":
          roleId = "4";
          break;
        case "Account Manager":
          roleId = "5";
          break;
        case "Accountant":
          roleId = "6";
          break;
        case "Legal Team Lead":
          roleId = "7";
          break;
        case "Lawyer":
          roleId = "8";
          break;
        case "customer service":
          roleId = "9";
          break;
        default:
          console.log("Done!");
          break;
      }
      switch (answers.manager) {
        case "John Smith":
          managerId = "1";
          break;
        case "Ashley Lee":
          managerId = "3";
          break;
        case "Kunal Wan":
          managerId = "5";
          break;
        case "Sarah Lourd":
          managerId = "7";
          break;
        default:
          console.log("Done!");
          break;
      }
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`; //INSERT MULTI
      db.query(
        sql,
        [answers.firstName, answers.lastName, roleId, managerId],
        function (err, results) {
          if (err) {
            console.log(err);
          }
          console.log(`Added (${answers.firstName}) to Database`);
          db.query("SELECT * FROM employee", function (err, results) {
            if (err) {
              console.log(err);
            }
            console.table(results);
            askQuestion();
          });
        }
      );
    });
} //need to sole the auto_increment for employee form

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
          "Sam Kash",
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
      let employeeId = "0";
      let roleId = "0";
      switch (answers.employeeName) {
        case "John Smith":
          employeeId = "1";
          break;
        case "Mike Chan":
          employeeId = "2";
          break;
        case "Ashley Lee":
          employeeId = "3";
          break;
        case "Kevin Rodriguez":
          employeeId = "4";
          break;
        case "Kunal Wan":
          employeeId = "5";
          break;
        case "Malia Stein":
          employeeId = "6";
          break;
        case "Sarah Lourd":
          employeeId = "7";
          break;
        case "Tom Allen":
          employeeId = "8";
          break;
        case "Sam Kash":
          employeeId = "9";
          break;
        default:
          console.log("Done!");
          break;
      }
      switch (answers.role) {
        case "sales Lead":
          roleId = "1";
          break;
        case "Salesperson":
          roleId = "2";
          break;
        case "Lead engineer":
          roleId = "3";
          break;
        case "Software engineer":
          roleId = "4";
          break;
        case "Account Manager":
          roleId = "5";
          break;
        case "Accountant":
          roleId = "6";
          break;
        case "Legal Team Lead":
          roleId = "7";
          break;
        case "Lawyer":
          roleId = "8";
          break;
        case "customer service":
          roleId = "9";
          break;
        default:
          console.log("Done!");
          break;
      }
      const sql = "UPDATE employee SET role_id = ? WHERE id = ?";
      params = [roleId, employeeId];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("Updated employee's role");
        askQuestion();
      });
    });
} //How do you know succeed or not???

askQuestion();
