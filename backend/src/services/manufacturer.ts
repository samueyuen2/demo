import { Op, WhereOptions, WhereAttributeHash, } from "sequelize";

import { ApiError } from "../models/error";
import { ManufacturerSummary } from "../models/model";

import { Manufacturer, ManufacturerAttributes } from "../repo/Manufacturer";

async function search(filter: { id?: string, name?: string }): Promise<ManufacturerSummary[]> {
  const whereOptions: WhereOptions<ManufacturerAttributes> = {};

  if (!!filter?.id) { whereOptions.id = filter.id; }
  if (!!filter?.name) { whereOptions.name = filter.name; }

  const manufacturers = await Manufacturer.findAll({
    where: { [Op.and]: [whereOptions], } as WhereAttributeHash,
  });

  return manufacturers.map((manufacturer) => {
    return {
      id: manufacturer.id,
      name: manufacturer.name,
      createdAt: manufacturer.createdAt,
      updatedAt: manufacturer.updatedAt,
    };
  });
}

async function create(name: string): Promise<ManufacturerSummary> {
  const manufacturer = await Manufacturer.create({ name });
  return manufacturer.get();
}

async function modify(id: string, name: string): Promise<ManufacturerSummary> {
  const manufacturer = await Manufacturer.findOne({ where: { id } });
  if (!manufacturer) { throw new ApiError(`Manufacturer not found!`); }

  manufacturer.name = name;
  await manufacturer.save();
  return manufacturer.get();
}

export {
  search,
  create,
  modify,
};