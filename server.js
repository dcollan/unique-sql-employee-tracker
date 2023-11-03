const inquirer = require("inquirer");
const mysql = require("mysql2");

// Establish connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "DBEmployeeTracker",
});

// Link to database
connection.connect((err) => {
    if (err) throw err;
    console.log("Linked to database");
    // Call function 'start'
    start();
});


// 'Start' function to execute app with prompts
function start() {
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                // View departments
                case "View all departments":
                    viewAllDepartments();
                    break;
                // View roles
                case "View all roles":
                    viewAllRoles();
                    break;
                // View employees
                case "View all employees":
                    viewAllEmployees();
                    break;
                // Add new department
                case "Add a department":
                    addDepartment();
                    break;
                // Add new role
                case "Add a role":
                    addRole();
                    break;
                // Add new employee
                case "Add an employee":
                    addEmployee();
                    break;
                // Update current employee's role
                case "Update an employee role":
                    updateEmployeeRole();
                    break;
                // Exit application
                case "Exit":
                    connection.end();
                    console.log("Application exited. Thank you!");
                    break;
            }
        });
}

// Function to query data on selecting all current departments to view from 'departments' table
function viewAllDepartments() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Function to query data on selecting all current roles, along with their associated ids, department names, salaries
function viewAllRoles() {
    const query = "SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.department_id = departments.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Function to query data on selecting all existing employees' first and last names, including their associated departments, salaries, and managers
function viewAllEmployees() {
    const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
    FROM employee e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Function to add a new department into the database
function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            name: "name",
            message: "Enter new department name: ",
        })
        .then((answer) => {
            console.log(answer.name);
            const query = `INSERT INTO departments (department_name) VALUES ("${answer.name}")`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log(`Successfully created new department ${answer.name}.`);
                start();
                console.log(answer.name);
            });
        });
}

// Function to add a new role into the database
function addRole() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Enter new role:",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Enter the role's salary:",
                },
                {
                    type: "list",
                    name: "department",
                    message: "Select new role's department:",
                    choices: res.map(
                        (department) => department.department_name
                    ),
                },
            ])
            .then((answers) => {
                const department = res.find(
                    (department) => department.department_name === answers.department
                );
                const query = "INSERT INTO roles SET ?";
                connection.query(
                    query,
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: department.id,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(
                            `Successfully created new role ${answers.title} with salary ${answers.salary} to the ${answers.department} department.`
                        );
                        start();
                    }
                );
            });
    });
}
