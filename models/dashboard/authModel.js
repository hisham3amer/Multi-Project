const mysql = require("mysql2");

const connection = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
});

const bcrypt = require("bcrypt");

async function storeUser(signupFormData) {

    const fullname = signupFormData.fullname;
    const username = signupFormData.username;

    return new Promise((resolve, reject) => {
        bcrypt.hash(signupFormData.password, 11, async (err, hash) => {
            if(err){
                //
            }
            else {
                // hash
                connection.query("INSERT INTO users (fullname, username, password, role) VALUES (?,?,?,?)", [fullname, username, hash, 'admin'], (error, result) => {
                    if(error) {
                        return res.json({ err: error});
                    }
                })
            }
        });
        
    });
}


async function verifySignin(signinForm) {
    const username = signinForm.username;
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM users WHERE username=?", [username], (error, result) => {
            if(!error){
                resolve(result);
            }
        })
    });
}

module.exports = {
    storeUser,
    verifySignin
}