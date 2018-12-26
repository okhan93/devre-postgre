const { UserActivity } = require('../models')

module.exports = {
  async getUserActivity(req, res) {
    try {
      const { User_ID, Activity_Type } = req.body
      const userActivity = await UserActivity.findAll({
        where: {
          User_ID: User_ID,
          Activity_Type: Activity_Type
        }
      })
      res.send(userActivity)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to fetch the listings'
      })
    }
  },
  async addActivity(req, res) {
    try {
      const { User_ID, MLS_Num, Activity_Type } = req.body
      const userActivity = await UserActivity.create(req.body)
      res.send(userActivity)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to add Log'
      })
    }
  },
  async removeActivity(req, res) {
    try {
      const { User_ID, MLS_Num, Activity_Type } = req.body
      await UserActivity.destroy({
        where: {
          User_ID: User_ID,
          MLS_Num: MLS_Num,
          Activity_Type: Activity_Type
        }
      })
      res.send('Bookmark Removed')
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to remove Log'
      })
    }
  }
}
