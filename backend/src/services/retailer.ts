import { Op, WhereOptions, WhereAttributeHash, } from "sequelize";

import { ApiError } from "../models/error";
import { RetailerSummary } from "../models/model";

import { Retailer, RetailerAttributes } from "../repo/Retailer";

async function search(filter: { id?: string, name?: string }): Promise<RetailerSummary[]> {
  const whereOptions: WhereOptions<RetailerAttributes> = {};

  if (!!filter?.id) { whereOptions.id = filter.id; }
  if (!!filter?.name) { whereOptions.name = filter.name; }

  const retailers = await Retailer.findAll({
    where: { [Op.and]: [whereOptions], } as WhereAttributeHash,
  });

  return retailers.map((retailer) => {
    return {
      id: retailer.id,
      name: retailer.name,
      createdAt: retailer.createdAt,
      updatedAt: retailer.updatedAt,
    };
  });
}

async function create(name: string): Promise<RetailerSummary> {
  const retailer = await Retailer.create({ name });
  return retailer.get();
}

async function modify(id: string, name: string): Promise<RetailerSummary> {
  const retailer = await Retailer.findOne({ where: { id } });
  if (!retailer) { throw new ApiError(`Retailer not found!`); }

  retailer.name = name;
  await retailer.save();
  return retailer.get();
}

export {
  search,
  create,
  modify,
};