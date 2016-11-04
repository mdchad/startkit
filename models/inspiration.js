'use strict';
module.exports = function(sequelize, DataTypes) {
  var inspiration = sequelize.define('inspiration', {
    userId: DataTypes.INTEGER,
    problem: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        models.inspiration.belongsTo(models.user, {foreignKey: 'userId', constraints: false});
        // associations can be defined here
      }
    }
  });
  return inspiration;
};
