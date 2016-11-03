'use strict';
module.exports = function(sequelize, DataTypes) {
  var follow = sequelize.define('follow', {
    userId: DataTypes.INTEGER,
    ideaId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.follow.belongsTo(models.user)
        models.follow.belongsTo(models.idea)
      }
    }
  });
  return follow;
};
