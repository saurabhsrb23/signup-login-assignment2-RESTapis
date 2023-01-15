const express = require("express");
const User = require("./user");
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json());

router.post("/", async (req, res) => {

    try{
        const user = await User.create(req.body);
        res.status(201).json({
            status: "Success",
            user
        })
    }catch(e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }

});


router.get("/", async (req, res) => {

    try{
        const users = await User.find();
        
        res.status(200).json({
            status: "Success",
            users
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

router.get("/:id", async (req, res) => {

    try{
        const user = await User.find({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            user
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});



router.put("/:id", async (req, res) => {

    try{
        await User.updateOne({_id : req.params.id}, req.body);
        const user =  await User.findOne({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            user
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});


router.delete("/:id", async (req, res) => {
    try{
        const user = await User.deleteOne({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            user
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

module.exports = router;