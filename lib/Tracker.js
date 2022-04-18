// Include packages needed for this application
const inquirer = require('inquirer');
const db = require('../db/connection');
// const cTable = require('console.table');


function Tracker() {};

Tracker.prototype.initializeTracker = function() {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'category',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Emplolyee', 'Update Employee Role']
        }
    ])
    .then((response) => {
        if (response.category === 'View all Departments') {
            // VIEW DEPARTMENT
            db.query(`SELECT * FROM department`, (err, rows) => {
                console.log('\n');
                console.table(rows);
                console.log('\n');
                this.initializeTracker();
            });
        } else if (response.category == 'View all Roles') {
            // VIEW ROLES
            const sql = `SELECT roles.*, department.department_name
                 AS department_name
                 FROM roles
                 LEFT JOIN department
                 ON roles.role_id = department.id`;

            db.query(sql, (err, rows) => {
                console.log('\n');
                console.table(rows);
                console.log('\n');
                this.initializeTracker();
            });

        } else if (response.category === 'View all Employees') {
            // VIEW EMPLOYEES
            const sql = `SELECT employees.*, department.department_name AS department_name,
                 roles.job_title AS job_title,
                 roles.salary AS salary
                 FROM employees
                 LEFT JOIN department ON employees.department_id = department.id
                 LEFT JOIN roles ON employees.job_id = roles.id`;

            db.query(sql, (err, rows) => {
                console.log('\n');
                console.table(rows);
                console.log('\n');
                this.initializeTracker();
            })
        } else if (response.category === 'Add a Department') {
            // ADD DEPARTMENT
            this.addDepartmentTracker();
        } else if (response.category === 'Add a Role') {
            // ADD ROLES
            this.addRoleTracker();
        } else if (response.category === 'Add an Emplolyee') {
            // ADD EMPLOYEES
            console.log('Add an Emplolyee');
        } else if (response.category === 'Update Employee Role') {
            // UPDATE AN EMPLOYEE
            console.log('Update Employee Role');
        }
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
        } else {
            console.log("Something else went wrong: categoryTracker");
        }
    });
};
//////////////////
Tracker.prototype.addDepartmentTracker = function() {
    inquirer.prompt ([
        {
            type: 'text',
            name: 'name',
            message: 'Identify the new Department name:',
            validate: userInfo => {
                if (userInfo) {
                    return true;
                } else {
                    console.log('Please provide a response!');
                    return false;
                }
            }
        }
    ])
    .then((response) => {
        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        var value = response.name;
        db.query(sql, value, (err, rows) => {
            if (err) throw err;
            console.log("Department has been added.");
            this.initializeTracker();
            
        })
    });
};
Tracker.prototype.addRoleTracker = function() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'job_title',
            message: 'Identify the new job title:',
            validate: userInfo => {
                if (userInfo) {
                    return true;
                } else {
                    console.log('Please provide a response!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What will the salary for this new position be?',
            validate: userInfo => {
                if (userInfo) {
                    return true;
                } else {
                    console.log('Please provide a response!');
                    return false;
                }
            }
        }, 
        {
            type: 'list',
            name: 'role_id',
            message: 'Select a department:',
            choices: ['Accounting', 'Business Development', 'Customer Support', 'Development', 'IT', 'Marketing', 'Operations', 'Quality Assurance'],
            validate: userInfo => {
                if (userInfo) {
                    return true;
                } else {
                    console.log('Please provide a response!');
                    return false;
                }
            }
        }
    ])
    .then((response) => {
        let num_role_id;
        if (response.role_id == 'Accounting') {
            num_role_id = 0;
        } else if (response.role_id == 'Business Development') {
            num_role_id = 1;
        } else if (response.role_id == 'Customer Support') {
            num_role_id = 2;
        } else if (response.role_id == 'Development') {
            num_role_id = 3;
        } else if (response.role_id == 'IT') {
            num_role_id = 4;
        } else if (response.role_id == 'Marketing') {
            num_role_id = 5;
        } else if (response.role_id == 'Operations') {
            num_role_id = 6;
        } else if (response.role_id == 'Quality Assurance') {
            num_role_id = 7;
        } 
        const sql = `INSERT INTO roles (job_title, salary, role_id) VALUES (?)`;
       

        var value = [response.job_title, response.salary, num_role_id]
        db.query(sql, [value], (err, rows) => {
            if (err) throw err;
            console.log("Role has been added.");
            this.initializeTracker();
            
        })
    });
};
// Tracker.prototype.addEmployeeTracker = function() {
//     inquirer.prompt ([
//         {
//             type: 'input',
//             name: 'first_name',
//             message: '',
//             validate: userInfo => {
//                 if (userInfo) {
//                     return true;
//                 } else {
//                     console.log('Please provide a response!');
//                     return false;
//                 }
//             }
//         }
//     ])
// };
// Tracker.prototype.updateEmployeeRoleTracker = function() {
//     inquirer.prompt ([
//         {
//             type: 'input',
//             name: 'name',
//             message: '',
//             validate: userInfo => {
//                 if (userInfo) {
//                     return true;
//                 } else {
//                     console.log('Please provide a response!');
//                     return false;
//                 }
//             }
//         }
//     ])
// };

module.exports = Tracker;