import mysql from "mysql"

module.exports = new function(){
    let conn = null
    const FindTP = "SELECT * FROM template WHERE codename = ?"
    const Select = "SELECT * FROM template"
    const Insert = "INSERT INTO template SET ?"
    const Update = "UPDATE template SET ? WHERE codename = ?"
    const Delete = "DELETE FROM template WHERE codename = ?"

    this.connection = function(){
        conn = mysql.createConnection({
            host : "localhost",
            user : "root",
            password : "",
            database : "clickbank"
        })
        conn.connect(function(err) {
            if(err){
                console.error("Error Connecting: "+err.stack)
                return
            }
        })
    }
    //////////////////////////////////////////////////////////////////
    this.removeTemp = function(codename){
        conn.query(Delete,codename,function(err,result){
            return callback(result[0])
        })
        /*let temp = db.template
        for(let i=0; i < temp.length; i++) {
            if(temp[i].codename == codename)
            {
                temp.splice(i,1)
                break
            }
        }*/
    }
    //////////////////////////////////////////////////////////////////
    this.insertTemp = function(name,codename,header,template,button){
        const data = {
            name : name,
            codename : codename,
            header : header,
            template : template,
            button : button
        }
        conn.query(Insert,data,function(err,result){
        })
        //db.template.push(data)
    }
    //////////////////////////////////////////////////////////////////
    this.selectTemp = function(callback){
        conn.query(Select,function(err,result){
            return callback(result)
        })
        //return db.template
    }
    //////////////////////////////////////////////////////////////////
    this.findTemp = function(codename,callback){
        conn.query(FindTP,codename,function(err,result){
            return callback(result[0])
        })
        /*return callback(
            db.template.find(function(template){
                return template.codename == codename
            })
        )*/
    }
    //////////////////////////////////////////////////////////////////
    this.editTemp = function(name,codename,header,template,button){
        const data = {
            name : name,
            header : header,
            template : template,
            button : button
        }
        conn.query(Update,[data,codename],function(err,result){

        })
        /*let temp = db.template
        for(let i=0; i < temp.length; i++) {
            if(temp[i].codename == codename)
            {
                temp[i].name = name
                temp[i].header = header
                temp[i].template = template
                temp[i].button = button
                break
            }
        }*/
    }
}
