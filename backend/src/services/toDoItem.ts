import { Op, WhereOptions, WhereValue, literal, WhereAttributeHash, } from "sequelize";

import { ApiError } from "../models/error";
import { ToDoItemSummary } from "../models/model";

import { ToDoItem, ToDoItemAttributes } from "../repo/ToDoItem";

async function search(filter: { id: string, details: string }): Promise<ToDoItemSummary[]> {
  const whereOptions: WhereOptions<ToDoItemAttributes> = {};

  if (!!filter?.id) { whereOptions.id = filter.id; }
  if (!!filter?.details) { whereOptions.details = filter.details; }

  const toDoItems = await ToDoItem.findAll({
    where: { [Op.and]: [whereOptions], } as WhereAttributeHash,
  });

  return toDoItems.map((toDoItem) => {
    return {
      id: toDoItem.id,
      details: toDoItem.details,
      createdAt: toDoItem.createdAt,
      updatedAt: toDoItem.updatedAt,
    };
  });
}

async function create(details: string): Promise<ToDoItemSummary> {
  const participant = await ToDoItem.create({ details });
  return participant.get();
}

async function modify(id: string, details: string): Promise<ToDoItemSummary> {
  const toDoItem = await ToDoItem.findOne({ where: { id } });
  if (!toDoItem) { throw new ApiError(`To-Do item not found!`); }

  toDoItem.details = details;
  await toDoItem.save();
  return toDoItem.get();
}

export {
  search,
  create,
  modify,
};