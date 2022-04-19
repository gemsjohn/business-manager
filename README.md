# Business-Manager

## Description
As a business owner I wanted to be able to view and manage the departments, roles, and employees in my company so that I can organize and plan my business. The tool that I have produced is a command line interface that serves as a content management system. The primary features included are represented below.

- Launch the application
- View all departments
- View all roles
- View all employees
- Ability to add a department
- Ability to add a role
- Ability to add an employee
- Ability to update an employee role  

## Installation
- `git clone git@github.com:gemsjohn/business-manager.git`
- Open the cloned folder in Visual Studio
- Right click sever.js and select Open in Integrated Terminal
- run `npm install`
- Enter the following in the Terminal: `mysql -u root -p`
- Enter your mysql password
- run `source db/db.sql`
- run `source db/schema.sql`
- run `source db/seeds.sql`
- run `USE business;`
- Exit mysql by entering `quit`
- Then run `node server.js`

## Usage
- Node.js
- Inquirer Package
- MySQL2 Package
- Console.table package
- Express.js

## Images