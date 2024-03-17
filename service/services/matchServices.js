const models = require("../../model/index")
const getAllMatchesService = async () => {
    try {
        const matches = await models.Match.find();
        if (matches.length > 0) {
            return {
                success: true,
                message: "All matches fetched successfully",
                data: matches,
                status: 200
            }
        } else {
            return {
                success: false,
                message: "No matches found",
                status: 404
            }
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Got into error while fetching all matches",
            status: 500
        }
    }
}
const matchServices = {
    getAllMatchesService
}
module.exports = matchServices;