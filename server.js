const express = require('express');
const db = require('./db/connection');
// const mysql = require('mysql2');

const logo = require("asciiart-logo");
const ctable = require('console.table');
const inquirer = require('inquirer');



const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// db.connect(err => {
//     if (err) throw err;
//     Employeesdata();
// });

app.use((req, res) => {
    res.status(404).end();
});


console.log(
    logo({
        name: "EMPLOYEE TRACKER",
        lineChars: 10,
    })

);


function Employeesdata() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What do you like to choose from below?",
        choices: [
            "View all Employees",
            "View all Roles",
            "View all Roles By department",
            "View all Departments",
            "Add Departments",
            "Add Role",
            "Add Employee",
            "Update Employee",
            "Quit",
        ],

    }).then(function(res) {

        switch (res.action) {
            case "View all Employees":
                Employeesinfo();
                break;
            case "View all Roles":
                Rolesinfo();
                break;
            case "View all Roles By department":
                viewroles();
                break;
            case "View all Departments":
                Departmentinfo();
                break;
            case "Add Departments":
                adddepartment();
                break;
            case "Add Role":
                addrole();
                break;
            case "Add Employee":
                addemployee();
                break;
            case "Update Employee":
                updateemployee();
                break;
            case "Quit":
                quit();


        }

    })
};

// View All Employee

function Employeesinfo() {

    var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;
    console.log(query);
    db.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        Employeesdata();
    });
};

// View All Roles 

function Rolesinfo() {

    var query = 'SELECT * FROM role';
    console.log(query);
    db.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        Employeesdata();
    });
};

// View Roles by department

function viewroles() {

    var query = `SELECT employee.id, employee.first_name, employee.last_name,role.salary, role.title, department.name AS department
    FROM employee LEFT JOIN role ON (role.id = employee.role_id) 
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY role.title`;
    console.log(query);
    db.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        Employeesdata();
    });
};

// View all Departments

function Departmentinfo() {

    var query = 'SELECT * FROM department';
    console.log(query);
    db.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        Employeesdata();
    });
};


// Add new Department

function adddepartment() {
    inquirer.prompt([{
        name: 'newinformation',
        type: 'input',
        message: 'Which type of department would ypu like to add'
    }]).then(function(addinfo) {
        db.query('INSERT INTO department SET?', {
            name: addinfo.newinformation
        });
        var query = 'SELECT * FROM department';
        db.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            Employeesdata();
        })
    })
};

// Add a new employee

function addemployee() {

    db.query(`SELECT * FROM role;`,
        function(err, res) {
            if (err) throw err;
            let rolesinfo = res.map(role => ({ name: role.title, value: role.role_id }));
            inquirer.prompt([{
                    type: 'input',
                    name: 'firstname',
                    message: 'What is employee first mame'
                },
                {
                    type: 'input',
                    name: 'lastname',
                    message: 'What is employee last name'
                },
                {
                    type: 'list',
                    name: 'roleID',
                    message: 'What is the employee title',
                    choices: rolesinfo
                },

            ]).then(function(res) {
                db.query(`INSERT INTO employee SET ?`, {
                        first_name: res.firstname,
                        last_name: res.lastname,
                        role_id: res.roleID,

                    },
                    function(err, res) {
                        if (err) throw err;
                        console.table(res);
                        console.log("employee added succesfully", res);
                        Employeesdata();
                    })

            })
        }
    )
};




// Add a new role

function addrole() {
    db.query(`SELECT * FROM Department;`, function(err, res) {
        if (err) throw err;
        let department = res.map(department => ({ name: department.name, value: department.id }));
        inquirer.prompt([{
                type: 'input',
                name: 'title',
                message: 'What type of role you want to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What salary you would like to add to the role'
            },
            {
                type: 'list',
                name: 'departmnetname',
                message: 'Which department do you want to add the new role to?',
                choices: department
            },
        ]).then(function(res) {
            db.query(`INSERT INTO role SET ?`, {
                    title: res.title,
                    salary: res.salary,
                    department_id: res.departmnetname,
                },
                function(err, res) {
                    if (err) throw err;
                    console.table(res);
                    console.log("role added succesfully", res);
                    Employeesdata();
                })

        })
    })
};

// Update a employee

function updateemployee() {

};





function quit() {
    db.end();

}
Employeesdata();