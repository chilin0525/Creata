const { Router } = require('express');
const router = Router();
const Message = require('../models/message');
const User = require('../models/user');

router.post("/", (req, res)=>{
    console.log("Hi this is message")
    console.log(req.body.userid)
    console.log(req.body.userid==null)
    const userid = req.body.userid
    if(req.body.userid!=null){
        Message.find({$or:[{'sender_ID':userid}, {'receiver_ID':userid}]}).
            sort({date: "desc"}).
            exec((err, messages) => {
                if(!err) {
                    res.send(messages)
                }
            })
    }
})

async function queryUserFromArray(userArray){
    let resUserInfo = []
    for(let i=0;i<userArray.length;i++){
    // await userArray.forEach(async userid => {
        const userid = userArray[i]
        const tmpUserInfo = await User.find({_id: userid}).then((userinfo)=>{
        // check user exist in DB or not
            let tmpUserInfo = new Object()
            tmpUserInfo.id = userinfo[0]._id
            tmpUserInfo.name = userinfo[0].name
            tmpUserInfo.url = userinfo[0].url
            resUserInfo.push(tmpUserInfo)
            console.log(tmpUserInfo)
        });
    }
    console.log(resUserInfo)
    return resUserInfo;
}

router.post("/userinfo", async(req, res)=>{
    console.log("Hi this is message/userinfo")
    console.log(req.body)

    const resUserInfo = await queryUserFromArray(req.body.user_ids)
    
    console.log(resUserInfo)
    res.send(resUserInfo)
})

// new Message({
//     sender_ID: req.body.userid,
//     receiver_ID: 123,
//     message: "hello world",
// })
//     .save()
//     .then((NewMessage)=>{
//         console.log("New Message Created.")
//     })

module.exports = router;
