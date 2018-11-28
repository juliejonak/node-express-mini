const express = require('express');
const db = require('./data/db');

const server = express();
const PORT = 4000;

//endpoints

server.get('/api/users', (req, res) => {
    db.find()
        .then((users)=>{
            res.json(users);
        })
        .catch(err => {
            res
            .status(500)
            .json({message: "failed to retrieve users"})
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user => {
            if(user) {
                res.json(user);
            } else{
                res
                .status(404)
                .json({message: "user does not exist"})
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({message: "failed to find that user"})
        })
})


//listening

server.listen(PORT, () => {
    console.log(`server GO, port ${PORT}`)
});

