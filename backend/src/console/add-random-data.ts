import { sequelize } from '../utilities/database'
import moment from 'moment-timezone'

import { Brand } from '../repo/Brand';
import { Order } from '../repo/Order';
import { Retailer } from '../repo/Retailer';

const main = async () => {

  // an array representing the brands we are going to have
  const brandsArray = [
    { name: 'Our Brand', location: "Reading", price: 6, variant: 5, threshold: 0.35 },
    { name: 'Coke', location: "London", price: 7, variant: 4, threshold: 0.45 },
    { name: 'Pepzz', location: "Birmingham", price: 5, variant: 3, threshold: 0.55 },
    { name: 'TaFan', location: "Manchester", price: 5, variant: 2, threshold: 0.65 },
    { name: 'SolveDrink', location: "Liverpool", price: 5, variant: 1, threshold: 0.75 },
  ]

  // an array representing the retailers we are going to have
  // "base, variant" are for the package amount
  const retailersArray = [
    { name: 'Aldi', phone: '+44 0123 4567890', base: 60, variant: 25, },
    { name: 'Asda', phone: '+44 0123 4567890', base: 40, variant: 15, },
    { name: 'Lidl', phone: '+44 0123 4567890', base: 30, variant: 10, },
    { name: 'M&S', phone: '+44 0123 4567890', base: 60, variant: 25, },
    { name: 'Morrisons', phone: '+44 0123 4567890', base: 70, variant: 30, },
    { name: 'Sainsburys', phone: '+44 0123 4567890', base: 70, variant: 30, },
    { name: 'Waitrose', phone: '+44 0123 4567890', base: 70, variant: 30, },
  ]

  // A JSON to store the criteria to create some order records
  const orderCriteria = {
    monthsBefore: 6, monthsAfter: 6
  }

  try {
    console.log('Begin - Connecting to Database');
    const testConnection = async () => {
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }
    await testConnection()
    console.log('Finish - Connecting to Database');

    console.log('Begin - Setting up database association...');
    Order.hasOne(Brand, { as: 'brand', sourceKey: 'brandid', foreignKey: 'id' });
    Order.hasOne(Retailer, { as: 'retailer', sourceKey: 'retailerid', foreignKey: 'id' });
    console.log('Finish - Setting up database association...');

    console.log('Begin - Insert Dummy Data into Table - Brands');
    // Create the records
    for (const brand of brandsArray) {
      await Brand.create({
        name: brand.name,
        location: brand.location
      })
    }
    // Fetch the results
    const brands = await Brand.findAll({ raw: true })
    console.log(brands)
    console.log('Finish - Insert Dummy Data into Table - Brands');

    console.log('Begin - Insert Dummy Data into Table - Retailers');
    // Create the records
    for (const retailer of retailersArray) {
      await Retailer.create({
        name: retailer.name,
        phone: retailer.phone
      })
    }
    // Fetch the results
    const retailers = await Retailer.findAll({ raw: true })
    console.log(retailers)
    console.log('Finish - Insert Dummy Data into Table - Retailers');

    console.log('Begin - Insert Dummy Data into Table - Orders');
    // Create the records
    const start = moment()?.startOf('day')?.subtract(orderCriteria?.monthsBefore, 'month')
    const duration = orderCriteria?.monthsBefore + orderCriteria?.monthsAfter

    for (let i = 0; i < duration; i++) {
      const dateValue = start?.add(i, 'month')
      for (const retailer of retailersArray) {
        const r = await Retailer.findOne({ where: { name: retailer.name } })
        for (const brand of brandsArray) {
          const willGoOn = Math.random() >= brand?.threshold
          if (willGoOn) {
            const b = await Brand.findOne({ where: { name: brand.name } })
            if (!b) { throw Error(`Brand Not Found. name of brand : ${brand.name}`) }
            if (!r) { throw Error(`Retailer Not Found. name of retailer : ${retailer.name}`) }
            await Order.create({
              brandid: b.id,
              retailerid: r.id,
              date: dateValue?.toDate(),
              price: brand?.price + Math.random() * brand?.variant,
              packages: retailer?.base + (Math.ceil(Math.random() * retailer?.variant)),
            })
          } else {
            console.log("Skipped this time")
          }
        }
      }
    }
    // Fetch the length of results, and the first record
    const orders = await Order.findAll({ raw: true })
    console.log(orders?.length)
    console.log(orders?.[0])
    console.log('Finish - Insert Dummy Data into Table - Orders');
  }
  catch (error) {
    console.log(error?.message)
  }
}

main()