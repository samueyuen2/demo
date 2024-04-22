import express, { NextFunction, Request, Response } from 'express';
import { RetailerSummary, createApiResponse, } from '../../../models/model';
import { ApiError } from '../../../models/error';
import * as RetailerService from '../../../services/retailer';

const router = express.Router();

router.post("/search", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = parseStringInput(req.body.id);
        const name: string = parseStringInput(req.body.name);
        const phone: string = parseStringInput(req.body.phone);

        const brands = await RetailerService.search({
            id,
            name,
            phone
        });
        return res.status(200).send(createApiResponse<RetailerSummary[]>("", brands));
    } catch (err) {
        return next(err);
    }
});

function parseStringInput(input: any): string {
    return !!input ? String(input) : "";
}

export default router;
