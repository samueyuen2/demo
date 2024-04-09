import express, { NextFunction, Request, Response } from 'express';
import { ToDoItemSummary, createApiResponse, } from '../../../models/model';
import { ApiError } from '../../../models/error';
import * as ToDoItemService from '../../../services/toDoItem';

const router = express.Router();

router.post("/search", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = parseStringInput(req.body.id);
    const details: string = parseStringInput(req.body.details);

    const toDoItems = await ToDoItemService.search({
      id,
      details,
    });
    return res.status(200).send(createApiResponse<ToDoItemSummary[]>("", toDoItems));
  } catch (err) {
    return next(err);
  }
});

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const details: string = parseStringInput(req.body.details);
    if (!details) { return next(new ApiError("Missing details of a To-Do Item")); }

    const toDoItem = await ToDoItemService.create(details);

    return res.status(200).send(createApiResponse<ToDoItemSummary>("To-Do Item Inserted", toDoItem));
  } catch (err) {
    return next(err);
  }
});

router.post("/modify", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = parseStringInput(req.body.id);
    const details: string = parseStringInput(req.body.details);
    if (!id) { return next(new ApiError("Missing id of a To-Do Item")); }
    if (!details) { return next(new ApiError("Missing details of a To-Do Item")); }

    const toDoItem = await ToDoItemService.modify(id, details);
    return res.status(200).send(createApiResponse<ToDoItemSummary>("To-Do Item Modified", toDoItem));
  } catch (err) {
    return next(err);
  }
});

function parseStringInput(input: any): string {
  return !!input ? String(input) : "";
}

export default router;
