const workCatModel = require("../../models/dashboard/workCatModel");
const path = require("path");
const {unlink} = require("fs");

const index = (req, res) => {
    workCatModel.index()
        .then(workCats => {
            res.render("dashboard/pages/workCategories/index", { workCats });
        });
}

// const show = (req, res) => {
//     const id = req.params['id'];
//     bannerModel.show(id)
//         .then(oneSlide => {
//             res.render("dashboard/pages/banner/show", { oneSlide });
//         });
// }

const createForm = (req, res) => {
    res.render("dashboard/pages/workCategories/createForm");
}

const store = (req, res) => {
   // validation

   //////////////////
    workCatModel.store(req.body)
        .then(error => {
            //
        });
    res.redirect("/dashboard/workCategories");
}

const updateForm = (req, res) => {
    const id = req.params['id'];
    workCatModel.updateForm(id)
        .then(workCat => {
            res.render("dashboard/pages/workCategories/updateForm", { workCat });
        });
}

const update = async (req, res) => {
    // const id = req.params.id;
    const { id, catName } = req.body;
    try {
        // Assuming you have a model function named 'update' in your workcatModel
        await workCatModel.update({ id, catName });
        console.log("Work category updated successfully.");
        res.redirect("/dashboard/workCategories"); // Redirect to the appropriate page after the update
    } catch (error) {
        console.error("Error updating work category:", error);
        res.status(500).send("Internal Server Error");
    }
};

const destroy = (req, res) => {
    const id = req.params['id'];
    workCatModel.updateForm(id)
        .then(workCat => {                    
            workCatModel.destroy(id)
                    .then(error => {
                        //
                    });
                res.redirect("/dashboard/workCategories");
            
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