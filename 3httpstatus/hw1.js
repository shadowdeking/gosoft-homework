const express = require('express');

const app = express();
app.use(express.json());

app.listen(3 , () => {
    console.log('Listening on port: 3700');
});

const userList = []

let Rname;
let Nname;
let Id;
let Position;
let Phone;
let Email;

app.get('/getList', (req, res) => {
    res.send({ userList });
});

app.put('/UpDatedata', (req, res) => {
    let UpDateID = req.body.UpDateID;


    Rname = req.body.Rname;
    Nname = req.body.Nname;
    Id = req.body.Id;
    Position = req.body.Position;
    Phone = req.body.Phone;
    Email = req.body.Email;

    for (let i = 0; i < userList.length; i++) {
        if (Email === userList[i].Email || Phone === userList[i].Phone) {
            return res.status(400).send("Bad Request");
        }
        if (UpDateID == userList[i].Id) {
            userList.splice(i, 1, {
                Rname: Rname,
                Nname: Nname,
                Id: Id,
                Position: Position,
                Phone: Phone,
                Email: Email
            });
            return res.send('update success');
        }
    }
    return res.status(400).send("Bad Request");

});

app.post('/AddN', (req, res) => {
    Rname = req.body.Rname;
    Nname = req.body.Nname;
    Id = req.body.Id;
    Position = req.body.Position;
    Phone = req.body.Phone;
    Email = req.body.Email;
    for (let i = 0; i < userList.length; i++) {

        if (Id === userList[i].id || Email === userList[i].Email || Phone === userList[i].Phone) {
            return res.status(400).send("Bad Request");
        }
    }
    userList.push({
        Rname: Rname,
        Nname: Nname,
        Id: Id,
        Position: Position,
        Phone: Phone,
        Email: Email
    })

 
    return res.send("Add datasuccess");
});

app.delete('/Dlete', (req, res) => {

    Id = req.body.Id;
    for (let i = 0; i < userList.length; i++) {

        if (Id == userList[i].Id) {
            userList.splice(i, 1);
            return res.send('delete success');
        }
    }
    return res.status(400).send("Bad Request");


});