module.exports = (sequelize, DataTypes) => {

  const UserActivity = sequelize.define('UserActivity', {

    User_ID: DataTypes.INTEGER,
    MLS_Num: DataTypes.STRING,
    Activity_Type: DataTypes.INTEGER

  })

  return UserActivity
}
