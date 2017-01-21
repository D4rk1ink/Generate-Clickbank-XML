import f from "../../models/function.models"

module.exports = new function(){
    this.render = function(req,res){
        res.render('amazon/index')
    }
    this.getproducts = function(req,res){
        request.post({url:'http://www.aliexpress.com/all-wholesale-products.html'}, function(err,response,body){
            if (!err && response.statusCode == 200) {
                const $ = cheerio.load(body,{
                    withDomLvl1: true,
                    normalizeWhitespace: false,
                    xmlMode: false,
                    decodeEntities: true
                })
                $("div.s-result-item").each(function(i,element){
                    $(this).find("img.s-access-image")[0]
                })
            }
        })
        res.render('amazon/get',data)
    }
}
