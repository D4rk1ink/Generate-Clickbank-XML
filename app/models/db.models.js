import mysql from "mysql"

let conn = mysql.createConnection({
    host : localhost:8080,
    user : "root",
    password : "",
    database : "clickbank"
})
conn.connection()
let data = {
                template : [
                            {
                                name : "clickbank",
                                codename : "sdgucsudzxcnb",
                                header : "##mainkeyword##",
                                template : "<h1>clickbank</h1>",
                                button : "button_1"
                            },
                            {
                                name : "amazon",
                                codename : "styucnhxzxxzs",
                                header : "",
                                template : "<h1>amazon</h1>",
                                button : "button_1"
                            }
                        ]

            }

module.exports = data
