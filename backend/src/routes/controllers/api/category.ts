import express, { NextFunction, Request, Response } from 'express';
import { CategorySummary, createApiResponse, } from '../../../models/model';
import { ApiError } from '../../../models/error';
import * as CategoryService from '../../../services/category';

const router = express.Router();

router.post("/search", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = parseStringInput(req.body.id);
        const name: string = parseStringInput(req.body.name);

        const brands = await CategoryService.search({
            id,
            name,
        });
        return res.status(200).send(createApiResponse<CategorySummary[]>("", brands));
    } catch (err) {
        return next(err);
    }
});

function parseStringInput(input: any): string {
    return !!input ? String(input) : "";
}

export default router;
