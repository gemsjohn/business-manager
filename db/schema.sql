DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    role_id INTEGER,
    CONSTRAINT department_name FOREIGN KEY (role_id) REFERENCES department(id) ON DELETE SET NULL
)