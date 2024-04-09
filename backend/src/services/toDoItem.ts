import { Op, WhereOptions, WhereValue, literal, WhereAttributeHash, } from "sequelize";
import moment from "moment";

import { ApiError } from "../models/error";
import { ToDoItemSummary } from "../models/model";

import { ToDoItem, ToDoItemAttributes } from "../repo/ToDoItem";

async function search(filter: { id: string, details: string }): Promise<ToDoItemSummary[]> {
  //  >>>>>>>> Real Code >>>>>>>>
  // const whereOptions: WhereOptions<ToDoItemAttributes> = {};

  // if (!!filter?.id) { whereOptions.id = filter.id; }
  // if (!!filter?.details) { whereOptions.details = filter.details; }

  // const toDoItems = await ToDoItem.findAll({
  //   where: { [Op.and]: [whereOptions], } as WhereAttributeHash,
  // });

  // return toDoItems.map((toDoItem) => {
  //   return {
  //     id: toDoItem.id,
  //     details: toDoItem.details,
  //     createdAt: toDoItem.createdAt,
  //     updatedAt: toDoItem.updatedAt,
  //   };
  // });
  //  >>>>>>>> Real Code >>>>>>>>

  return [{
    id: "ABCDE",
    details: "Sheep",
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: "XYZ",
    details: "mehhhh",
    createdAt: new Date(),
    updatedAt: new Date(),
  }]
}

async function create(details: string): Promise<ToDoItemSummary> {
  //  >>>>>>>> Real Code >>>>>>>>
  // const participant = await ToDoItem.create({ details });
  // return participant.get();
  //  >>>>>>>> Real Code >>>>>>>>

  return {
    id: "XYZ",
    details: "mehhhh",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

async function modify(id: string, details: string): Promise<ToDoItemSummary> {
  //  >>>>>>>> Real Code >>>>>>>>
  // const toDoItem = await ToDoItem.findOne({ where: { id } });
  // if (!toDoItem) { throw new ApiError(`To-Do item not found!`); }

  // toDoItem.details = details;
  // await toDoItem.save();
  // return toDoItem.get();
  //  >>>>>>>> Real Code >>>>>>>>

  return {
    id: "XYZ",
    details: "mehhhh",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export {
  search,
  create,
  modify,
};