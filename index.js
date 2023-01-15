const express = require("express");
const getConnection = require("./getconnection");
const loginR = require("./route/login");
const userR = require("./route/user");
const postR = require("./route/post");
const secret = "RESTAPI";
const jwt = require('jsonwebtoken');

getConnection();
const app = express();

app.use("/posts", (req, res, next) => {
    console.log("Hello");
    const token = req.headers.authorization?.split("Bearer ")[1];
    console.log(token);
    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    status: "Failed  !!",
                    message: "not valid Token"
                });
            }
            console.log("Hello I am here");
            req.user = decoded.data;
            next();
        });

    } else {
        res.status(403).json({
            status: "Failed",
            message: "User is not authenticated"
        })
    }
})

app.use(userR);
app.use(loginR);
app.use(postR);

app.get("*", (req, res) => {
    res.status(404).send("API IS NOT FOUND");
})


app.listen(3000, () => console.log("running at port 3000"));