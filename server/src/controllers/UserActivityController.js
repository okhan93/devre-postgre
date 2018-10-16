const { UserActivity } = require('../models')


module.exports = {
    async index (req, res) {
        try {

            const userActivity = await UserActivity.findAll({
            })
            res.send(UserActivity)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to fetch the listings'
            })
        }
    },
    async addActivity (req, res) {
        try {
            const { User_ID, MLS_Num, Activity_Type } = req.body
            const userActivity = await UserActivity.create(req.body)
            res.send(userActivity)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to add Log'
            })
        }
    }
}
