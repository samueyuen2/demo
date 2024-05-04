import { Brand } from "../repo/Brand"
import { Retailer } from "../repo/Retailer"

interface ToDoItemSummary {
  id: string,
  details: string,
  createdAt?: Date,
  updatedAt?: Date,
};

interface ItemSummary {
  id: string;
  date: Date;
  retailerid: string;
  ean: string;
  categoryid: string;
  manufacturerid: string;
  brandid: string;
  producttitle: string;
  image: string;
  onpromotion: boolean;
  promotiondesc: string;
  baseprice: number;
  shelfprice: number;
  promotedprice: number;
  createdAt?: Date,
  updatedAt?: Date,
};

interface BrandSummary {
  id: string,
  name: string,
  createdAt?: Date,
  updatedAt?: Date,
};

interface RetailerSummary {
  id: string,
  name: string,
  createdAt?: Date,
  updatedAt?: Date,
};

interface CategorySummary {
  id: string,
  name: string,
  createdAt?: Date,
  updatedAt?: Date,
};

interface ManufacturerSummary {
  id: string,
  name: string,
  createdAt?: Date,
  updatedAt?: Date,
};

interface OrderSummary {
  id: string,
  brandid: string,
  retailerid: string,
  date: Date,
  price: number,
  packages: number,
  createdAt?: Date,
  updatedAt?: Date,
  brand?: Brand,
  retailer?: Retailer,
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
}

function createApiResponse<T>(message: string, data: T): ApiResponse<T> {
  return {
    success: true,
    message,
    data
  };
}

export {
  ApiResponse,
  createApiResponse,
  ToDoItemSummary,
  ItemSummary,
  BrandSummary,
  RetailerSummary,
  CategorySummary,
  ManufacturerSummary,
  OrderSummary,
}
