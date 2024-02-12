const mysql = require("mysql2");

const connection = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
});

async function index() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM contactform ORDER BY id DESC", [], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function show(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM contactform WHERE id=?", [id], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function markAsRead(id) {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE contactform SET isRead=? WHERE id=?", [1, id], (error, result) => {
            if (error) {
                return res.json({ err: error });
            }
        })
    });
}

async function destroy(id) {
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query("DELETE FROM contactform WHERE id=?", [id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        // If needed, you can return the result here
        return result;
    } catch (error) {
        // Handle the error or log it
        console.error("Error in destroy function:", error);
        throw error; // Rethrow the error to be caught by the calling function
    }
}


module.exports = {
    index,
    show,
    markAsRead,
    destroy
}