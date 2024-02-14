const projToCatModel = require("../../models/dashboard/projToCatModel");
const path = require("path");
const {unlink} = require("fs");

const index = (req, res) => {
    projToCatModel.index()
        .then(prjcats => {
            res.render("dashboard/pages/projToCat/index", { prjcats });
        });
}

const createForm = (req, res) => {
    projToCatModel.createForm()
        .then(data => {
            const { workcat, workproj } = data;
            res.render("dashboard/pages/projToCat/createForm", { workcat, workproj });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Internal Server Error");
        });
}

const store = (req, res) => {
    // validation

    //////////////////
    projToCatModel.store(req.body).then((error) => {
        //
    });
    res.redirect("/dashboard/projToCat");
};

const updateForm = (req, res) => {
    const relId = req.params['relId'];
    projToCatModel.updateForm(relId)
        .then(({ workcat, workproj, workcatproj }) => {
            res.render("dashboard/pages/projToCat/updateForm", { workcat, workproj, workcatproj });
        });
}
const update = async (req, res) => {
    // const id = req.params.id;
    const { title, catName , relId} = req.body;
    try {
        // Assuming you have a model function named 'update' in your workcatModel
        await projToCatModel.update({ title, catName , relId });
        console.log("Work category updated successfully.");
        res.redirect("/dashboard/projToCat"); // Redirect to the appropriate page after the update
    } catch (error) {
        console.error("Error updating work category:", error);
        res.status(500).send("Internal Server Error");
    }
};


const destroy = (req, res) => {
    const relId = req.params['relId'];
    projToCatModel.updateForm(relId)
        .then(result => {                    
            projToCatModel.destroy(relId)
                    .then(error => {
                        //
                    });
                res.redirect("/dashboard/projToCat");
            
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