const http = require('http');

http.createServer((req, res)=>{
    res.write("Thantup Keen " + Date());
    res.end();
}).listen(2337);
