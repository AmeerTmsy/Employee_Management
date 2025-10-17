const PublicHoliday = require("../models/publicLeaveModel");


const getAllPublicHoliday = async (req, res) => {
    try {
        const publicHolidays = await PublicHoliday.find({});
        console.log("publicHolidays: ", publicHolidays);

        return res.status(200).json({
            success: true,
            message: "Successfully",
            publicHolidays,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error while retriveing public holidays, error${error}`,
        })
    }
}
const getPublicHolidayById = async (req, res) => {
    try {
        const { id } = req.params
        const publicHoliday = await PublicHoliday.findById({ _id: id }).exec();
        console.log("publicHoliday: ", publicHoliday);

        if (!publicHoliday) return res.status(404).json({
            success: false,
            message: `Holiday is not found with the _id: ${id}`,
        })
        return res.status(200).json({
            success: true,
            message: "Successfully",
            publicHoliday,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error while retriveing public holiday with the _id: ${id}, error${error}`,
        })
    }
}

const createPublicHoliday = async (req, res) => {
    try {
        const {name, description, date} = req.body
        const data = { name, description, date: new Date(date)}
        const newPubulicHoliday = new PublicHoliday(data)
        newPubulicHoliday.save();

        return res.status(200).json({
            success: true,
            message: 'Successfully created new holiday',
            newPubulicHoliday
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: `Error while creating holiday, error${err}`,
        })
    }
}

const updatePublicHoliday = async (req, res) => {
    try {
        const { id } = req.params
        const updatedPublicHoliday = await PublicHoliday.findOneAndUpdate({ _id: id }, req.body, { new: true })
        return res.status(200).json({
            success: true,
            message: 'Successfully updated',
            updatedPublicHoliday
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: `Error while updating holiday, error${err}`,
        })
    }
}
const deletePublicHoliday = async (req, res) => {
    try {
        const { id } = req.params
        const deleletedPublicHoliday = await PublicHoliday.deleteOne({_id: id})
        return res.status(200).json({
            success: true,
            message: 'Successfully deleted',
            deleletedPublicHoliday
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: `Error while deleting holiday, error${err}`,
        })
    }
}


module.exports = {
    getAllPublicHoliday,
    getPublicHolidayById,
    createPublicHoliday,
    updatePublicHoliday,
    deletePublicHoliday
}