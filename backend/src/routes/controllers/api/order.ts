import express, { NextFunction, Request, Response } from 'express';
import moment from 'moment-timezone';
import { OrderSummary, createApiResponse, } from '../../../models/model';
import { ApiError } from '../../../models/error';
import * as OrderService from '../../../services/order';

const router = express.Router();

router.post("/search", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = parseStringInput(req.body.id);
        const brandid: string = parseStringInput(req.body.brandid);
        const retailerid: string = parseStringInput(req.body.retailerid);
        // const date = moment(req.body.date);
        const price: number = parseNumbers(req.body.price);
        const packages: number = parseNumbers(req.body.packages);

        // if (!date?.isValid()) { throw new ApiError("Invalid Date") }

        const orders = await OrderService.search({
            id,
            brandid,
            retailerid,
            // date: date.toDate(),
            price,
            packages,
        });
        return res.status(200).send(createApiResponse<OrderSummary[]>("", orders));
    } catch (err) {
        return next(err);
    }
});

function parseNumbers(numericInput: any): number {
    if (!numericInput && !(numericInput === 0)) { return null; }
    let numericOutput: number = null;
    try { numericOutput = Number.parseInt(numericInput, 10); }
    catch (err) { throw new ApiError("Invalid Numbers"); }
    return numericOutput;
}

function parseStringInput(input: any): string {
    return !!input ? String(input) : "";
}

export default router;
