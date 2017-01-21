import keyword from "../controllers/keyword/keyword.controllers"
import express from "express"

module.exports = function(app,express){
    let router = express.Router()
    app.use("/keyword-tool",routes(router))
}

function routes(router){
    router.route("/")
        .get(keyword.render)
    router.route("/search")
        .post(keyword.search)
    return router
}
