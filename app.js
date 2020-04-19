const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's id number?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?"
    },
];
const newEmployee = [
    {
        type: "list",
        name: "addEmployee",
        message: "Would you like to add an employee to the team?",
        choices: [
            "Yes",
            "No",
        ]
    },
];
const employeeType = [
    {
        type: "list",
        name: "position",
        message: "What kind of employee would you like to add?",
        choices: [
            "Engineer",
            "Intern",
        ]
    },
];
const managerQuestion = [
    {
        type: "input",
        name: "name",
        message: "What is the Managers's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the Mangers's id number?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the Managers's email address?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the Manager's office number?",
    }
];
const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the Engineer's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the Engineer's id number?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the Engineer's email address?"
    },
    {
        type: "input",
        name: "gitHub",
        message: "What is the Engineer's GitHub username?",
    },
];
const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the Intern's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the Intern's id number?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the Intern's email address?"
    },
    {
        type: "input",
        name: "school",
        message: "What school does the Intern go to?",
    }
];

// Function to push team member date to create team .html page
function renderTeam() {
    fs.writeFileSync(outputPath, render(employees));
}
// Build team member functions
function buildTeam() {
    console.log("Let's create a new team and start with the manager.")
    inquirer.prompt(managerQuestion).then(function(newManager) {
        const teamManager = new Manager (newManager.name, newManager.id, newManager.email, newManager.officeNumber);
        employees.push(teamManager);
        console.log("Now let's add some members to the team.");
        teamMembers();
    });
};

function teamMembers() {
    inquirer.prompt(newEmployee).then(function (member) {
        if (member.addEmployee === "Yes") {
            inquirer.prompt(employeeType).then(function (employeePosition) {
                if (employeePosition.position === "Engineer") {
                    inquirer.prompt(engineerQuestions).then(function (newEngineer) {
                        const teamEngineer = new Engineer (newEngineer.name, newEngineer.id, newEngineer.email, newEngineer.github);
                        employees.push(teamEngineer);
                        teamMembers();
                    });
                } else {
                    inquirer.prompt(internQuestions).then(function (newIntern) {
                        const teamIntern = new Intern (newIntern.name, newIntern.id, newIntern.email, newIntern.school);
                        employees.push(teamIntern);
                        teamMembers();
                    });
                };
            });
        } else {
            renderTeam();
            console.log("Team created!")
        };
    });
};

buildTeam();