import index from "../controllers/index/index.controllers"
import generate from "../controllers/generate/generate.controllers"

module.exports = function(app,router){
    app.get("/",index.render)
    app.get("/generate",generate.render)
    app.post("/generate",generate.gen)
}
