const Promise = require('bluebird')
//const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const bcrypt = require('bcrypt')

function hashPassword (user, options) {

  if (!user.changed('password')) {
    return
  }
  const saltRounds = 8;

  return bcrypt.hash(user.password, saltRounds)
    .then(hash => {
      user.password = hash;
    })
    .catch(err => {
      throw new Error();
    });


}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
        // beforeSave: hashPassword
      }
    })

  User.prototype.comparePassword = async function (password) {

    return await bcrypt.compare(password, this.password)

  }

  return User
}
