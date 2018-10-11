module.exports = (sequelize, DataTypes) => {
    const Listing = sequelize.define('Listing', {
        price: DataTypes.INTEGER,
        picture: DataTypes.STRING,
        city: DataTypes.STRING,
        MLS_Num: DataTypes.STRING,
        address: DataTypes.STRING,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT,
        Bed: DataTypes.DOUBLE,
        Bath: DataTypes.DOUBLE,
        CarSpace: DataTypes.DOUBLE
    })
    return Listing
}

