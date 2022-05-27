const { Router } = require('express');
const router = Router();

router.get("/test", (req, res)=>{
    res.send('this is GET')
})

router.post("/test", (req, res)=>{
    console.log(req.body)
    res.send(`receive ${req.body.name}`)
})

router.put("/test", (req, res)=>{
    res.send('this is put')
})

router.delete("/test", (req, res)=>{
    res.send('this is delete')
})

module.exports = router;
