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
            this.addEmployeeTracker();
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
// first_name, last_name, employee_id, job_id, department_id, manager_name
Tracker.prototype.addEmployeeTracker = function() {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?',
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
            name: 'last_name',
            message: 'What is the employees last name?',
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
            name: 'employee_id',
            message: 'What is the employees ID number?',
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
            name: 'job',
            message: 'What job will the employee be doing?:',
            choices: [
                'Accounting Manager', 
                'Accounts Payable Clerk', 
                'Bookkeeper', 
                'Business Development Manager', 
                'Business Development Associate', 
                'Business Development Representative', 
                'Customer Service Representative', 
                'Customer Service Specialist', 
                'Customer Service Engineer',
                'Customer Service Manager',
                'Senior Developer',
                'Junior Developer',
                'Software QA Tester',
                'Development Lead',
                'IT Project Manager',
                'Network Administrator/Engineer',
                'Hardware Technician',
                'Marketing Manager',
                'Marketing Associate',
                'Design Lead',
                'Operations Manager',
                'Operations Associate', 
                'Quality Assurance Manager',
                'Quality Assurance Lead',
                'Quality Assurance Associate'
            ],
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
        let num_job_id;
        let num_department_id;
        let str_manager_name;

        if (response.job == 'Accounting Manager') {
            num_job_id = 1;
            num_department_id = 1;
            str_manager_name = 'VP of Accounting';
        } else if (response.job == 'Accounts Payable Clerk') {
            num_job_id = 2;
            num_department_id = 1;
            str_manager_name = 'Severinus Peyton';
        } else if (response.job == 'Bookkeeper') {
            num_job_id = 3;
            num_department_id = 1;
            str_manager_name = 'Severinus Peyton';
        } else if (response.job == 'Business Development Manager') {
            num_job_id = 4;
            num_department_id = 2;
            str_manager_name = 'VP of Business Development';
        } else if (response.job == 'Business Development Associate') {
            num_job_id = 5;
            num_department_id = 2;
            str_manager_name = 'Hallie Baines';
        } else if (response.job == 'Business Development Representative') {
            num_job_id = 6;
            num_department_id = 2;
            str_manager_name = 'Hallie Baines';
        } else if (response.job == 'Customer Service Representative') {
            num_job_id = 7;
            num_department_id = 3;
            str_manager_name = 'Jannette Cullen';
        } else if (response.job == 'Customer Service Specialist') {
            num_job_id = 8;
            num_department_id = 3;
            str_manager_name = 'Jannette Cullen';
        } else if (response.job == 'Customer Service Engineer') {
            num_job_id = 9;
            num_department_id = 3;
            str_manager_name = 'Jannette Cullen';
        } else if (response.job == 'Customer Service Manager') {
            num_job_id = 10;
            num_department_id = 3;
            str_manager_name = 'VP of Customer Support';
        } else if (response.job == 'Senior Developer') {
            num_job_id = 11;
            num_department_id = 4;
            str_manager_name = 'Theodulus Hunt';
        } else if (response.job == 'Junior Developer') {
            num_job_id = 12;
            num_department_id = 4;
            str_manager_name = 'Theodulus Hunt';
        } else if (response.job == 'Software QA Tester') {
            num_job_id = 13;
            num_department_id = 4;
            str_manager_name = 'Theodulus Hunt';
        } else if (response.job == 'Development Lead') {
            num_job_id = 14;
            num_department_id = 4;
            str_manager_name = 'VP of Development';
        } else if (response.job == 'IT Project Manager') {
            num_job_id = 15;
            num_department_id = 5;
            str_manager_name = 'VP of IT';
        } else if (response.job == 'Network Administrator/Engineer') {
            num_job_id = 16;
            num_department_id = 5;
            str_manager_name = 'Chantal Blakeslee';
        } else if (response.job == 'Hardware Technician') {
            num_job_id = 17;
            num_department_id = 5;
            str_manager_name = 'Chantal Blakeslee';
        } else if (response.job == 'Marketing Manager') {
            num_job_id = 18;
            num_department_id = 6;
            str_manager_name = 'VP of Marketing';
        } else if (response.job == 'Marketing Associate') {
            num_job_id = 19;
            num_department_id = 6;
            str_manager_name = 'Lillia Ryley';
        } else if (response.job == 'Design Lead') {
            num_job_id = 20;
            num_department_id = 6;
            str_manager_name = 'Lillia Ryley';
        } else if (response.job == 'Operations Manager') {
            num_job_id = 21;
            num_department_id = 7;
            str_manager_name = 'VP of Opertations';
        } else if (response.job == 'Operations Associate') {
            num_job_id = 22;
            num_department_id = 7;
            str_manager_name = 'Artemon Honeysett';
        } else if (response.job == 'Quality Assurance Manager') {
            num_job_id = 23;
            num_department_id = 8;
            str_manager_name = 'VP of QA';
        } else if (response.job == 'Quality Assurance Lead') {
            num_job_id = 24;
            num_department_id = 8;
            str_manager_name = 'Maree Farran';
        } else if (response.job == 'Quality Assurance Associate') {
            num_job_id = 25;
            num_department_id = 8;
            str_manager_name = 'Maree Farran';
        } 
        const sql = `INSERT INTO employees (first_name, last_name, employee_id, job_id, department_id, manager_name) VALUES (?)`;
       
        var value = [response.first_name, response.last_name, response.employee_id, num_job_id, num_department_id, str_manager_name]
        db.query(sql, [value], (err, rows) => {
            if (err) throw err;
            console.log("Employee has been added.");
            this.initializeTracker();
            
        })
    });
};
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