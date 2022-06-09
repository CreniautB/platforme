module.exports = (sequelize, Datatypes) => {
    const Appli = sequelize.define('Appli', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        title : {
            type: Datatypes.TEXT,
            allowNull: false
        },
        expire : {
            type: Datatypes.DATE,
            allowNull : false
        },
        expireNb : {
            type: Datatypes.INTEGER,
            allowNull : true,
            defaultValue : 99999999
        }
    });

    Appli.associate = (models) => {
        Appli.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }, onDelete: 'CASCADE'
        })
    }
    return Appli;
}