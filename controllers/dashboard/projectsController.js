const projectsModel = require("../../models/dashboard/projectsModel");
const path = require("path");
const {unlink} = require("fs");

const index = (req, res) => {
    projectsModel.index()
        .then(projects => {
            res.render("dashboard/pages/projects/index", { projects });
        });
}

const show = (req, res) => {
    const id = req.params['id'];
    console.log(id);
    projectsModel.show(id)
        .then(oneProject => {
            res.render("dashboard/pages/projects/show", { oneProject });
        });
}

const createForm = (req, res) => {
    res.render("dashboard/pages/projects/createForm");
}

const store = (req, res) => {
    // validation
    if(req.file != undefined) {
        req.body.photo = req.file.filename;
    } else {
        req.body.photo = "";
    }

    const formData = {
        title: req.body.title,
        description: req.body.description,
        photo: req.body.photo
    };

    projectsModel.store(formData)
        .then(error => {
            //
        });
    res.redirect("/dashboard/projects");
}
const updateForm = (req, res) => {
    const id = req.params['id'];
    projectsModel.updateForm(id)
        .then(oneProject => {
            res.render("dashboard/pages/projects/updateForm", { oneProject });
        });
}
// const updateForm = (req, res) => {
//     const id = req.params['id'];
//     projectsModel.updateForm(id)
//         .then(result => {
//             const oneProject = result[0]; // Assuming only one project will be returned
//             projectsModel.createForm()
//                 .then(categories => {
//                     res.render("dashboard/pages/projects/updateForm", { oneProject, categories });
//                 })
//                 .catch(error => {
//                     // Handle error
//                     console.error(error);
//                     res.status(500).send("Internal Server Error");
//                 });
//         })
//         .catch(error => {
//             // Handle error
//             console.error(error);
//             res.status(500).send("Internal Server Error");
//         });
// }

const update = (req, res) => {
    // validation
    console.log("Form submitted. Checking...");
    const id = req.params.id;
    console.log("ID:", id);
    projectsModel.updateForm(id)
        .then(oneProject => {
            console.log("oneProject data:", oneProject);
            if(oneProject.length != 0){
                if(req.file != undefined){
                    if(oneProject[0].photo != "") {
                        const publicPath = path.resolve("./", "public/uploads");
                        unlink(path.join(publicPath, oneProject[0].photo), (err) => {
                            if(err) {
                                throw err;
                            }
                        });
                    }
                    req.body.photo = req.file.filename;
                    projectsModel.update(req.body)
                    
                        .then(result => {
                            console.log("Update result:", result)
                        });
                    res.redirect("/dashboard/projects");                    
                }
                else {
                    req.body.photo = "";
                    projectsModel.update(req.body)
                        .then(error => {
                            //
                        });
                    res.redirect("/dashboard/projects");
                }
            }
        });
}
// const update = (req, res) => {
//     const id = req.params.id;
//     projectsModel.updateForm(id)
//         .then(oneProject => {
//             if (oneProject.length !== 0) {
//                 const existingPhoto = oneProject[0].photo;
//                 const formData = {
//                     id,
//                     title: req.body.title,
//                     description: req.body.description,
//                     catName: req.body.catName,
//                     photo: (req.file) ? req.file.filename : existingPhoto,
//                 };

//                 projectsModel.update(formData)
//                     .then(result => {
//                         if (existingPhoto !== "" && req.file) {
//                             // Delete the existing photo if a new photo is uploaded
//                             const publicPath = path.resolve("./", "public/uploads");
//                             unlink(path.join(publicPath, existingPhoto), (err) => {
//                                 if (err) {
//                                     console.error(err);
//                                 }
//                             });
//                         }
//                         res.redirect("/dashboard/projects");
//                     })
//                     .catch(error => {
//                         // Handle error
//                         console.error(error);
//                         res.status(500).send("Internal Server Error");
//                     });
//             } else {
//                 // Project not found
//                 res.status(404).send("Project not found");
//             }
//         })
//         .catch(error => {
//             // Handle error
//             console.error(error);
//             res.status(500).send("Internal Server Error");
//         });
// }

const destroy = (req, res) => {
    const id = req.params['id'];
    projectsModel.updateForm(id)
        .then(oneProject => {
            if(oneProject.length != 0){                
                if(oneProject[0].photo != "") {
                    const publicPath = path.resolve("./", "public/uploads");
                    unlink(path.join(publicPath, oneProject[0].photo), (err) => {
                        if(err) {
                            throw err;
                        }
                    });
                }                    
                projectsModel.destroy(id)
                    .then(error => {
                        //
                    });
                res.redirect("/dashboard/projects");
            }
        });    
}
// const destroy = (req, res) => {
//     const id = req.params['id'];
//     projectsModel.destroy(id)
//         .then(result => {
//             res.redirect("/dashboard/projects");
//         })
//         .catch(error => {
//             // Handle error
//             console.error(error);
//             res.status(500).send("Internal Server Error");
//         });
// }

module.exports = {
    index,
    show,
    createForm,
    store,
    updateForm,
    update,
    destroy
}