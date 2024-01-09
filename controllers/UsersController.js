import User from "../models/User.js";


export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")
    if(!user) {
        return res.status(404).json({message: "user not found"})


    }
     res.status(200).json({user})
}  



