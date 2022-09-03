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
    const randomNumber = Math.floor(Math.random() * user.length)+1;
    const randomUser = user.find(ran => ran.id == randomNumber);
    console.log(randomUser)
    res.json(randomUser)
});
// http.createServer((function (req, res) {
//     res.send(200, { "Content-Type: 'application/json"})
//     res.end();
// })).listen(port)

// useage of route


app.listen(port, () => {
    console.log("listening to", port);
})