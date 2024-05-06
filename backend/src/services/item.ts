import { Op, WhereOptions, WhereAttributeHash, Sequelize, } from "sequelize";
import moment from 'moment-timezone';

import { ApiError } from "../models/error";
import { ItemSummary } from "../models/model";

import { Item, ItemAttributes } from "../repo/Item";
import { Category, CategoryAttributes } from "../repo/Category";
import { Manufacturer, ManufacturerAttributes } from "../repo/Manufacturer";
import { Brand, BrandAttributes } from "../repo/Brand";
import { Retailer, RetailerAttributes } from "../repo/Retailer";

async function search(filter: {
  id?: string,
  start?: Date,
  end?: Date,
  retailerid?: string,
  ean?: string,
  categoryid?: string,
  manufacturerid?: string,
  brandid?: string,
  producttitle?: string,
  image?: string,
  onpromotion?: boolean | null,
  promotiondesc?: string,
  baseprice?: number,
  shelfprice?: number,
  promotedprice?: number,
  categories?: string[] | null,
  manufacturers?: string[] | null,
  brands?: string[] | null,
  retailers?: string[] | null,
  keyword?: string,
}): Promise<ItemSummary[]> {
  const whereOptions: WhereOptions<ItemAttributes> = {};

  if (!!filter?.id) { whereOptions.id = filter.id; }
  if (!!filter?.retailerid) { whereOptions.retailerid = filter.retailerid; }
  if (!!filter?.ean) { whereOptions.ean = filter.ean; }
  if (!!filter?.categoryid) { whereOptions.categoryid = filter.categoryid; }
  if (!!filter?.manufacturerid) { whereOptions.manufacturerid = filter.manufacturerid; }
  if (!!filter?.brandid) { whereOptions.brandid = filter.brandid; }
  if (!!filter?.producttitle) { whereOptions.producttitle = filter.producttitle; }
  if (!!filter?.image) { whereOptions.image = filter.image; }
  if (!!filter?.promotiondesc) { whereOptions.promotiondesc = filter.promotiondesc; }
  if (!!filter?.baseprice) { whereOptions.baseprice = filter.baseprice; }
  if (!!filter?.shelfprice) { whereOptions.shelfprice = filter.shelfprice; }
  if (!!filter?.promotedprice) { whereOptions.promotedprice = filter.promotedprice; }

  const condition: WhereAttributeHash = {
    [Op.and]: [whereOptions],
    date: (!!filter?.start && !!filter?.end) ? {
      [Op.and]: {
        [Op.gte]: moment(filter?.start).format("YYYY-MM-DD"),
        [Op.lte]: moment(filter?.end).format("YYYY-MM-DD"),
      }
    } : {}
  }
  if (filter?.onpromotion !== null &&
    filter?.onpromotion !== undefined) {
    condition.onpromotion = filter?.onpromotion
  }
  if (!!filter?.categories) { condition.categoryid = { [Op.in]: filter?.categories } }
  if (!!filter?.manufacturers) { condition.manufacturerid = { [Op.in]: filter?.manufacturers } }
  if (!!filter?.brands) { condition.brandid = { [Op.in]: filter?.brands } }
  if (!!filter?.retailers) { condition.retailerid = { [Op.in]: filter?.retailers } }
  if (!!filter?.keyword) { condition.producttitle = { [Op.like]: "%" + filter?.keyword + "%" } }

  const items = await Item.findAll({
    where: condition,
    include: [
      {
        model: Category,
        as: 'category'
      },
      {
        model: Manufacturer,
        as: 'manufacturer'
      },
      {
        model: Brand,
        as: 'brand'
      },
      {
        model: Retailer,
        as: 'retailer'
      },
    ],
  });

  return items.map((item) => {
    return {
      id: item.id,
      date: item.date,
      retailerid: item.retailerid,
      ean: item.ean,
      categoryid: item.categoryid,
      manufacturerid: item.manufacturerid,
      brandid: item.brandid,
      producttitle: item.producttitle,
      image: item.image,
      onpromotion: item.onpromotion,
      promotiondesc: item.promotiondesc,
      baseprice: item.baseprice,
      shelfprice: item.shelfprice,
      promotedprice: item.promotedprice,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      category: item.category,
      manufacturer: item.manufacturer,
      brand: item.brand,
      retailer: item.retailer,
    };
  });
}


async function searchByBrandIds(brandIds: string[]): Promise<ItemSummary[]> {

  const items = await Item.findAll({
    where: {
      brandid: { [Op.in]: brandIds }
    },
  });

  return items.map((item) => {
    return {
      id: item.id,
      date: item.date,
      retailerid: item.retailerid,
      ean: item.ean,
      categoryid: item.categoryid,
      manufacturerid: item.manufacturerid,
      brandid: item.brandid,
      producttitle: item.producttitle,
      image: item.image,
      onpromotion: item.onpromotion,
      promotiondesc: item.promotiondesc,
      baseprice: item.baseprice,
      shelfprice: item.shelfprice,
      promotedprice: item.promotedprice,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  });
}

async function create(
  date: Date,
  retailerid: string,
  ean: string,
  categoryid: string,
  manufacturerid: string,
  brandid: string,
  producttitle: string,
  image: string,
  onpromotion: boolean,
  promotiondesc: string,
  baseprice: number,
  shelfprice: number,
  promotedprice: number
): Promise<ItemSummary> {
  const item = await Item.create({
    date,
    retailerid,
    ean,
    categoryid,
    manufacturerid,
    brandid,
    producttitle,
    image,
    onpromotion,
    promotiondesc,
    baseprice,
    shelfprice,
    promotedprice,
  });
  return item.get();
}

async function modify(
  id: string,
  date: Date,
  retailerid: string,
  ean: string,
  categoryid: string,
  manufacturerid: string,
  brandid: string,
  producttitle: string,
  image: string,
  onpromotion: boolean,
  promotiondesc: string,
  baseprice: number,
  shelfprice: number,
  promotedprice: number
): Promise<ItemSummary> {
  const item = await Item.findOne({ where: { id } });
  if (!item) { throw new ApiError(`Brand not found!`); }

  item.date = date;
  item.retailerid = retailerid;
  item.ean = ean;
  item.categoryid = categoryid;
  item.manufacturerid = manufacturerid;
  item.brandid = brandid;
  item.producttitle = producttitle;
  item.image = image;
  item.onpromotion = onpromotion;
  item.promotiondesc = promotiondesc;
  item.baseprice = baseprice;
  item.shelfprice = shelfprice;
  item.promotedprice = promotedprice;
  await item.save();
  return item.get();
}

export {
  search,
  searchByBrandIds,
  create,
  modify,
};