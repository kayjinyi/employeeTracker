

INSERT INTO department (name)
VALUES ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");  

SELECT * FROM department;   
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 80000, 1),
        ("Salesperson", 80000, 1),
       ("Lead engineer", 100000, 2),
       ("Software engineer", 100000, 2),
       ("Account Manager", 190000, 3),
       ("Accountant", 90000, 3),
       ("Legal Team Lead", 280000, 4),
       ("Lawyer", 380000, 4);
       
 SELECT * FROM role;       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith",1,NULL ),
       ("Mike", "Chan",2,1),
       ("Ashley", "Lee",3,NULL),
       ("Kevin", "Rodriguez",4,3),
        ("Kunal", "Wan",5,NULL),
       ("Malia", "Stein",6,5),
       ("Sarah", "Lourd",7,NULL),
       ("Tom", "Allen",8,7);
 SELECT * FROM employee; 


