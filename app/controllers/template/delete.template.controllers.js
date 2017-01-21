import f from "../../models/function.models"

module.exports = new function(){
    this.delete = function(req,res){
        const codename = req.body.codename
        f.removeTemp(codename)
        res.redirect("/template")
    }
}
