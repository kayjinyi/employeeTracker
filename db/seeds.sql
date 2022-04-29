

INSERT INTO department (name)
VALUES ("HR"),
        ("R&D"),
        ("Test"),
        ("Finance"),
        ("Accounting"),  
        ("Physics");     
INSERT INTO role (id, name, salary, department_id)
VALUES ;
INSERT INTO students (id, first_name, last_name, role_id, manager_id)
VALUES ("Elliot", "Smith", false),
       ("Amira", "Afzal", true),
       ("Christoper", "Lee", true),
       ("Verónica", "Rodriguez", false),
       ("Igor", "Stein", true);

-- CREATE TABLE role (
--   id INT NOT NULL,
--   name VARCHAR(30) NOT NULL,
--   salary DECIMAL NOT NULL,
--   department_id INT NOT NULL,

-- );
-- CREATE TABLE employee (
--   id INT NOT NULL,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   role_id INT NOT NULL,
--   manager_id INT NOT NULL
-- )