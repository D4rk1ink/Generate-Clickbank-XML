import fs from "fs"
import df from "dateformat"
import f from "../../models/function.models"
import token from "../../token/generate.token"

module.exports = new function(){
    function genxml(data,subkeywords,time,callback){
        const datepost = new Date()
        let now = new Date().getTime()
        let xml = '<?xml version="1.0" encoding="UTF-8" ?>\
                    <rss version="2.0"\
                    	xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"\
                    	xmlns:content="http://purl.org/rss/1.0/modules/content/"\
                    	xmlns:wfw="http://wellformedweb.org/CommentAPI/"\
                    	xmlns:dc="http://purl.org/dc/elements/1.1/"\
                    	xmlns:wp="http://wordpress.org/export/1.2/"\
                    >\
                    <channel>\
                    	<wp:wxr_version>1.2</wp:wxr_version>\
                    '
        for(let sub in subkeywords){
            now += (Math.floor(Math.random()*(time.max-time.min))+time.min)
            console.log(time.max-time.min)
            datepost.setTime(now)
            const d1 = df(datepost, "dddd, dd mmmm yyyy HH:MM:ss")
            const d2 = df(datepost, "yyyy-mm-dd HH:MM:ss")
            data.subkeyword = sub
            token.gen(data,token.spintext,function(item){
                xml = xml+'<item>\
                                <title>'+item.template.header+'</title>\
                                <pubDate>'+d1+' +0000</pubDate>\
                                <dc:creator><![CDATA[admin]]></dc:creator>\
                                <description></description>\
                                <content:encoded><![CDATA['+item.template.template+']]></content:encoded>\
                                <excerpt:encoded><![CDATA[]]></excerpt:encoded>\
                                <wp:post_date><![CDATA['+d2+']]></wp:post_date>\
                                <wp:post_date_gmt><![CDATA['+d2+']]></wp:post_date_gmt>\
                                <wp:comment_status><![CDATA[open]]></wp:comment_status>\
                                <wp:ping_status><![CDATA[open]]></wp:ping_status>\
                                <wp:status><![CDATA[publish]]></wp:status>\
                                <wp:post_type><![CDATA[post]]></wp:post_type>\
                                <category domain="category" nicename="cc"><![CDATA[CC]]></category>\
                            </item>\
                            '
            })
        }
        xml = xml+'</channel>\
                    </rss>\
                '
        return callback(xml)
    }
    this.gen = function(req,res){
        const max = parseInt(req.body.max)*1000
        const min = parseInt(req.body.min)*1000
        const mainkeyword = req.body.mainkeyword
        const subkeywords = req.body.subkeywords.replace("\r","").split("\n")
        const hoplink = req.body.hoplink
        const codename = req.body.codename
        const time = { min : min, max : max }
        const template = f.findTemp(codename,function(template){
                const data = {
                    mainkeyword : mainkeyword,
                    subkeyword : null,
                    hoplink : hoplink,
                    template : template
                }
                genxml(data,subkeywords,time,function(xml){
                    fs.writeFile("file/wp.xml",xml,function(err){
                        console.log("Complete")
                    })
                })
            }
        )
    }
    this.render = function(req,res){
        f.selectTemp(function(template){
            const data = { template : template }
            res.render("generate/index",data)
        })
    }
}
