'use strict';
module.exports = function(sequelize, DataTypes) {
  var idea = sequelize.define('idea', {
    userId: DataTypes.INTEGER,
    industry: DataTypes.STRING,
    description: DataTypes.TEXT,
    businessplan: DataTypes.TEXT,
    type: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.idea.belongsTo(models.user, {foreignKey: 'userId', constraints: false});
      }
    }
  });
  return idea;
};
