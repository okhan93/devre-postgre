const { Listing } = require('../models')


module.exports = {
    async index (req, res) {
        try {
            const listings = await Listing.findAll({
                limit: 30
            })
            res.send(listings)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to fetch the listings'
            })
        }
    },
    async filter (req, res) {
        console.log(req.body)
        try {
            const { whereStatement, sort } = req.body

            const listings = await Listing.findAll({
                limit: 30,
                where: whereStatement,
                order: sort
            })

            res.send(listings)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to fetch the songs'
            })
        }
    }
}
