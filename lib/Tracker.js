// Include packages needed for this application
const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');


function Tracker() {};

Tracker.prototype.initializeTracker = function() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: '\n [BUSINESS MANAGER] \n\n INSTRUCTIONS: HIT THE ARROW KEYS WHEN YOU WANT TO EXIT A TABLE. \n\n ENTER "YES" TO CONITNUE:',
            validate: userInfo => {
                if (userInfo == "YES" || userInfo == "yes") {
                    return true;
                } else {
                    console.log('Please provide a response!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'category',
            message: 'Select a category:',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Emplolyee', 'Updated Employee Role']
        }
    ])
    .then((response) => {
        if (response.category === 'View all Departments') {
            // VIEW DEPARTMENT
            db.query(`SELECT * FROM department`, (err, rows) => {
                console.log('\n');
                console.table(rows);
                console.log('\n');
            });

            this.initializeTracker();

        } else if (response.category === 'Add a Department') {
            // ADD DEPARTMENT
            this.addDepartmentTracker();

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
            });

            this.initializeTracker();

        } else if (response.category === 'Add a Role') {
            // ADD ROLES
            console.log('Add a Role');

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
            })

            this.initializeTracker();

        } else if (response.category === 'Add an Emplolyee') {
            // ADD EMPLOYEES
            console.log('Add an Emplolyee');
        } else if (response.category === 'Updated Employee Role') {
            console.log('Updated Employee Role');
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
        const sql = `INSERT INTO department (${response.name})
                     VALUES (?)`;
    });
};
// Tracker.prototype.addRoleTracker = function() {
//     inquirer.prompt ([
//         {
//             type: 'input',
//             name: 'job_title',
//             message: 'Identify the new job title:',
//             validate: userInfo => {
//                 if (userInfo) {
//                     return true;
//                 } else {
//                     console.log('Please provide a response!');
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'input',
//             name: 'salary',
//             message: 'What will the salary for this new position be?',
//             validate: userInfo => {
//                 if (userInfo) {
//                     return true;
//                 } else {
//                     console.log('Please provide a response!');
//                     return false;
//                 }
//             }
//         }, 
//         {
//             type: 'list',
//             name: 'role_id',
//             message: 'Select a department:',
//             // choices: ['Accounting', 'Business Development', 'Customer Support', 'Development', 'IT', 'Marketing', 'Operations', 'Quality Assurance'],
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