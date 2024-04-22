import { Sequelize, DATE } from 'sequelize';
import * as config from './config';

// Override timezone formatting
DATE.prototype._stringify = function (date: any, options: any) {
  date = this._applyTimezone(date, options);

  // Z here means current timezone, _not_ UTC
  // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
  return date.format('YYYY-MM-DD HH:mm:ss');
};

// For Local Dev
// const sequelize = new Sequelize(
//   config.DB_DB,
//   config.DB_USER,
//   config.DB_PASSWORD,
//   {
//     dialect: 'postgres',
//     host: config.DB_SERVER,
//     port: config.DB_PORT,
//     define: {
//       "createdAt": "createdat",
//       "updatedAt": "updatedat"
//     },
//     logging: (msg) => console.log(msg),
//   },
// );

const sequelize = new Sequelize(
  config.DB_URL,
  {
    dialect: 'postgres',
    define: {
      "createdAt": "createdat",
      "updatedAt": "updatedat",
    },
    logging: (msg) => console.log(msg),
  }
);

export { sequelize };