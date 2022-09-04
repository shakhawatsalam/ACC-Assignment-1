const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const http = require('http');
const user = require('./UserData.json');
const { stringify } = require("querystring");
// console.log(user);


app.use(cors());
app.use(express.json());
// console.log(user);

app.get('/', (req, res) => {
    res.json("hello world")
});
// GET /user/all A list of random users
app.get('/user/all', (req, res) => {
    res.json(user)
});

// GET /user/random A random user
app.get('/user/random', (req, res) => {
    const randomNumber = Math.floor(Math.random() * user.length) + 1;
    const randomUser = user.find(ran => ran.id == randomNumber);
    console.log(randomUser)
    res.json(randomUser)
});

// POST /user/save Save a random user
app.post('/user/save', (req, res) => {
    const newUser = req.body;
    const userInput = Object.keys(newUser);
    console.log(user)
    const MyArray = ['id', 'gender', 'name', 'contact', 'address', 'photoUrl'];
    if (JSON.stringify(userInput) === JSON.stringify(MyArray)) {
        user.push(newUser);
        res.send(user);
    } else {
        res.send("Please put all fields")
    }
});

// PATCH /user/update Update a random user

app.patch('/user/update/:id', (req, res) => {
    const { id } = req.params;

    const { _id, gender, name, contact, address, photoUrl } = req.body;
    const updateUser = user.find(upda => upda.id == id);
    console.log(id, req.body.id);
    if (id == req.body.id) {
        updateUser.id = id;
        updateUser.gender = gender;
        updateUser.name = name;
        updateUser.contact = contact;
        updateUser.address = address;
        updateUser.photoUrl = photoUrl;

        res.send(updateUser);
    } else {

        res.json("Id Not Same")
    }
    // res.send("hello world")
    // console.log(presentData.id)
});
// DELETE /user/ delete
app.delete('/user/delete/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    // const deleteUser = user.find(u => u.id == id);
    if (id == req.body.id) {
       const deleteUser = user.filter(u => u.id !== Number(id));
        res.send(deleteUser);
    } else {
        res.send ("Id is not same")
    }
})
//PATCH /user/bulk-update update multiple users
// app.patch('/user/bulk-update', (req, res) => {
//     console.log(req.body);
//     res.json("hello world")
// });

app.listen(port, () => {
    console.log("listening to", port);
})