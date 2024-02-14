const mysql = require("mysql2");

const connection = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
});

async function index() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT workproj.title , workcat.catName , workcatproj.relId, workcatproj.catId , workcatproj.projId FROM workproj , workcatproj , workcat WHERE workproj.id = workcatproj.projId AND workcat.id = workcatproj.catId
        ORDER BY workproj.title ASC`, [], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function createForm() {
    return new Promise((resolve, reject) => {
        // Use Promise.all to execute multiple queries concurrently
        Promise.all([
            new Promise((resolveCat, rejectCat) => {
                // Query to select data from workcat table
                connection.query("SELECT id AS categoryId , catName FROM workcat ORDER BY id ASC", (error, catResult) => {
                    if (error) {
                        rejectCat(error);
                    } else {
                        resolveCat(catResult);
                    }
                });
            }),
            new Promise((resolveProj, rejectProj) => {
                // Query to select data from workproj table
                connection.query("SELECT id AS projectId, title FROM workproj ORDER BY id ASC", (error, projResult) => {
                    if (error) {
                        rejectProj(error);
                    } else {
                        resolveProj(projResult);
                    }
                });
            })
        ])
        .then(([catResult, projResult]) => {
            // Combine results from both queries and resolve the main promise
            resolve({ workcat: catResult, workproj: projResult });
        })
        .catch((error) => {
            // If any query encounters an error, reject the main promise
            reject(error);
        });
    });
}

async function store(createFormData) {
    const title = createFormData.title;
    const catName = createFormData.catName;

    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO workcatproj (catId, projId) VALUES (?,?)", [catName , title], (error, result) => {
            if (!error) {
                resolve(result);
            }
        })
    });
}
async function updateForm(relId) {
    return new Promise((resolve, reject) => {
        // Use Promise.all to execute multiple queries concurrently
        Promise.all([
            new Promise((resolveCat, rejectCat) => {
                // Query to select data from workcat table
                connection.query("SELECT id AS categoryId , catName FROM workcat ORDER BY id ASC", (error, catResult) => {
                    if (error) {
                        rejectCat(error);
                    } else {
                        resolveCat(catResult);
                    }
                });
            }),
            new Promise((resolveProj, rejectProj) => {
                // Query to select data from workproj table
                connection.query("SELECT id AS projectId, title FROM workproj ORDER BY id ASC", (error, projResult) => {
                    if (error) {
                        rejectProj(error);
                    } else {
                        resolveProj(projResult);
                    }
                });
            }),
            new Promise((resolveRel, rejectRel) => {
                // Query to select data from workcatproj table based on relId
                connection.query(`SELECT workproj.title , workcat.catName , workcatproj.relId, workcatproj.catId , workcatproj.projId FROM workproj , workcatproj , workcat WHERE workproj.id = workcatproj.projId AND workcat.id = workcatproj.catId And workcatproj.relId = ? `, [relId], (error, relResult) => {
                    if (error) {
                        rejectRel(error);
                    } else {
                        resolveRel(relResult);
                    }
                });
            })
        ])
        .then(([catResult, projResult, relResult]) => {
            // Combine results from all queries and resolve the main promise
            resolve({ workcat: catResult, workproj: projResult, workcatproj: relResult });
        })
        .catch((error) => {
            // If any query encounters an error, reject the main promise
            reject(error);
        });
    });
}

async function update(updateFormData) {
    const { title, catName , relId } = updateFormData;

    return new Promise((resolve, reject) => {
        connection.query("UPDATE workcatproj SET projId=? ,catId=? WHERE relId=?", [title, catName , relId], (error, result) => {
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
async function destroy(relId) {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM workcatproj WHERE relId=?", [relId], (error, result) => {
            if(error) {
                reject(error);
            }
        })
    });
}

module.exports = {
    index,
    createForm,
    store,
    updateForm,
    update,
    destroy
}