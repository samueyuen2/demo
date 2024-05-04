import express, { NextFunction, Request, Response } from 'express';
import { ManufacturerSummary, createApiResponse, } from '../../../models/model';
import { ApiError } from '../../../models/error';
import * as ManufacturerService from '../../../services/manufacturer';

const router = express.Router();

router.post("/search", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = parseStringInput(req.body.id);
        const name: string = parseStringInput(req.body.name);

        const brands = await ManufacturerService.search({
            id,
            name,
        });
        return res.status(200).send(createApiResponse<ManufacturerSummary[]>("", brands));
    } catch (err) {
        return next(err);
    }
});

function parseStringInput(input: any): string {
    return !!input ? String(input) : "";
}

export default router;
