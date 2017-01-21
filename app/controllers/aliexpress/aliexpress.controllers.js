import request from "request"
import cheerio from "cheerio"

module.exports = new function(){
    this.products = function(req,res){

    }
    this.render = function(req,res){
        request.post({url:'http://www.aliexpress.com/all-wholesale-products.html'}, function(err,response,body){
            if (!err && response.statusCode == 200) {
                let category = []
                const $ = cheerio.load(body,{
                    withDomLvl1: true,
                    normalizeWhitespace: false,
                    xmlMode: false,
                    decodeEntities: true
                })
                $("div.util-clearfix").each(function(i, element){
                    if($(this).children("h3.big-title").hasClass("big-title")){
                        const categoryURL = $(this).children("h3.big-title").children("a").attr('href')
                        const categoryName = $(this).children("h3.big-title").children("a").text()
                        const items = []
                        $(this).find("ul.sub-item-cont").children("li").each(function(i, element){
                            let re = /category\/(.*\d)\//gmi
                            let item = {
                                name : $(this).children("a").text(),
                                itemId : re.exec($(this).children("a").attr('href'))[1]
                            }
                            items.push(item)
                        })
                        category.push({
                            categoryName : categoryName,
                            categoryURL : categoryURL,
                            items : items
                        })
                    }
                })
                const data = { data : category}
                res.render("aliexpress/index",data)
            }
        })
    }
}
