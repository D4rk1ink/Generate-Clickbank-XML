import template from "../controllers/template/template.controllers"
import create from "../controllers/template/create.template.controllers"
import view from "../controllers/template/view.template.controllers"
import edit from "../controllers/template/edit.template.controllers"
import del from "../controllers/template/delete.template.controllers"
import preview from "../controllers/template/preview.template.controllers"

module.exports = function(app,express){
    let router = express.Router()
    app.use("/template",routes(router))
}

function routes(router){
    router.route("/")
        .get(template.render)
    router.route("/create")
        .get(create.render)
        .post(create.create)
    router.route("/view")
        .post(view.render)
    router.route("/edit")
        .post(edit.render)
    router.route("/edit/submit")
        .post(edit.edit)
    router.route("/delete")
        .post(del.delete)
    router.route("/preview")
        .post(preview.render)
    return router
}
