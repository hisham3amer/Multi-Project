const contactformModel = require("../../models/dashboard/contactformModel");

const index = (req, res) => {
    contactformModel.index()
        .then(messages => {
            res.render("dashboard/pages/contactform/index", { messages });
        });
}

const show = (req, res) => {
    const id = req.params['id'];
    contactformModel.show(id)
        .then(oneMessage => {
            contactformModel.markAsRead(id)
                    .then(err => {
                        //
                    });
                    res.render("dashboard/pages/contactform/show", { oneMessage });
        });
}

const destroy = (req, res) => {
    const id = req.params['id'];
    contactformModel.destroy(id)
        .then(error => {
            //
        });
    res.redirect("/dashboard/contactform");
}

module.exports = {
    index,
    show,
    destroy
}