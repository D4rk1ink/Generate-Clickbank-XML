import f from "../../models/function.models"

module.exports = new function(){

    this.render = function(req,res){
        const codename = req.body.codename
        const template = f.findTemp(codename,function(template){
                const data = { template : template }
                res.render("template/preview",data)
            }
        )
    }
}
