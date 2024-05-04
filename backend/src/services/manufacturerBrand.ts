import { Op, WhereOptions, WhereAttributeHash, } from "sequelize";

import { ApiError } from "../models/error";
import {
  ManufacturerSummary,
  BrandSummary,
} from "../models/model";

import { Manufacturer, ManufacturerAttributes } from "../repo/Manufacturer";
import { Brand, BrandAttributes } from "../repo/Brand";
import { ManufacturerBrand, ManufacturerBrandAttributes } from "../repo/ManufacturerBrand";

async function searchBrands(manufacturers: string[]): Promise<BrandSummary[]> {
  const mbs = await ManufacturerBrand.findAll({
    where: {
      manufacturerid: { [Op.in]: manufacturers, }
    },
    include: [
      {
        model: Brand,
        as: 'brand'
      }
    ],
  });

  return mbs.map((mb) => {
    return mb.brand;
  });
}

export {
  searchBrands,
};