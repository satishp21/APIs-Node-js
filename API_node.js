// // the below given code stores the incoming data from form into message.txt file

// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req,res) => {

//     const url = req.url
//     const method = req.method

//     console.log(url,method)

//     if (url === '/'){
//         res.setHeader('Content-Type', 'text/html');
//         res.write('<html>')
//         res.write('<head><title>RESPONSE</title></head>')
//         res.write('<body><form action = "/message" method = "POST"><input type = "text" name = "fname"><input type = "text" name = "lname"><button type="submit">Send</button></form></body>')
//         res.write('</html>')
//         return res.end()
//     }

//     if (url === '/message' && method === "POST"){
//         const body = []
//         req.on('data',(chunk) => {
//             console.log(chunk)
//             body.push(chunk)
//         })
//         return req.on('end',() => {
//             const parsedbody = Buffer.concat(body).toString()
//             const message = parsedbody.split('&')[0] +" & "+ parsedbody.split('&')[1] + ' id ' + Math.random()

//             console.log(parsedbody,"this is parsed body")
//             console.log(message,"this is message")
//             fs.writeFile("message.txt",message, {flag : "a" }, err => {
//                 if (err) {
//                     console.error('Error writing to text file:', err);
//                 }
//                 res.statusCode = 302
//                 res.setHeader("Location" ,"/")
//                 return res.end()
//             })
//             //or fs.writeFileSync('message.txt',message)
//             //fs.writeFileSync will wait for file to get created and blocks execution there after creating file it will move execution to next line
//         })
//     }
// })

// server.listen(3000)


// below given code will store the data(which is comming from form) in JSON file.

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  console.log(url, method);

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>RESPONSE</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="fname"><input type="text" name="lname"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
        const parsedbody = Buffer.concat(body).toString();
        const firstName = parsedbody.split('&')[0].split('=')[1];
        const lastName = parsedbody.split('&')[1].split('=')[1];
        const userobj = {
            id: Math.random(),
            firstName,
            lastName,
        };
        console.log(parsedbody, 'this is parsed body');
        console.log(userobj, 'this is message');

        fs.readFile('name.json', (err, data) => {
            let users = []
            if (data) {
                users = JSON.parse(data)
            }
            users.push(userobj);
            console.log(users,"userddddddddddssssssss")
            fs.writeFile('name.json', JSON.stringify(users),(err) => {
                if (err) {
                    console.error('Error writing to JSON file:', err);
                }
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    });
  }
});

server.listen(3000);
