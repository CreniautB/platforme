'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "testmig",
    "created": "2021-09-08T17:54:37.214Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Users",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "allowNull": false,
                "unique": true,
                "primaryKey": true
            },
            "email": {
                "type": Sequelize.STRING,
                "field": "email",
                "unique": true,
                "isEmail": true,
                "allowNull": false
            },
            "pseudo": {
                "type": Sequelize.STRING,
                "field": "pseudo",
                "allowNull": false
            },
            "password": {
                "type": Sequelize.STRING,
                "field": "password",
                "allowNull": false
            },
            "role": {
                "type": Sequelize.STRING,
                "field": "role",
                "defaultValue": "user",
                "allowNull": false
            },
            "role2": {
                "type": Sequelize.STRING,
                "field": "role2",
                "defaultValue": "user",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
