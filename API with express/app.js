const express = require('express')
const bodyParser= require("body-parser")
const fs = require("fs")
const app = express()

app.use(bodyParser.urlencoded({extended:false}))

app.get("/",(req,res) => {
    fs.readFile('username.txt' ,(err,data) => {
        if (err){
            data ='no chat exists'
        }

        res.send(
            `${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
                <input type="text" id="message" name ="message">
                <input type="hidden" id="username" name ="username">
                </br>
                <button type="submit">Send</buttton>
            </form>`)
    })
})

app.post('/', (req,res) =>{

    console.log(req.body.message,req.body.username)

    fs.writeFile("username.txt",`  ${req.body.username} :${req.body.message}`,{flag:'a'}, (err) =>{
        if (err) {console.log(err)}
        res.redirect("/")
    })
})

app.get("/login",(req,res) =>{

    res.send(`<form action="/" method="GET" onsubmit="localStorage.setItem('username', document.getElementById('username').value)"><input type="text" placeholder="username" id="username" name ="username"><button type="submit">Login</buttton></form>`)

})

app.listen(3000)
