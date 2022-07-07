const User = require("../models/user")

const userGetController =async (req,res) =>{
    const {userId} = req.params

    try {

        const user = await User.findOne({_id:userId})

        if(!user){
            res.status(404).json({message:"user not Found"})
            return
        }

       res.status(200).json({user})
       return;
        
    } catch (error) {
        res.status(500).json(error)
        return
    }

    

}

module.exports = {
    userGetController
}