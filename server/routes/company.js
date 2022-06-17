const { Router } = require('express');
const router = Router();
const Company = require('../models/company');

router.post("/add", async (req, res)=>{
    console.log(req.body)
    // cause we using same name of model key on frontend
    // hence in here we can using req.body directly
    await new Company(req.body)
        .save()
        .then((Message)=>{
            console.log("New Company Created.")
            res.sendStatus(200)
        })
})

router.get("/getCompanyData", async(req, res) => {
    console.log("get company data")
    await Company.find({}).sort({'date':-1})
        .then((companydata) => {
            console.log(companydata)
            res.send(companydata)
        })
})

module.exports = router;
