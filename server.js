
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


// Express middleware
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'theshop',
    password: 'root'
});


function runQuery(sql, cfield = false) {

    // Print in terminal all from department table - new
    connection.execute(sql, 
        function(err, results, fields) {
            //console.log('MYSQL - GET ALL DEPARTMENTS'); 
            //console.log(results);
            
            if (cfield) {
                console.log(fields);
            }
            console.table(results);

            if (err) {
                console.log(err);
            }

    });

   

}

//runQuery('SELECT * FROM `department`');

inquirer.prompt([
{
    type : 'rawlist',
    message : 'What would you like to do?',
    name : 'docommand',
    choices : ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee']
}
]).then( answers => {
    console.info('Answer:', answers.docommand);

    if (answers.docommand == 'View all departments') {
        runQuery('SELECT * FROM `department`');
    }

    if (answers.docommand == 'View all roles') {
        runQuery(`
        SELECT roles.title, roles.salary, department.name AS department
        FROM roles LEFT JOIN department ON roles.department_id = department.id;`);
    }

    if (answers.docommand == 'View all employees') {
        runQuery(`SELECT first_name, last_name, department.name AS department, roles.title AS role, roles.salary AS salary 
        FROM employees 
        LEFT JOIN roles ON roles.id = employees.role_id 
        LEFT JOIN department ON department.id = roles.department_id;`);
    }
    
    if (answers.docommand == 'Add a department') {
        //runQuery('SELECT * FROM `employees`');
        console.log('ADDING A DEPARTMENT');
        addDepartment();
    }

    if (answers.docommand == 'Add a role') {
        //runQuery('SELECT * FROM `employees`');
        console.log('ADDING A ROLE');
        addRole();
    }

    if (answers.docommand == 'Add an employee') {
        //runQuery('SELECT * FROM `employees`');
        console.log('ADDING A EMPLOYEE');
        addEmployee();
    }




    setTimeout(function() {
        return process.exit(0);
    }, 10000);

});


function addDepartment() {

    inquirer.prompt([
        {
            type : 'input',
            message : 'Enter a department name?',
            name : 'departmentDO',
        }
        ]).then( answers => {

            console.info('ANSWER: ', answers.departmentDO);
            runQuery(`INSERT into \`department\` (id, name) VALUES (null, '${answers.departmentDO}');`);
            console.info('Your department has been added: ', answers.departmentDO);
        });



}

function addRole() {

    inquirer.prompt([
        {
            type : 'input',
            message : 'Enter a department name?',
            name : 'departmentDO',
        }
        ]).then( answers => {

            console.info('ANSWER: ', answers.departmentDO);
            runQuery(`INSERT into \`role\` (id, name) VALUES (null, '${answers.departmentDO}');`);
            console.info('Your role has been added: ', answers.departmentDO);
        });


}

function addEmployee() {

    inquirer.prompt([
        {
            type : 'input',
            message : 'Enter a first name?',
            name : 'firstName',
        },
        {
            type : 'input',
            message : 'Enter a last name?',
            name : 'lastName',
        },
        {
            type : 'input',
            message : 'Enter a role ID?',
            name : 'roleID',
        },
        {
            type : 'input',
            message : 'Enter a Manager ID?',
            name : 'managerID',
        }
        ]).then( answers => {

            console.info('ANSWER: ', answers.firstName);
            console.info('ANSWER: ', answers.lastName);
            console.info('ANSWER: ', answers.roleID);
            console.info('ANSWER: ', answers.managerID);

            
        });





}
// setTimeout((function() {
//     return process.exit(0);
// }), 5000);

/* 
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
 */

