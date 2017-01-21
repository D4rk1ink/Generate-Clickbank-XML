import f from "../../models/function.models"

module.exports = new function(){
    this.render = function(req,res){
        res.render("index/index")
    }
}
