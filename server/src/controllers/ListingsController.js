const { Listing } = require('../models')

module.exports = {
  async individualListing(req, res) {
    try {
      const { MLS_Num } = req.body
      const listing = await Listing.findOne({
        where: {
          MLS_Num: MLS_Num
        }
      })
      res.send(listing)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the listings'
      })
    }
  },
  async index(req, res) {
    try {
      const listings = await Listing.findAll({
        //attributes: ['id', 'longitude', 'latitude']
      })
      res.send(listings)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the listings'
      })
    }
  },
  async filter(req, res) {
    try {
      const { whereStatement, sort } = req.body
      const listings = await Listing.findAll({
        attributes: ['id', 'longitude', 'latitude'],
        where: whereStatement,
        order: [sort]
      })
      const ids = listings.map(x => x['id'])
      // const grid = await Listing.findAll({
      //   limit: cardPerGrid,
      //   offset: page * cardPerGrid - cardPerGrid,
      //   //where: {
      //   //id: listings.map(x => x['id'])
      //   where: whereStatement,
      //   order: sort
      //   //}
      // })
      res.send({ ids, listings })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the listings'
      })
    }
  },
  async gridView(req, res) {
    try {
      const { listingId, page, cardPerGrid } = req.body
      const listings = await Listing.findAll({
        limit: cardPerGrid,
        offset: page * cardPerGrid - cardPerGrid,
        where: {
          id: listingId
        },
        order: [[['price', 'DESC']]]
      })
      res.send(listings)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the grid'
      })
    }
  }
}
