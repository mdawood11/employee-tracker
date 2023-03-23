const inquirer = require("inquirer");
const db = require("./connection");

const Question = () => {
  inquirer
    .prompt([
      {
        name: "prompt",
        type: "list",
        message: "EMPLOYEE MANAGER\n What would you like to do?",
        choices: [
          "Show all departments",
          "Add a department",
          "Show all roles",
          "Add a role",
          "Show all employees",
          "Add an employee",
          "Update an employee role",
          "Done",
        ],
      },
    ])
    .then((res) => {
      switch (res.prompt) {
        case "Show all departments":
          viewAllDep();
          break;
        case "Show all roles":
          viewRoles();
          break;
        case "Show all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          updateDep();
          break;
        case "Add a role":
          updateRole();
          break;
        case "Add an employee":
          updateEmp();
          break;
        case "Update an employee role":
          addEmpRole();
          break;
        case "Done":
          db.end();
          break;
      }
    });
};

const updateDep = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the new department?",
      },
    ])
    .then((data) => {
      db.query("Insert into department set?", {
        name: data.departmentName,
      });
      Question();
    });
};

const updateRole = () => {
  db.query("SELECT * FROM department", (err, res) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title name of the new role? ",
        },
        {
          type: "input",
          name: "salary",
          message: "How mach is the salary of the role? ",
        },
        {
          type: "list",
          name: "department",
          message: "Which department the role is belong to? ",
          choices: res.map((department) => department.name),
        },
      ])
      .then((data) => {
        const depName = res.find(
          (department) => department.name === data.department
        );
        db.query("INSERT INTO role set ?", {
          title: data.title,
          salary: data.salary,
          department_id: depName.id,
        });
        Question();
      });
  });
};

const updateEmp = () => {
  db.connect((err) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?",
        },
        {
          type: "input",
          name: "role_id",
          message: "What is the employee's role ID?",
        },
      ])
      .then((answers) => {
        db.query("INSERT INTO employee SET ?", answers, (err, res) => {
          if (err) throw err;
          console.log("Employee added successfully.");
          db.end();
        });
      });
  });
};

const addEmpRole = () => {
  db.connect((err) => {
    if (err) throw err;

    db.query("SELECT * FROM employee", (err, employees) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee's role do you want to update? ",
            choices: employees.map(
              (employee) => `${employee.first_name} ${employee.last_name}`
            ),
            type: "input",
            name: "role_id",
            message: "What is the new role ID for this employee?",
          },
        ])
        .then((answers) => {
          const employee = employees.find(
            (employee) =>
              `${employee.first_name} ${employee.last_name}` ===
              answers.employee
          );

          db.query(
            "UPDATE employee SET role_id = ? WHERE id= ?",
            [answers.role_id, employee.id],
            (err, res) => {
              if (err) throw err;
              console.log("Employee updated successfully.");
            }
          );
        });
    });
  });
};

const viewAllDep = () => {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    Question();
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    Question();
  });
};

const viewAllEmployees = () => {
  db.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    Question();
  });
};

Question();
