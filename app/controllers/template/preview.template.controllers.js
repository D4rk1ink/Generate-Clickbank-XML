import token from "../../token/generate.token"

module.exports = new function(){
    this.render = function(req,res){
        const header = req.body.header
        const template = req.body.template
        const mainkeyword = req.body.mainkeyword
        const subkeyword = req.body.subkeyword
        const hoplink = req.body.hoplink
        const button = req.body.button
        const data = {
            mainkeyword : mainkeyword,
            subkeyword : subkeyword,
            hoplink : hoplink,
            template : {
                header : header,
                template : template,
                button : button
            }
        }
        token.gen(data,token.spintext,function(datares){
            res.render("template/preview",datares)
        })
    }
}
