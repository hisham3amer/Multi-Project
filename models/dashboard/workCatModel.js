const mysql = require("mysql2");

const connection = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
});

async function index() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workcat ORDER BY id ASC", [], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function show(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM banner WHERE id=?", [id], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function store(createFormData) {
    const catName = createFormData.catName;

    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO workcat (catName) VALUES (?)", [catName], (error, result) => {
            if (!error) {
                resolve(result);
            }
        })
    });
}


async function updateForm(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workcat WHERE id=?", [id], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function update(updateFormData) {
    const { id, catName } = updateFormData;

    return new Promise((resolve, reject) => {
        connection.query("UPDATE workcat SET catName=? WHERE id=?", [catName, id], (error, result) => {
            console.error("Error in SQL query:", error);

            if (error) {
                reject(error);  // Reject the promise with the error
            } else {
                console.log("Update Result:", result);
                resolve(result);  // Resolve the promise with the result
            }
        });
    });
}

async function destroy(id) {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM workcat WHERE id=?", [id], (error, result) => {
            if(error) {
                return res.json({ err: error});
            }
        })
    });
}

module.exports = {
    index,
    show,
    store,
    updateForm,
    update,
    destroy
}