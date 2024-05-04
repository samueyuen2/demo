import { Op, WhereOptions, WhereAttributeHash, } from "sequelize";

import { ApiError } from "../models/error";
import { CategorySummary } from "../models/model";

import { Category, CategoryAttributes } from "../repo/Category";

async function search(filter: { id?: string, name?: string }): Promise<CategorySummary[]> {
  const whereOptions: WhereOptions<CategoryAttributes> = {};

  if (!!filter?.id) { whereOptions.id = filter.id; }
  if (!!filter?.name) { whereOptions.name = filter.name; }

  const categories = await Category.findAll({
    where: { [Op.and]: [whereOptions], } as WhereAttributeHash,
  });

  return categories.map((category) => {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  });
}

async function create(name: string): Promise<CategorySummary> {
  const category = await Category.create({ name });
  return category.get();
}

async function modify(id: string, name: string): Promise<CategorySummary> {
  const category = await Category.findOne({ where: { id } });
  if (!category) { throw new ApiError(`Category not found!`); }

  category.name = name;
  await category.save();
  return category.get();
}

export {
  search,
  create,
  modify,
};