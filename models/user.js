const { DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');

const sequelize = require('../config/dbConfig');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'name field is required.',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'email field is required.',
      },
      isEmail: {
        msg: 'Invalid email address.',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'password field is required.',
      },
    },
  },
  is_paid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  image: {
    type: DataTypes.TEXT, 
    allowNull: true, 
  },
}, {
  tableName: 'users', // Specify the table name explicitly
});

// Hash the password before saving the user
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hashSync(user.password, 10);
  user.password = hashedPassword;
});

// Hash the password before saving the user
// User.beforeUpdate(async (user) => {
//   if (user.changed('password')) {
//     const hashedPassword = await bcrypt.hashSync(user.password, 10);
//     user.password = hashedPassword;
//   }
// });

module.exports = User;
