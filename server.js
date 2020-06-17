const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
let lastquery = null;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'theshop',
    password: 'root'
});

function runQuery(sql, cfield = false, returnResults = false) {
    // print in terminal all from department table
    connection.execute(sql, 
        function(err, results, fields) {
            if (cfield) {
                console.log(fields);
            }

            if (returnResults) {
                // return results;
            } else {
                console.table(results);
            }
            //lastquery = results;
            let resultsObject = [];
            console.dir(results);
            for(result in results) {
               // let obj = { name : result};
            }


            if (err) {
                console.log(err);
            }
    });
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
        console.log('ADDING A DEPARTMENT');
        addDepartment();
    }

    if (answers.docommand == 'Add a role') {
        console.log('ADDING A ROLE');
        addRole();
    }

    if (answers.docommand == 'Add an employee') {
        console.log('ADDING A EMPLOYEE');
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
            // runQuery(`INSERT into \`department\` (id, name) VALUES (null, '${answers.departmentDO}');`);
            console.info('Your role has been added: ', answers.roleName, ' at ', answers.roleSalary, ' in the ', answers.departmentDo, ' department');
            runQuery(`SELECT roles.title, roles.salary, department.name AS department
            FROM roles LEFT JOIN department ON roles.department_id = department.id;`);
        });
}

function addEmployee() {

    runQuery(`SELECT id, title FROM roles WHERE id <> 0;`, false, true);

    let roles = [ {name : 'Sales Mgr', value : '1'}, { name: 'Sales' , value : '2' }];
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
            choices : roles
        },
        {
            type : 'input',
            message : 'Enter the manager id: ',
            name : 'managerID',
        }
        ]).then( answers => {
            runQuery(`INSERT into \`employees\` (id, first_name, last_name, role_id, manager_id) VALUES (null, '${answers.firstName}', '${answers.lastName}');`);
            console.info('Answer:', answers.departmentName);


            console.info('Your new employee has been added: ', answers.firstName, ' ', answers.lastName);
            //final display of the added to table
            runQuery(`SELECT first_name, last_name, department.name AS department, roles.title AS role, roles.salary AS salary 
            FROM employees 
            LEFT JOIN roles ON roles.id = employees.role_id 
            LEFT JOIN department ON department.id = roles.department_id;`);
        });
}

