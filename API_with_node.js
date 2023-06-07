const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res) => {

    const url = req.url
    const method = req.method

    console.log(url,method)

    if (url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>RESPONSE</title></head>')
        res.write('<body><form action = "/message" method = "POST"><input type = "text" name = "fname"><input type = "text" name = "lname"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end()
    }

    if (url === '/message' && method === "POST"){
        const body = []
        req.on('data',(chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
        return req.on('end',() => {
            const parsedbody = Buffer.concat(body).toString()
            const message = parsedbody.split('=')[1]
            console.log(parsedbody)
            fs.writeFile("message.txt",message, err => {
                res.statusCode = 302
                res.setHeader("Location" ,"/")
                return res.end()
            }) 
            //or fs.writeFileSync('message.txt',message)
            //fs.writeFileSync will wait for file to get created and blocks execution there after creating file it will move execution to next line
        })
    }
})

server.listen(3000)