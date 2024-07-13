'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, name, username, email, profileImg } = this; //context will be the User instance
      return { id, name, username, email, profileImg };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ name, username, email, password, profileImg }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        name,
        username,
        email,
        hashedPassword,
        profileImg,
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    //TODO pending testing 23May2023
    static async update({ name, username, email, profileImg, userId }) {
      await User.update(
        { name, username, email, profileImg },
        { where: { id: userId } }
      );

      return await User.scope('currentUser').findByPk(userId);
    }


    static associate(models) {
      User.hasMany(models.Spot, {
        foreignKey: 'ownerId',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Booking, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Review, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      User.hasOne(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: { imageableType: 'User' },
      });
      User.hasMany(models.WishList, {
        foreignKey: 'ownerId',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 40],
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING(300),
        allowNull: false,
        validate: {
          len: [3, 300],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      profileImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'createdAt', 'updatedAt'],
        },
      },
      scopes: {
        currentUser: {
          attributes: {
            exclude: ['hashedPassword'],
          },
        },
        loginUser: {
          attributes: {},
        },

      },
    }
  );
  return User;
};
