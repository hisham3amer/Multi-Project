const mysql = require("mysql2");

const connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

async function banner() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM banner ORDER BY id DESC", [], (error, result) => {
            if (!error) {
                resolve(result);
            }
        })
    });
}

async function workCat() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workCat", [], (error, result) => {
            if (!error) {
                resolve(result);
            }
        })
    });
}

async function workProjects() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT workproj.title, workproj.description, workproj.photo, GROUP_CONCAT(workcat.catName SEPARATOR ' ') AS categories FROM workproj JOIN workcatproj ON workproj.id = workcatproj.projId JOIN workcat ON workcatproj.catId = workcat.id GROUP BY workproj.id;", [], (error, result) => {
            if (!error) {
                resolve(result);
            }
        })
    });
}


async function contactFormUserStore(contactFormData) {
    const fullName = contactFormData.fullName;
    const email = contactFormData.email;
    const subject = contactFormData.subject;
    const message = contactFormData.message;    

    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO contactform (fullName, email, subject, message) VALUES (?,?,?,?)", [fullName, email, subject, message], (error, result) => {
            if (error) {
                return res.json({ err: error });
            }
        })
    });
}


module.exports = {
    banner,
    workCat,
    workProjects,
    contactFormUserStore
}