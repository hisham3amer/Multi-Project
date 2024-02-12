const express = require('express');
const webRouter = express.Router();
const app = express();

/* ------------- controllers ------------------- */

const frontendController = require('../controllers/frontend/frontendController');

/* -------------- parse of form ------------------- */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploades/");
    },
    filename: (req, file, cb) => {
        if(file){
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }
});

const upload = multer({
    storage: storage
});


/* ---------------------------------------------------- */
/* -------------- route roles ------------------------ */
/* ------------------------------------------------------ */

/* ********** users ************* */
webRouter.get('/', (req, res) => {
    frontendController.index(req, res);
});


webRouter.post('/contactFormUser', (req, res) => {
    frontendController.contactFormUser(req, res);
});

module.exports = webRouter;