import { Op, WhereOptions, WhereAttributeHash, } from "sequelize";

import { ApiError } from "../models/error";
import { BrandSummary } from "../models/model";

import { Brand, BrandAttributes } from "../repo/Brand";

async function search(filter: { id?: string, name?: string }): Promise<BrandSummary[]> {
  const whereOptions: WhereOptions<BrandAttributes> = {};

  if (!!filter?.id) { whereOptions.id = filter.id; }
  if (!!filter?.name) { whereOptions.name = filter.name; }

  const brands = await Brand.findAll({
    where: { [Op.and]: [whereOptions], } as WhereAttributeHash,
  });

  return brands.map((brand) => {
    return {
      id: brand.id,
      name: brand.name,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt,
    };
  });
}

async function create(name: string): Promise<BrandSummary> {
  const brand = await Brand.create({ name });
  return brand.get();
}

async function modify(id: string, name: string): Promise<BrandSummary> {
  const brand = await Brand.findOne({ where: { id } });
  if (!brand) { throw new ApiError(`Brand not found!`); }

  brand.name = name;
  await brand.save();
  return brand.get();
}

export {
  search,
  create,
  modify,
};