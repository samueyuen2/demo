import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { handleError, logError } from '../routes/middlewares/error';

import toDoItemRouter from '../routes/controllers/api/toDoItem';

import brandRouter from '../routes/controllers/api/brand';
import categoryRouter from '../routes/controllers/api/category';
import manufacturerRouter from '../routes/controllers/api/manufacturer';
import manufacturerBrandRouter from '../routes/controllers/api/manufacturerBrand';
import itemRouter from '../routes/controllers/api/item';
import retailerRouter from '../routes/controllers/api/retailer';
import orderRouter from '../routes/controllers/api/order';

import { Brand } from '../repo/Brand';
import { Category } from '../repo/Category';
import { Item } from '../repo/Item';
import { Manufacturer } from '../repo/Manufacturer';
import { ManufacturerBrand } from '../repo/ManufacturerBrand';
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

expressApp.use(cors({
  origin: [
    "https://demo-wine-psi.vercel.app",
    "https://demo-backend-kappa.vercel.app",
  ]
}))
expressApp.use(express.json({ limit: '50gb' }));
expressApp.use(express.urlencoded({ extended: false }));

// For Previous Version - Vercel Mounting
// console.log('Begin - Setting up database association...');
// Order.hasOne(Brand, { as: 'brand', sourceKey: 'brandid', foreignKey: 'id' });
// Order.hasOne(Retailer, { as: 'retailer', sourceKey: 'retailerid', foreignKey: 'id' });
// console.log('Finish - Setting up database association...');

// For Technical Test - Vercel Mounting
console.log('Begin - Setting up database association...');
Item.hasOne(Retailer, { as: 'retailer', sourceKey: 'retailerid', foreignKey: 'id' });
Item.hasOne(Category, { as: 'category', sourceKey: 'categoryid', foreignKey: 'id' });
Item.hasOne(Manufacturer, { as: 'manufacturer', sourceKey: 'manufacturerid', foreignKey: 'id' });
Item.hasOne(Brand, { as: 'brand', sourceKey: 'brandid', foreignKey: 'id' });
ManufacturerBrand.hasOne(Brand, { as: 'brand', sourceKey: 'brandid', foreignKey: 'id' });
console.log('Finish - Setting up database association...');

// Handle API requests
expressApp.use('/api/toDoItem', toDoItemRouter);
expressApp.use('/api/brand', brandRouter);
expressApp.use('/api/category', categoryRouter);
expressApp.use('/api/manufacturer', manufacturerRouter);
expressApp.use('/api/manufacturerBrand', manufacturerBrandRouter);
expressApp.use('/api/retailer', retailerRouter);
expressApp.use('/api/item', itemRouter);
expressApp.use('/api/order', orderRouter);

// error handler
expressApp.use('/api', handleError);

// error handler
expressApp.use(logError);

export default expressApp;