const services = require("../../service/index")
const getAllMatches = async(req,res)=>{
    try {
        const matches = await services.matchServices.getAllMatchesService();
        if(matches.success){
            res.status(matches.status).json({type:true, message:matches.message, data:matches.data})
        }else{
            res.status(matches.status).json({type:false, message:matches.message})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({type:false, message:"Got into error while fetching all matches"})
    }
}

const matchControllers = {
    getAllMatches
}
module.exports = matchControllers;