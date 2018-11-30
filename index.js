const express = require('express');
const db = require('./data/db');

const server = express();
const PORT = 4000;

server.use(express.json());

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

server.post('/api/users', (req, res) => {
    const user = req.body;

    if (user.name && user.bio) {
    console.log('user: ', user)
    db.insert(user)
        .then(idInfo => {
            db.findById(idInfo.id).then(user => {
                res.status(201).json(user)
            })
        })
        .catch(err => {
            res
            .status(500)
            .json({message: "failed to add new user"})
        })
    } else {
        res.status(400).json({message: "New user needs both a name and bio"})
    }
})


server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
        .then(count => {
            if (count) {
                res
                //we would ideally like to send back the user
                .json({message: "User was deleted"})
            } else {
                res.status(404).json({message: "Invalid ID"})
            }
        })
        .catch(err => {
        res.status(500).json({message: "Failed to delete this immortal user"})
    })
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const user = req.body;
    if (user.name && user.bio){
        db.update(id, user)
            .then(count => {
                if (count){
                    db.findById(id)
                        .then(user => {
                            res.json(user);
                        })
                } else {
                    res
                        .status(404)
                        .json({message: "Invalid id"});
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'Could not update this indomitable user'});
            })
    } else {
        res.status(400).json({message: "New user needs both a name and bio"})
    }
})


server.get("/search", (req, res) => {
    console.log(req.query);
    res.send(`searching for ${req.query.num} ${req.query.keyword}...`);
});


//listening

server.listen(PORT, () => {
    console.log(`server GO! port ${PORT}`)
});

