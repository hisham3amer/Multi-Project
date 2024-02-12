const frontendModel = require("../../models/frontend/frontendModel");


const index = (req, res) => {
    const message = req.query.message;
    frontendModel.banner()
        .then(slides => {
            frontendModel.workCat()
                .then(categories => {
                    frontendModel.workProjects()
                        .then(projects => {
                            res.render("users/index", { slides, categories, projects, message });
                        });
                });
        });
}


const contactFormUser = (req, res) => {
    frontendModel.contactFormUserStore(req.body)
        .then(err => {
            
        });
        res.redirect("/" + "?message=Thank You, wee'll telephone you soon ." );
}


module.exports = {
    index,
    contactFormUser
}