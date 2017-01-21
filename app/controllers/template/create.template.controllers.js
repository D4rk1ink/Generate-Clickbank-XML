import crypto from "crypto"
import f from "../../models/function.models"

module.exports = new function(){
    this.create = function(req,res){
        const name = req.body.name
        const header = req.body.header
        const template = req.body.template
        const button = req.body.button
        const codename = crypto.createHash('md5').update(name+Date.now()).digest("hex")
        f.insertTemp(name,codename,header,template,button)
        res.redirect("/template")
    }
    this.render = function(req,res){
        const data = { submit : "./create" }
        res.render("template/template",data)
    }
}
