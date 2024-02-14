const mysql = require("mysql2");

const connection = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
});

async function index() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workproj ORDER BY id DESC", [], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}
// async function index() {
//     return new Promise((resolve, reject) => {
//         connection.query("SELECT workproj.id, workproj.title, workproj.description, GROUP_CONCAT(workcat.catName SEPARATOR ' ') AS categories " +
//         "FROM workproj " +
//         "JOIN workcatproj ON workproj.id = workcatproj.projId " +
//         "JOIN workcat ON workcatproj.catId = workcat.id " +
//         "GROUP BY workproj.id", [], (error, result) => {
//             if(!error) {
//                 resolve(result);
//             }
//         })
//     });
// }
async function show(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workproj WHERE id=?", [id], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

// async function createForm() {
//     return new Promise((resolve, reject) => {
//         connection.query("SELECT catName FROM workcat ORDER BY id ASC", (error, result) => {
//             if(!error) {
//                 resolve(result);
//             }
//         })
//     });
// }

async function store(createFormData) {
    const title = createFormData.title;
    const description = createFormData.description;
    const photo = createFormData.photo;

    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO workproj (title, description, photo) VALUES (?,?,?)", [title, description, photo], (error, result) => {
            if (!error) {
                resolve(result);
            }
        })
    });
}

// async function store(createFormData) {
//     const title = createFormData.title;
//     const description = createFormData.description;
//     const photo = createFormData.photo;
//     const catName = createFormData.catName;

//     return new Promise((resolve, reject) => {
//         // Insert into workproj
//         connection.query("INSERT INTO workproj (title, description, photo) VALUES (?, ?, ?)", [title, description, photo], (error, result) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }

//             // Get the last inserted project ID
//             const lastProjectId = result.insertId;

//             // Insert into workcatproj
//             connection.query("INSERT INTO workcatproj (catId, projId) VALUES ((SELECT id FROM workcat WHERE catName = ?), ?)", [catName, lastProjectId], (error, result) => {
//                 if (error) {
//                     reject(error);
//                     return;
//                 }

//                 // Both queries executed successfully
//                 resolve(result);
//             });
//         });
//     });
// }
async function updateForm(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workproj WHERE id=?", [id], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}
async function update(updateFormData) {
    const id = updateFormData.id;
    console.log("ID Type:", typeof id);

    const title = updateFormData.title;
    const description = updateFormData.description;
    const photo = updateFormData.photo;

    let updateSQL, updatedFields;

    if (photo !== "") {
        updateSQL = "UPDATE workproj SET title=?, description=?, photo=? WHERE id=?";
        updatedFields = [title, description, photo, id];
        console.log("Update SQL:", updateSQL);
        console.log("Updated Fields:", updatedFields);
    } else {
        updateSQL = "UPDATE workproj SET title=?, description=? WHERE id=?";
        updatedFields = [title, description, id];
        console.log("Update SQL:", updateSQL);
        console.log("Updated Fields:", updatedFields);
    }

    return new Promise((resolve, reject) => {
        connection.query(updateSQL, updatedFields, (error, result) => {
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
// async function updateForm(id) {
//     return new Promise((resolve, reject) => {
//         connection.query("SELECT * FROM workproj WHERE id=?", [id], (error, result) => {
//             if(!error) {
//                 resolve(result);
//             }
//         })
//     });
// }
// // async function updateForm(id) {
// //     return new Promise((resolve, reject) => {
// //         connection.query("SELECT workproj.id, workproj.title, workproj.description, workproj.photo, GROUP_CONCAT(workcat.catName SEPARATOR ' ') AS categories " +
// //             "FROM workproj " +
// //             "JOIN workcatproj ON workproj.id = workcatproj.projId " +
// //             "JOIN workcat ON workcatproj.catId = workcat.id " +
// //             "WHERE workproj.id = ? " +
// //             "GROUP BY workproj.id", [id], (error, result) => {
// //                 if (!error) {
// //                     resolve(result);
// //                 } else {
// //                     reject(error);
// //                 }
// //             });
// //     });
// // }
// async function update(updateFormData) {
//     const id = updateFormData.id;
//     const title = updateFormData.title;
//     const description = updateFormData.description;
//     const photo = updateFormData.photo;
//     const catName = updateFormData.catName;

//     let updateSQL, updatedFields;

//     if (photo !== "") {
//         updateSQL = "UPDATE workproj SET title=?, description=?, photo=? WHERE id=?";
//         updatedFields = [title, description, photo, id];
//     } else {
//         updateSQL = "UPDATE workproj SET title=?, description=? WHERE id=?";
//         updatedFields = [title, description, id];
//     }

//     return new Promise((resolve, reject) => {
//         connection.query(updateSQL, updatedFields, (error, result) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 // Update the catName in the workcatproj table
//                 connection.query("UPDATE workcatproj SET catId = (SELECT id FROM workcat WHERE catName = ?) WHERE projId = ?", [catName, id], (error, catResult) => {
//                     if (error) {
//                         reject(error);
//                     } else {
//                         resolve(result);
//                     }
//                 });
//             }
//         });
//     });
// }
async function destroy(id) {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM workproj WHERE id=?", [id], (error, result) => {
            if(error) {
                return res.json({ err: error});
            }
        })
    });
}

// async function destroy(id) {
//     return new Promise((resolve, reject) => {
//         // Delete project and related entries in workcatproj
//         connection.query("DELETE FROM workproj WHERE id=?", [id], (error, result) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 // Check if any rows were affected
//                 if (result.affectedRows > 0) {
//                     // Project deleted successfully, now delete related entries in workcatproj
//                     connection.query("DELETE FROM workcatproj WHERE projId=?", [id], (error, result) => {
//                         if (error) {
//                             reject(error);
//                         } else {
//                             resolve(result);
//                         }
//                     });
//                 } else {
//                     // No project found with the given ID
//                     resolve({ message: "Project not found" });
//                 }
//             }
//         });
//     });
// }

module.exports = {
    index,
    // createForm,
    show,
    store,
    updateForm,
    update,
    destroy
}