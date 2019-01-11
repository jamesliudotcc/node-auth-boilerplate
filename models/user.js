'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: { msg: 'Hey, give me a valid email address!' } },
      },
      password: {
        type: DataTypes.STRING,
        len: {
          args: [8, 32],
          msg: 'Your password must be between 8 and 32 characters in length',
        },
      },
      username: DataTypes.STRING,
      dob: DataTypes.DATE,
      bio: DataTypes.TEXT,
      admin: DataTypes.BOOLEAN,
      image: {
        type: DataTypes.TEXT,
        validate: { isUrl: { msg: 'Aww, no pic? :(' } },
      },
    },
    {
      hooks: {
        beforeCreate: function(pendingUser) {
          if (pendingUser) {
            const hash = bcrypt.hashSync(pendingUser.password, 12);
            pendingUser.password = hash;
          }
        },
      },
    }
  );
  user.associate = function(models) {
    // associations can be defined here
  };

  user.prototype.validPassword = function(typedPassword) {
    return bcrypt.compareSync(typedPassword, this.password);
  };
  return user;
};
