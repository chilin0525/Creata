const { Router } = require('express');
const router = Router();
const User = require('../models/user');

router.put("/update", async (req, res)=>{
    console.log(req.body)
    // console.log(Object.keys(req.body))
    await User.findByIdAndUpdate(
        req.body.userid, req.body
    )
        .then((updatedData) => {
            console.log("Update user profile success")
            console.log(updatedData)
        })
    res.sendStatus(200)
})

module.exports = router;
