import amazon from "../controllers/amazon/amazon.controllers"
import express from "express"

module.exports = function(app,express){
    let router = express.Router()
    app.use("/amazon",routes(router))
}

function routes(router){
    router.route("/")
        .get(amazon.render)
    router.route("/get")
        .post(amazon.getproducts)
    return router
}
