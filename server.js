const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
var resultsArray = [];

var departmentArray = [];
var rolesArray = [];


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'theshop',
    password: 'root'
});

/**
 * have to do something early otherwise no way to capture daya from runQuery as the function is async or something
 * can't return results to the outer function at all.
 */
function init() {
    runQuery(`SELECT roles.id, roles.title, roles.salary, department.id AS departmentID, department.name AS department
    FROM roles LEFT JOIN department ON roles.department_id = department.id;`, false, false);

}
init();


function runQuery(sql, cfield = false, showTABLE = true) {
    connection.execute(sql, 
        function(err, results, fields) {
            if (cfield) {
                console.log(fields);
            }
            setQueryResults(results);
            if (err) console.log(err);
            if (showTABLE) {
                console.table(results);
            }
    });
}

function setQueryResults(results) {
    resultsArray = results;
}

// opening prompt
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
        SELECT roles.id, roles.title, roles.salary, department.name AS department
        FROM roles LEFT JOIN department ON roles.department_id = department.id;`);
    }

    if (answers.docommand == 'View all employees') {
        runQuery(`SELECT first_name, last_name, department.name AS department, roles.title AS role, roles.salary AS salary 
        FROM employees 
        LEFT JOIN roles ON roles.id = employees.role_id 
        LEFT JOIN department ON department.id = roles.department_id;`);
    }
    
    if (answers.docommand == 'Add a department') {
        //console.log('ADDING A DEPARTMENT');
        addDepartment();
    }

    if (answers.docommand == 'Add a role') {
        //console.log('ADDING A ROLE');
        addRole();
    }

    if (answers.docommand == 'Add an employee') {
        //console.log('ADDING A EMPLOYEE');
        addEmployee();
    }
});

function addDepartment() {
    inquirer.prompt([
        {
            type : 'input',
            message : 'Enter a department name:',
            name : 'departmentDO',
        }
        ]).then( answers => {
            runQuery(`INSERT into \`department\` (id, name) VALUES (null, '${answers.departmentDO}');`);
            console.info('Your department has been added: ', answers.departmentDO);
            runQuery('SELECT * FROM `department`');
        });
}

function addRole() {
    inquirer.prompt([
        {
            type : 'input',
            message : 'Enter a role title:',
            name : 'roleName',
        },
        {
            type : 'input',
            message : 'Enter the salary:',
            name : 'roleSalary',
        },
        {
            type : 'input',
            message : 'Enter the department ID number:',
            name : 'departmentDo',
        }
        ]).then( answers => {
            console.info('ANSWER: ', answers.roleName);
            runQuery(`INSERT into \`roles\` (id, title, salary, department_id) VALUES (null, '${answers.roleName}', '${answers.roleSalary}', '${answers.departmentDo}');`); 
            console.info('Your role has been added: ', answers.roleName, ' at ', answers.roleSalary, ' in the ', answers.departmentDo, ' department');
            runQuery(`SELECT roles.title, roles.salary, department.name AS department
            FROM roles LEFT JOIN department ON roles.department_id = department.id;`);
        });
}

function addEmployee() {

    //unQuery(`SELECT id, title FROM roles WHERE id <> 0;`, false, true);

    inquirer.prompt([
        {
            type : 'input',
            message : 'Enter a first name: ',
            name : 'firstName',
        },
        {
            type : 'input',
            message : 'Enter a last name: ',
            name : 'lastName',
        },
        {
            type : 'rawlist',
            name : 'roleTitle',
            message : 'Enter their role:',
            choices : function () {
                var roles = [];
                //var itemNew = {};
                //console.dir(resultsArray);
                resultsArray.forEach(function(item) {
                    //console.log(item);
                    roles.push({ name : item.title, value : item.id });

                });
                //[ {name : 'Sales Mgr', value : 1 }, { name: 'Sales' , value : 2 }];
                return roles;
            
            }
        },
        {
            type : 'input',
            message : 'Enter the managers ID: ',
            name : 'managerId',
        }
        ]).then( answers => {
            runQuery(`INSERT INTO \`employees\` (id, first_name, last_name, role_id, manager_id) VALUES (null, '${answers.firstName}', '${answers.lastName}', ${answers.roleTitle}, ${answers.managerId});`, true, true);
            console.info('Your new employee has been added: ', answers.firstName, ' ', answers.lastName, ' ', answers.roleTitle,  ' ', answers.managerId);
            //final display of the added to table
            runQuery(`SELECT first_name, last_name, department.name AS department, roles.title AS role, roles.salary AS salary 
            FROM employees 
            LEFT JOIN roles ON roles.id = employees.role_id 
            LEFT JOIN department ON department.id = roles.department_id;`);
        });
}

