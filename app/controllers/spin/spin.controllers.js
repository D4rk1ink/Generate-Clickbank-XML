import request from "request"
import cheerio from "cheerio"

module.exports = new function(){
    this.spin = function(req,res){
        const content = req.body.content
        const payload = {
            spintext:content,
            spinway:"-1",
            output:"1",
            language:"English",
            protected:""
        }
        console.log("berequest")
        request.post({url:'http://www.bestfreespinner.com/webspin.php', form: payload}, function(err,response,body){
            console.log("request"+response.statusCode)
            if (!err && response.statusCode == 200) {
                console.log(body)
                const $ = cheerio.load(body,{
                    withDomLvl1: true,
                    normalizeWhitespace: false,
                    xmlMode: false,
                    decodeEntities: true
                })
                //const afterspin = $("input[name=text]")["0"].attribs.value
            }
        })
    }
    this.render = function(req,res){
        res.render("spin/index")
    }
}
