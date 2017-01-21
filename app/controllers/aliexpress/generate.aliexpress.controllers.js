import fs from "fs"
import xml from "xmlbuilder"

module.exports = new function(){
    this.gen = function(req,res){
        const items = req.body.items
        let root = xml.create('root');
        for(let cname in items){
            let category = root.ele("category").att('name', cname)
            for(let iname in items[cname]){
                let item = category.ele("item")
                item.ele("name").text(iname)
                item.ele("url").text("/category/"+items[cname][iname]+"/"+iname)
                item.ele("id").text(items[cname][iname])
            }
        }
        fs.writeFile('aliexpress.xml', root, (err) => {
            if (err) throw err;
            console.log('It\'s saved!');
        });
        res.redirect(req.get('referer'));
        //console.log(root.toString({ pretty: true }))
    }
}
