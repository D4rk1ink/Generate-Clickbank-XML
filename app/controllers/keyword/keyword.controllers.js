import request from "request"
import cheerio from "cheerio"

module.exports = new function(){
    this.render = function(req,res){
        res.render("keyword/index")
    }

    this.search = function(req,res){
        const keyword = req.body.keyword
        request.get({url:'http://keywordtool.io/'}, function(err,response,body){
            if (!err && response.statusCode == 200) {
                const $ = cheerio.load(body,{
                    withDomLvl1: true,
                    normalizeWhitespace: false,
                    xmlMode: false,
                    decodeEntities: true
                })
                const cm9ib3Rz = $("input[name=cm9ib3Rz]")["0"].attribs.value
                const form_build_id = $("input[name=form_build_id]")["0"].attribs.value
                const form_id = $("input[name=form_id]")["0"].attribs.value
                const payload = {
                    keyword:keyword,
                    domain:"us",
                    language:"en",
                    cm9ib3Rz:cm9ib3Rz,
                    provider:"1",
                    form_build_id:form_build_id,
                    form_id:form_id,
                    op:"Search"
                }
                request.post({url:'http://keywordtool.io/', form: payload}, function(err,response,body){
                    if (!err && response.statusCode == 302) {
                        request.get({url:response.headers.location}, function(err,response,body){
                            if (!err && response.statusCode == 200) {
                                let re = /<!\[CDATA\[\/\/><!--\n*jQuery\.extend\((.*)\)\;/gmi
                                let str = re.exec(response.body)
                                if(str !== null){
                                    re = /(\{.*)/gmi
                                    str = re.exec(str[1])
                                    const json = JSON.parse(str[1])
                                    const results = JSON.parse(json.ktSearch.results);
                                    let keywords = []
                                    for(var key in results) {
                                        results[key].forEach(function(keyword){
                                            keywords.push(keyword)
                                        })
                                    }
                                    const data = {  keyword : keyword,
                                                    keywords : keywords,
                                                    count : keywords.length
                                                }
                                    res.render("keyword/search",data)
                                }
                            }
                        })
                    }
                })
            }
        })
        //res.render("keyword/index")
    }
}
