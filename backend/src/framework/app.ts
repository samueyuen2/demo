import express from 'express';
import helmet from 'helmet';

import { handleError, logError } from '../routes/middlewares/error';

import toDoItemRouter from '../routes/controllers/api/toDoItem';

import brandRouter from '../routes/controllers/api/brand';
import orderRouter from '../routes/controllers/api/order';
import retailerRouter from '../routes/controllers/api/retailer';

import { Brand } from '../repo/Brand';
import { Order } from '../repo/Order';
import { Retailer } from '../repo/Retailer';

function initHelmet(app: express.Express) {

  // Customize helmet filters to meet web security scan requirement
  // app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      imgSrc: ["'self'", "data:", "blob:"],
    }
  }));
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());

  // Web Security Scan report suggested not sending setting this header at all
  // app.use(helmet.xssFilter());
}

const expressApp = express();

initHelmet(expressApp);

expressApp.use(express.json({ limit: '50gb' }));
expressApp.use(express.urlencoded({ extended: false }));

console.log('Begin - Setting up database association...');
Order.hasOne(Brand, { as: 'brand', sourceKey: 'brandid', foreignKey: 'id' });
Order.hasOne(Retailer, { as: 'retailer', sourceKey: 'retailerid', foreignKey: 'id' });
console.log('Finish - Setting up database association...');

// Handle API requests
expressApp.use('/api/toDoItem', toDoItemRouter);
expressApp.use('/api/brand', brandRouter);
expressApp.use('/api/order', orderRouter);
expressApp.use('/api/retailer', retailerRouter);

// error handler
expressApp.use('/api', handleError);

// error handler
expressApp.use(logError);

export default expressApp;