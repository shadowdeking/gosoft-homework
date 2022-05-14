const express = require('express');
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')

const codesecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjUyNTIwNTgzfQ.cQoPQGxyv640VPAJIUtrpAMgsqxYoLK9hFJ5Itouw_k"

const sqlpool = mysql.createPool({
    namedPlaceholders: true,
    charset: 'utf8',
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "oaut",
})


const app = express();
app.use(express.json());

app.use((req, response, next)=>{
    if(req.path == "/login") return next()

    const authheader = req.headers.authorization

    if(!authheader) return response.json({msg: "error unauthorize"})

    jwt.verify(authheader.split(' ')[1], codesecret, (err, result) => {
        if (err) {
            return response.json({msg: "error unauthorize"})
        }
        next()
    })
})

app.post('/login', (req, response) => {
    if (req.body.user == "admin" && req.body.pass == "1234") {
        const token = jwt.sign({ username: "admin" }, codesecret)
        return response.json({token})
    }
    return response.status(400).send("error invalId data");
})

app.get('/getDataEmp', (req, response) => {
    const sql = 'select * from employee'
    sqlpool.query(sql, (err, result) => {
        if(err) {
            return response.status(400).json(err)
        }
        return response.json({ data: result })
    })
})

app.post('/createDataEmp', (req, response) => {
    if(
        !req.body.Firstname ||
        !req.body.Lastname ||
        !req.body.Id ||
        !req.body.Pos ||
        !req.body.Tel ||
        !req.body.Email
        ) {
        return response.status(400).send("error invalId data");
    }

    const sql = 'insert into employee value (:Firstname, :Lastname, :Id, :Pos, :Tel, :Email)'
    sqlpool.query(sql, {
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Id: req.body.Id,
        Pos: req.body.Pos,
        Tel: req.body.Tel,
        Email: req.body.Email
    }, (err, result) => {
        if(err) {
            return response.status(400).json(err)
        }
        return response.json({ data: "ok" })
    })
})

app.put('/updateDataEmp', (req, response) => {
    if(
        !req.body.Id ||
        !req.body.Pos ||
        !req.body.Tel ||
        !req.body.Email
        ) {
        return response.status(400).send("error invalId data");
    }
    
    const sql = 'update employee set Pos = :Pos, Tel = :Tel, Email = :Email where Id = :Id'
    sqlpool.query(sql, {
        Id: req.body.Id,
        Pos: req.body.Pos,
        Tel: req.body.Tel,
        Email: req.body.Email
    }, (err, result) => {
        if(err) {
            return response.status(400).json(err)
        }
        if(result.affectedRows == 0) return response.status(400).json({data: "employee not found"})
        return response.json({ data: "ok" })
    })
})

app.delete('/deleteDataEmp', (req, response) => {
    if(!req.body.Id) return response.status(400).send("error invalId data");
    
    const sql = 'delete from employee where Id = :Id'
    sqlpool.query(sql, {
        Id: req.body.Id
    }, (err, result) => {
        if(err) {
            return response.status(400).json(err)
        }
        if(result.affectedRows == 0) return response.status(400).json({data: "employee not found"})
        return response.json({ data: "ok" })
    })
})

app.listen(3000 , () => {
    console.log(`Listening on port: 3000`);
});
