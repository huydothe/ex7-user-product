const http = require('http');
const url = require('url');
const fs = require('fs');

let handler = {};



handler.products = function (req,res){
    fs.readFile('./view/products.html','utf-8',function (err,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        return res.end();
    })
}

handler.users = function (req,res){
    fs.readFile('./view/users.html','utf-8',function (err,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        return res.end();
    })
}

handler.notfound = function (req,res){
    fs.readFile('./view/notfound.html','utf-8',function (err,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        return res.end();
    })
}

let router = {
    'users' : handler.users,
    'products' : handler.products
}

let server = http.createServer((req, res)=>{

    let parseUrl = url.parse(req.url,true);

    let path = parseUrl.pathname;

    let trimPath = path.replace(/^\/+|\/+$/g, '');

    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handler.notfound;
    chosenHandler(req, res);
});

server.listen(3000,()=>{
    console.log(`Server is running at http://localhost:3000`)
})