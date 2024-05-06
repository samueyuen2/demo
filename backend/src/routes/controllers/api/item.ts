import express, { NextFunction, Request, Response } from 'express';
import moment from 'moment-timezone';
import { ItemSummary, createApiResponse, } from '../../../models/model';
import { ApiError } from '../../../models/error';
import * as ItemService from '../../../services/item';

const router = express.Router();

router.post("/search", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = parseStringInput(req.body.id);
        const start: Date = moment(req.body.start)?.toDate();
        const end: Date = moment(req.body.end)?.toDate();
        const retailerid: string = parseStringInput(req.body.retailerid);
        const ean: string = parseStringInput(req.body.ean);
        const categoryid: string = parseStringInput(req.body.categoryid);
        const manufacturerid: string = parseStringInput(req.body.manufacturerid);
        const brandid: string = parseStringInput(req.body.brandid);
        const producttitle: string = parseStringInput(req.body.producttitle);
        const image: string = parseStringInput(req.body.image);
        // const onpromotion = req.body.name;
        const promotiondesc: string = parseStringInput(req.body.promotiondesc);
        const baseprice: number = parseInt(req.body.baseprice, 10);
        const shelfprice: number = parseInt(req.body.shelfprice, 10);
        const promotedprice: number = parseInt(req.body.promotedprice, 10);

        let categories: string[] = []
        if (!!req.body.categories) { categories = JSON.parse(req.body.categories) }
        let manufacturers: string[] = []
        if (!!req.body.manufacturers) { manufacturers = JSON.parse(req.body.manufacturers) }
        let brands: string[] = []
        if (!!req.body.brands) { brands = JSON.parse(req.body.brands) }
        let retailers: string[] = []
        if (!!req.body.retailers) { retailers = JSON.parse(req.body.retailers) }
        const keyword: string = parseStringInput(req.body.keyword);

        const items = await ItemService.search({
            id,
            start,
            end,
            retailerid,
            ean,
            categoryid,
            manufacturerid,
            brandid,
            producttitle,
            image,
            // onpromotion,
            promotiondesc,
            baseprice,
            shelfprice,
            promotedprice,
            categories: categories?.length > 0 ? categories : null,
            manufacturers: manufacturers?.length > 0 ? manufacturers : null,
            brands: brands?.length > 0 ? brands : null,
            retailers: retailers?.length > 0 ? retailers : null,
            keyword,
        });
        return res.status(200).send(createApiResponse<ItemSummary[]>("", items));
    } catch (err) {
        return next(err);
    }
});

router.post("/searchByBrandIds", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const brandIds = JSON.parse(req.body.brands)

        let items = await ItemService.searchByBrandIds(brandIds);

        // Remove any object that has the same criteria but not the first found element
        items = items.filter((item, i, array) => i === array.findIndex((elm) => elm.ean === item.ean))

        return res.status(200).send(createApiResponse<ItemSummary[]>("", items));
    } catch (err) {
        return next(err);
    }
});

function parseStringInput(input: any): string {
    return !!input ? String(input) : "";
}

export default router;
