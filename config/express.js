import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cookieSession from "cookie-session"
import database from "../app/models/function.models"

const routes = {
                    index : require("../app/routes/index.routes"),
                    template : require("../app/routes/template.routes"),
                    keyword : require("../app/routes/keyword.routes"),
                    spin : require("../app/routes/spin.routes"),
                    amazon : require("../app/routes/amazon.routes"),
                    aliexpress : require("../app/routes/aliexpress.routes")
                }

function app(){
    let app = express()
    app.use(cookieParser())
    app.use(cookieSession({
		name : 'session',
		keys : ['$GHKI%&MhhHdxh#97%hj%JT^4jf#bvh!9)<VMA','GJKD(*Q#PWKPOJGPWN#)_<<>#_)#XCE#']
	}))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended : true
    }))
    app.set("views" , "./app/views")
    app.set("view engine" , "ejs")
    database.connection()
    ////////////Routes//////////
    routes.index(app,express)
    routes.template(app,express)
    routes.keyword(app,express)
    routes.amazon(app,express)
    routes.aliexpress(app,express)
    routes.spin(app,express)
    app.use(express.static("./public"))
    return app
}

module.exports = app()
