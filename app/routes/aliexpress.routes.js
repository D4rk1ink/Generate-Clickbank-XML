import alie from "../controllers/aliexpress/aliexpress.controllers"
import gen from "../controllers/aliexpress/generate.aliexpress.controllers"

module.exports = function(app,express){
    let router = express.Router()
    app.use("/aliexpress",routes(router))
}

function routes(router){
    router.route("/")
        .get(alie.render)
    router.route("/generate")
        .post(gen.gen)
    return router
}
