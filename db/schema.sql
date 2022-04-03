DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(50) NOT NULL,
    salary INTEGER,
    role_id INTEGER,
    CONSTRAINT department_name FOREIGN KEY (role_id) REFERENCES department(id) ON DELETE SET NULL
);
CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    employee_id INTEGER,
    job_id INTEGER,
    CONSTRAINT job_title FOREIGN KEY (job_id) REFERENCES roles(id) ON DELETE CASCADE
);