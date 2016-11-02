'use strict';
const bcrypt = require('bcrypt')

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    fullName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    },
    job: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Must be a valid profession'
        }
      }
    }
  },  {
    hooks: {
      beforeCreate: function(createdUser, options, cb) {
        var hash = bcrypt.hashSync(createdUser.password, 10);
        createdUser.password = hash;
        cb(null, createdUser);
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.idea);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
      toJSON: function() {
        var jsonUser = this.get();
        delete jsonUser.password;
        return jsonUser;
      }
    }
  });
  return user;
};
