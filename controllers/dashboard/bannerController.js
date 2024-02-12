const bannerModel = require("../../models/dashboard/bannerModel");
const path = require("path");
const {unlink} = require("fs");

const index = (req, res) => {
    bannerModel.index()
        .then(slides => {
            res.render("dashboard/pages/banner/index", { slides });
        });
}

const show = (req, res) => {
    const id = req.params['id'];
    bannerModel.show(id)
        .then(oneSlide => {
            res.render("dashboard/pages/banner/show", { oneSlide });
        });
}

const createForm = (req, res) => {
    res.render("dashboard/pages/banner/createForm");
}

const store = (req, res) => {
   // validation
    if(req.file != undefined) {
        req.body.photo = req.file.filename;
    }
    else {
        req.body.photo = "";
    }

   //////////////////
    bannerModel.store(req.body)
        .then(error => {
            //
        });
    res.redirect("/dashboard/banner");
}

const updateForm = (req, res) => {
    const id = req.params['id'];
    bannerModel.updateForm(id)
        .then(oneSlide => {
            res.render("dashboard/pages/banner/updateForm", { oneSlide });
        });
}

const update = (req, res) => {
    // validation
    console.log("Form submitted. Checking...");
    const id = req.params.id;
    console.log("ID:", id);
    bannerModel.updateForm(id)
        .then(oneSlide => {
            console.log("oneSlide data:", oneSlide);
            if(oneSlide.length != 0){
                if(req.file != undefined){
                    if(oneSlide[0].photo != "") {
                        const publicPath = path.resolve("./", "public/uploads");
                        unlink(path.join(publicPath, oneSlide[0].photo), (err) => {
                            if(err) {
                                throw err;
                            }
                        });
                    }
                    req.body.photo = req.file.filename;
                    bannerModel.update(req.body)
                    
                        .then(result => {
                            console.log("Update result:", result)
                        });
                    res.redirect("/dashboard/banner");                    
                }
                else {
                    req.body.photo = "";
                    bannerModel.update(req.body)
                        .then(error => {
                            //
                        });
                    res.redirect("/dashboard/banner");
                }
            }
        });
}
const destroy = (req, res) => {
    const id = req.params['id'];
    bannerModel.updateForm(id)
        .then(oneSlide => {
            if(oneSlide.length != 0){                
                if(oneSlide[0].photo != "") {
                    const publicPath = path.resolve("./", "public/uploads");
                    unlink(path.join(publicPath, oneSlide[0].photo), (err) => {
                        if(err) {
                            throw err;
                        }
                    });
                }                    
                bannerModel.destroy(id)
                    .then(error => {
                        //
                    });
                res.redirect("/dashboard/banner");
            }
        });    
}

module.exports = {
    index,
    show,
    createForm,
    store,
    updateForm,
    update,
    destroy
}