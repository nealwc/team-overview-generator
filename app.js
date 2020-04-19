const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

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
// Build team member functions

function buildTeam() {
    console.log("Let's create a new team and start with the manager.")
    inquirer.prompt(managerQuestion).then(function(newManager) {
        console.log(newManager);
        console.log("Now let's add some members to the team.")
        teamMembers();
    });
};

function teamMembers() {
    inquirer.prompt(newEmployee).then(function (member) {
        if (member.addEmployee === "Yes") {
            inquirer.prompt(employeeType).then(function (employeeType) {
                if (employeeType.position === "Engineer") {
                    inquirer.prompt(engineerQuestions).then(function (engineer) {
                        console.log(engineer);
                        teamMembers();
                    });
                } else {
                    inquirer.prompt(internQuestions).then(function (intern) {
                        console.log(intern);
                        teamMembers();
                    });
                };
            });
        } else {
            console.log("Team created!")
        };
    });
};

buildTeam();