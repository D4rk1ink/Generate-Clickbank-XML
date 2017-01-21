import app from "./config/express"
app.listen(process.env.PORT || 7777 , ()=>{
    console.log("[+] Start Server")
})
