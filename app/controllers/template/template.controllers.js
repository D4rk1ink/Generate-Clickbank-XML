import f from "../../models/function.models"

module.exports = new function(){
    this.render = function(req,res){
        f.selectTemp(function(temp){
            const data = { template : temp }
            res.render("template/index",data)
        })
    }
}
