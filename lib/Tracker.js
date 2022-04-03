// Include packages needed for this application
const inquirer = require('inquirer');

function Tracker() {
    // departments > role > employee
    this.categories = [];
}

Tracker.prototype.initializeTracker = function() {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'category',
            message: 'Select a category:',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Deparement', 'Add a Role', 'Add an Emplolyee'],
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please provide a response!');
                    return false;
                }
            }
        }
    ])
    .then((response) => {
        if (response.category == 'View all Departments') {
            console.log('View all Departments');
        } else if (response.category == 'Add a Deparement') {
            console.log('Add a Deparement');
        } else if (response.category == 'View all Roles') {
            console.log('View all Roles');
        } else if (response.category == 'Add a Role') {
            console.log('Add a Role');
        } else if (response.category == 'View all Employees') {
            console.log('View all Employees');
        } else if (response.category == 'Add an Emplolyee') {
            console.log('Add an Emplolyee');
        }
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
        } else {
            console.log("Something else went wrong: categoryTracker");
        }
    });
}

module.exports = Tracker;