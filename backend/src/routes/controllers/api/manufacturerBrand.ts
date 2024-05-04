import express, { NextFunction, Request, Response } from 'express';
import { BrandSummary, createApiResponse, } from '../../../models/model';
import { ApiError } from '../../../models/error';
import * as ManufacturerBrandService from '../../../services/manufacturerBrand';

const router = express.Router();

router.post("/searchBrands", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const manufacturers: string[] = JSON.parse(req.body.manufacturers);

        const brands = await ManufacturerBrandService.searchBrands(manufacturers);

        return res.status(200).send(createApiResponse<BrandSummary[]>("", brands));
    } catch (err) {
        console.log(err)
        return next(err);
    }
});

export default router;
