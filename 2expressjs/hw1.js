const express = require('express');
const solve24game = require('24game-solver/dist/24game-solver');

const app = express();
app.use(express.json());

app.get('/Apex', (req, res) => {     
    let numB1 = Number(req.query.b1);     
    let numB2 = Number(req.query.b2);     
    let numB3 = Number(req.query.b3);     
    let numB4 = Number(req.query.b4);     
    if (numB1 >= 1 && numB1 <= 9 &&         
        numB2 >= 1 && numB2 <= 9 &&         
        numB3 >= 1 && numB3 <= 9 &&         
        numB4 >= 1 && numB4 <= 9     ) {         
                
            const result = solve24game([numB1, numB2, numB3, numB4], 24);         
                
            
                if (result.length == 0) {             
                    res.send('Fail');         
                } else {             
                        res.send('Success' + '\n' + result);         
                    }     
                    
                    } 
                        else {         
                              
                            res.status(403).send('Forbidden');     }  })
app.listen(3500 , () => {
    console.log('Listening on port: 3500');
});


