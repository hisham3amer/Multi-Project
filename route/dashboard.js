const express = require('express');
const dashboardRouter = express.Router();
const app = express();

/* ------------- controllers ------------------- */

const bannerController = require('../controllers/dashboard/bannerController');
const contactformController = require('../controllers/dashboard/contactformController');
const workCatController = require('../controllers/dashboard/workCatController');
const projectsController = require('../controllers/dashboard/projectsController');
/* -------------- parse of form ------------------- */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
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
const authController = require("../controllers/dashboard/authController");

/* -------------- not auth pages ------------------- */
dashboardRouter.get('/signup', (req, res) => {
    authController.signup(req, res);
});

dashboardRouter.post('/storeUser', (req, res) => {
    authController.storeUser(req, res);
});

dashboardRouter.get('/signin', (req, res) => {
    authController.signin(req, res);
});

dashboardRouter.post('/verifySignin', (req, res) => {
    authController.verifySignin(req, res);
});

dashboardRouter.get('/logout', (req, res) => {
    authController.logout(req, res);
});

/* ------- auth --------- */
dashboardRouter.use(authController.isAthu);

/* ********** dashboard ************* */
dashboardRouter.get('/dashboard', (req, res) => {
    res.render("../views/dashboard/pages/index.ejs");
});
dashboardRouter.get('/dashboard/banner', (req, res) => {
    bannerController.index(req, res);
});
dashboardRouter.get('/dashboard/banner/show/:id', (req, res) => {
    bannerController.show(req, res);
});
dashboardRouter.get('/dashboard/banner/createForm', (req, res) => {
    bannerController.createForm(req, res);
});
// dashboardRouter.post('/dashboard/banner/store', bannerController.store);
dashboardRouter.post('/dashboard/banner/createForm/store', upload.single("photo"), (req, res) => {
    bannerController.store(req, res);
});
dashboardRouter.get('/dashboard/banner/updateForm/:id', bannerController.updateForm);
dashboardRouter.put('/dashboard/banner/updateForm/update/:id',upload.single("photo"), bannerController.update);

dashboardRouter.delete('/dashboard/banner/destroy/:id', (req, res) => {
    bannerController.destroy(req, res);
});



/* ------------------------------- */

dashboardRouter.get('/dashboard/contactform', (req, res) => {
    contactformController.index(req, res);
});
dashboardRouter.get('/dashboard/contactform/show/:id', (req, res) => {
    contactformController.show(req, res);
});
// dashboardRouter.get('/dashboard/contactform/destroy/:id', (req, res) => {
//     contactformController.destroy(req, res);
// });
dashboardRouter.delete('/dashboard/contactform/destroy/:id', (req, res) => {
    contactformController.destroy(req, res);
});

/* ------------------------------- */

dashboardRouter.get('/dashboard/workCategories', (req, res) => {
    workCatController.index(req, res);
});
dashboardRouter.get('/dashboard/workCategories/createForm', (req, res) => {
    workCatController.createForm(req, res);
});
dashboardRouter.post('/dashboard/workCategories/createForm/store', (req, res) => {
    workCatController.store(req, res);
});
dashboardRouter.get('/dashboard/workCategories/updateForm/:id', workCatController.updateForm);
dashboardRouter.put('/dashboard/workCategories/updateForm/update/:id', workCatController.update);

dashboardRouter.delete('/dashboard/workCategories/destroy/:id', (req, res) => {
    workCatController.destroy(req, res);
});

/* ------------------------------- */

dashboardRouter.get('/dashboard/projects', (req, res) => {
    projectsController.index(req, res);
});
dashboardRouter.get('/dashboard/projects/show/:id', (req, res) => {
    projectsController.show(req, res);
});
dashboardRouter.get('/dashboard/projects/createForm', (req, res) => {
    projectsController.createForm(req, res);
});
dashboardRouter.post('/dashboard/projects/createForm/store', upload.single("photo") , (req, res) => {
    projectsController.store(req, res);
});
dashboardRouter.get('/dashboard/projects/updateForm/:id', projectsController.updateForm);
dashboardRouter.put('/dashboard/projects/updateForm/update/:id', upload.single("photo"), projectsController.update);
dashboardRouter.delete('/dashboard/projects/destroy/:id', (req, res) => {
    projectsController.destroy(req, res);
});

module.exports = dashboardRouter;