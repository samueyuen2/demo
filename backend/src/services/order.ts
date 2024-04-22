import { Op, WhereOptions, WhereAttributeHash, } from "sequelize";

import { ApiError } from "../models/error";
import { OrderSummary } from "../models/model";

import { Brand } from "../repo/Brand";
import { Order, OrderAttributes } from "../repo/Order";
import { Retailer } from "../repo/Retailer";

async function search(filter: {
  id?: string,
  brandid?: string,
  retailerid?: string,
  date?: Date,
  price?: number,
  packages?: number,
}): Promise<OrderSummary[]> {
  const whereOptions: WhereOptions<OrderAttributes> = {};

  if (!!filter?.id) { whereOptions.id = filter.id; }
  if (!!filter?.brandid) { whereOptions.brandid = filter.brandid; }
  if (!!filter?.retailerid) { whereOptions.retailerid = filter.retailerid; }
  if (!!filter?.date) { whereOptions.date = filter.date; }
  if (!!filter?.price) { whereOptions.price = filter.price; }
  if (!!filter?.packages) { whereOptions.packages = filter.packages; }

  const orders = await Order.findAll({
    where: { [Op.and]: [whereOptions], } as WhereAttributeHash,
    include: [{
      model: Brand,
      as: 'brand'
    }, {
      model: Retailer,
      as: 'retailer'
    }]
  });

  return orders.map((order) => {
    return {
      id: order.id,
      brandid: order.brandid,
      retailerid: order.retailerid,
      date: order.date,
      price: order.price,
      packages: order.packages,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      brand: order.brand,
      retailer: order.retailer,
    };
  });
}

async function create(brandid: string, retailerid: string, date: Date, price: number, packages: number): Promise<OrderSummary> {
  const order = await Order.create({ brandid, retailerid, date, price, packages });
  return order.get();
}

async function modify(id: string, brandid: string, retailerid: string, date: Date, price: number, packages: number): Promise<OrderSummary> {
  const order = await Order.findOne({ where: { id } });
  if (!order) { throw new ApiError(`Order not found!`); }

  order.brandid = brandid;
  order.retailerid = retailerid;
  order.date = date;
  order.price = price;
  order.packages = packages;
  await order.save();
  return order.get();
}

export {
  search,
  create,
  modify,
};