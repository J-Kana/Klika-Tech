module.exports = (sequelize, DataTypes) => {
    const Music = sequelize.define("music", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration: {
            type: DataTypes.FLOAT
        }
    });

    return Music;
};
