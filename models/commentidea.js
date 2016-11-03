'use strict';
module.exports = function(sequelize, DataTypes) {
  var commentIdea = sequelize.define('commentIdea', {
    userId: DataTypes.INTEGER,
    ideaId: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.follow.belongsTo(models.user)
        models.follow.belongsTo(models.idea)
      }
    }
  });
  return commentIdea;
};
