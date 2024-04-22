import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../../models/model";
import { ApiError } from "../../models/error";

function createErrorBody(message: string): ApiResponse<void> {
  return {
    success: false,
    message,
    data: undefined
  };
}

async function handleError(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    console.log(err)
    return res.status(200).send(createErrorBody(String(err.message)));
  }
  else {
    return res.status(200).send(createErrorBody(`Internal Server Error, ${err}, ${err?.message}`));
  }
};

async function logError(err: any, req: Request, res: Response, next: NextFunction) {
  console.log(err)
};

export { createErrorBody, handleError, logError };
export default handleError;
