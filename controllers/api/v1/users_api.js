const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async (req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email})
        if(!user || user.password != req.body.password){
            res.json(422,{
                message:"Invalid username/password"
            })
        }
        return res.json(200,{
            message:'Sign in successful',
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:10000000})
            }
        })

    } catch (error) {
        return res.json(500,{
            message:"Internal Server Error"
        })
    }
}