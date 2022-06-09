module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define('User', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            isEmail: true,
            unique: true,
        },
        pseudo : {
            type: Datatypes.STRING,
            allowNull: false
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false
        },
        role: {
            type: Datatypes.STRING,
            allowNull: false,
            defaultValue: "user"
        }
    });
    User.associate = (models) => {
        User.hasMany(models.Appli)
    };
    return User;
}