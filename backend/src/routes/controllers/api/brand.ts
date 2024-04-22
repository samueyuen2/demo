import express, { NextFunction, Request, Response } from 'express';
import { BrandSummary, createApiResponse, } from '../../../models/model';
import { ApiError } from '../../../models/error';
import * as BrandService from '../../../services/brand';

const router = express.Router();

router.post("/search", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = parseStringInput(req.body.id);
        const name: string = parseStringInput(req.body.name);
        const location: string = parseStringInput(req.body.location);

        const brands = await BrandService.search({
            id,
            name,
            location
        });
        return res.status(200).send(createApiResponse<BrandSummary[]>("", brands));
    } catch (err) {
        return next(err);
    }
});

function parseStringInput(input: any): string {
    return !!input ? String(input) : "";
}

export default router;
