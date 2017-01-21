import f from "../../models/function.models"

module.exports = new function(){
    this.edit = function(req,res){
        const name = req.body.name
        const header = req.body.header
        const template = req.body.template
        const button = req.body.button
        const codename = req.body.codename
        f.editTemp(name,codename,header,template,button)
        res.redirect("/template")
    }
    this.render = function(req,res){
        const codename = req.body.codename
        const template = f.findTemp(codename,function(template){
                const data = { template : template,
                                submit : "./edit/submit" }
                res.render("template/template",data)
            }
        )
    }
}
