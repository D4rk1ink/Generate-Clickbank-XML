const token = {
    mainkeyword : "##mainkeyword##",
    subkeyword : "##subkeyword##",
    hoplink : "##hoplink##",
    button : "##button##"
}

module.exports = new function(){
    this.gen = function(data,spintext,callback){
        const button = "/button/"+data.template.button+".png"
        let template = data.template.template
        let header = data.template.header
        spintext(header,function(text){ header = text })
        spintext(template,function(text){ template = text })
        template = template.replace(token.mainkeyword , data.mainkeyword)
        template = template.replace(token.subkeyword , data.subkeyword)
        template = template.replace(token.hoplink , data.hoplink)
        template = template.replace(token.button , button)
        header = header.replace(token.mainkeyword , data.mainkeyword)
        header = header.replace(token.subkeyword , data.subkeyword)
        data = {
            template : {
                header : header,
                template : template
            }
        }
        return callback(data)
    }
    this.spintext = function(data,callback){
        data = data.replace("{}","")
        while (true){
            const filter = /\{[^{}]*\}/gmi //filter { }
            const found = data.match(filter)
            if(found === null){ break }
            const remove = /[^{}]*[^{}]/gmi;  //remove {}
            for (let i = 0; i < found.length; i++) {
                let text = found[i].match(remove)[0];
                let items = text.split("|");
                let item = items[Math.floor(Math.random()*items.length)];
                data = data.replace(found[i],item);
            }
        }
        return callback(data)
    }
}
