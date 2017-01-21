import spin from "../controllers/spin/spin.controllers"

module.exports = function(app,express){
    let router = express.Router()
    app.use("/spin",routes(router))
}

function routes(router){
    router.route("/")
        .get(spin.render)
    router.route("/spin")
        .post(spin.spin)
    return router
}
