const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const http = require('http');
const user = require('./UserData.json')
// console.log(user);


app.use(cors());
app.use(express.json());
// console.log(user);

app.get('/', (req, res) => {
    // const User = JSON.parse(user);
    res.json("hello world")
});
app.get('/user/all', (req, res) => {
    // const User = JSON.parse(user);
    res.json(user)
});
app.get('/user/random', (req, res) => {
    const randomNumber = Math.floor(Math.random() * user.length) + 1;
    const randomUser = user.find(ran => ran.id == randomNumber);
    console.log(randomUser)
    res.json(randomUser)
});
app.post('/user/save', (req, res) => {
    const newUser = req.body;
    const userInput = Object.keys(newUser);
    console.log(user)
    const MyArray = ['id', 'gender', 'name', 'contact', 'address', 'photoUrl'];
    // console.log("mYArray", MyArray);
    if (JSON.stringify(userInput) === JSON.stringify(MyArray)) {
        user.push(newUser);
        res.send(user);
    } else {
        res.send("Please put all fields")
    }
});



app.listen(port, () => {
    console.log("listening to", port);
})