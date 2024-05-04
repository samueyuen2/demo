import { readFile } from 'fs/promises';
import { sequelize } from '../utilities/database'
import moment from 'moment-timezone'

import { Brand } from '../repo/Brand';
import { Category } from '../repo/Category';
import { Item } from '../repo/Item';
import { Manufacturer } from '../repo/Manufacturer';
import { ManufacturerBrand } from '../repo/ManufacturerBrand';
import { Retailer } from '../repo/Retailer';

const main = async () => {
  try {
    // Read the input file, store the records into an array
    console.log("\nReading sample data file - Begin")
    // Get the full text of the file
    const _sample_data_fullText = await readFile("./src/console/sample_data.csv", { encoding: 'utf8' })
    // Find the line breaker
    const lineBreaker = _sample_data_fullText.indexOf("\n\r") >= 0 ? "\n\r" : _sample_data_fullText.indexOf("\r\n") >= 0 ? "\r\n" : "\n"
    // Split the array into strings
    let _sample_data_array = _sample_data_fullText?.split(lineBreaker)
    // Remove the first row (columns name)
    _sample_data_array = _sample_data_array?.slice(1)
    // Start to read every string, and push a new Obj into the Obj Array
    const _sample_data_objArray = []
    for (const str of _sample_data_array) {
      const record = str?.replaceAll("\r", "")?.split(',')
      _sample_data_objArray?.push({
        date: moment(`${record[0]}T00:00:00Z`).tz("Europe/London"),
        retailer: record[1],
        ean: record[2],
        category: record[3],
        manufacturer: record[4],
        brand: record[5],
        productTitle: record[6],
        image: record[7],
        onPromotion: record[8] === "TRUE" ? true : false,
        promotionDesc: !!record[9] ? record[9] : null,
        basePrice: parseFloat(record[10]),
        shelfPrice: parseFloat(record[11]),
        promotedPrice: parseFloat(record[12]),
      })
    }
    // console.log("_sample_data_objArray:", _sample_data_objArray)
    console.log("Reading sample data file - Finish\n")

    // console.log("\nFind all price - Begin")
    // // Use Set to remove the duplicate values
    // const basePrices: Set<number> = new Set()
    // for (const recordObj of _sample_data_objArray) {
    //   basePrices.add(recordObj?.basePrice)
    // }
    // const basePrices_array = Array.from(basePrices.values())?.sort((a, b) => a > b ? 1 : -1)
    // console.log("basePrices_array:", basePrices_array)

    // const shelfPrices: Set<number> = new Set()
    // for (const recordObj of _sample_data_objArray) {
    //   shelfPrices.add(recordObj?.shelfPrice)
    // }
    // const shelfPrices_array = Array.from(shelfPrices.values())?.sort((a, b) => a > b ? 1 : -1)
    // console.log("shelfPrices_array:", shelfPrices_array)

    // const promotedPrices: Set<number> = new Set()
    // for (const recordObj of _sample_data_objArray) {
    //   promotedPrices.add(recordObj?.promotedPrice)
    // }
    // const promotedPrices_array = Array.from(promotedPrices.values())?.sort((a, b) => a > b ? 1 : -1)
    // console.log("promotedPrices_array:", promotedPrices_array)
    // console.log("Find all price - Finish\n")


    ////////////////////////////////////////////////////////////////////////////////////


    console.log("\nFind all retailers - Begin")
    // Use Set to remove the duplicate values
    const retailers: Set<string> = new Set()
    for (const recordObj of _sample_data_objArray) {
      retailers.add(recordObj?.retailer)
    }
    const retailers_array = Array.from(retailers.values())?.sort((a, b) => a > b ? 1 : -1)
    const retailers_objArray = []
    for (const retailer of retailers_array) {
      const newRetailer = await Retailer.create({ name: retailer })
      retailers_objArray?.push(newRetailer?.get())
    }
    console.log(retailers_objArray)
    console.log("Find all retailers - Finish\n")

    console.log("\nFind all Manufacturers - Begin")
    // Use Set to remove the duplicate values
    const manufacturers: Set<string> = new Set()
    for (const recordObj of _sample_data_objArray) {
      manufacturers.add(recordObj?.manufacturer)
    }
    const manufacturers_array = Array.from(manufacturers.values())?.sort((a, b) => a > b ? 1 : -1)
    const manufacturers_objArray = []
    for (const manufacturer of manufacturers_array) {
      const newManufacturer = await Manufacturer.create({ name: manufacturer })
      manufacturers_objArray?.push(newManufacturer?.get())
    }
    console.log("Find all Manufacturers - Finish\n")

    console.log("\nFind all Brands - Begin")
    // Use Set to remove the duplicate values
    const brands: Set<string> = new Set()
    for (const recordObj of _sample_data_objArray) {
      brands.add(recordObj?.brand)
    }
    const brands_array = Array.from(brands.values())?.sort((a, b) => a > b ? 1 : -1)
    const brands_objArray = []
    for (const brand of brands_array) {
      const newBrand = await Brand.create({ name: brand })
      brands_objArray?.push(newBrand?.get())
    }
    console.log("Find all Brands - Finish\n")

    console.log("\nFind all brands of a manufacturer - Begin")
    const mans_brands = new Map();
    for (const recordObj of _sample_data_objArray) {
      if (mans_brands.get(recordObj.manufacturer) !== undefined) {
        mans_brands.set(
          recordObj.manufacturer,
          mans_brands.get(recordObj.manufacturer).add(recordObj.brand)
        )
      } else {
        const tempSet = new Set();
        tempSet.add(recordObj.brand);
        mans_brands.set(
          recordObj.manufacturer,
          tempSet
        )
      }
    }
    const mans_brands_array = Array.from(mans_brands)
    const mans_brands_obj: any = {}
    for (const a of mans_brands_array) {
      mans_brands_obj[a[0]] = Array.from(a[1]);
    }
    const bulkImport_man_brand = []
    for (const man of Object.keys(mans_brands_obj)) {
      const manId = manufacturers_objArray?.find((m) => m.name === man)?.id
      if (manId) {
        for (const bnd of mans_brands_obj[man]) {
          const brandId = brands_objArray?.find((b) => b.name === bnd)?.id
          if (!manId) { console.error("Empty manId, man: ", man) }
          if (!brandId) { console.error("Empty brandId, bnd: ", bnd) }
          bulkImport_man_brand.push({ manufacturerid: manId, brandid: brandId })
        }
      }
    }
    await ManufacturerBrand.bulkCreate(bulkImport_man_brand)
    console.log("Find all brands of a manufacturer - Finish\n")

    console.log("\nFind all Categories - Begin")
    // Use Set to remove the duplicate values
    const categories: Set<string> = new Set()
    for (const recordObj of _sample_data_objArray) {
      categories.add(recordObj?.category)
    }
    const categories_array = Array.from(categories.values())?.sort((a, b) => a > b ? 1 : -1)
    const categories_objArray = []
    for (const category of categories_array) {
      const newCategory = await Category.create({ name: category })
      categories_objArray?.push(newCategory?.get())
    }
    console.log("Find all Categories - Finish\n")

    console.log("\nCreate Items Record - Begin")
    const bulkImport_array = []
    for (const item of _sample_data_objArray) {
      const retailerId = retailers_objArray?.find((r) => r.name === item.retailer)?.id
      if (!retailerId) { throw new Error("Missing retailerId") }
      const categoryId = categories_objArray?.find((c) => c.name === item.category)?.id
      if (!categoryId) { throw new Error("Missing categoryId") }
      const manufacturerId = manufacturers_objArray?.find((m) => m.name === item.manufacturer)?.id
      if (!manufacturerId) { throw new Error("Missing manufacturerId") }
      const brandId = brands_objArray?.find((b) => b.name === item.brand)?.id
      // if (!brandId) { throw new Error("Missing brandId") }

      bulkImport_array.push({
        date: item?.date?.toDate(),
        retailerid: retailerId,
        ean: item?.ean,
        categoryid: categoryId,
        manufacturerid: manufacturerId,
        brandid: brandId ? brandId : "Just Double Quote...",
        producttitle: item?.productTitle,
        image: item?.image,
        onpromotion: item?.onPromotion,
        promotiondesc: item?.promotionDesc,
        baseprice: isNaN(item?.basePrice) ? 0 : item?.basePrice,
        shelfprice: isNaN(item?.shelfPrice) ? 0 : item?.shelfPrice,
        promotedprice: isNaN(item?.promotedPrice) ? 0 : item?.promotedPrice,
      })
    }
    const bulkImport_response = await Item.bulkCreate(bulkImport_array)
    console.log(bulkImport_response)
    console.log("Create Items Record - Finish\n")

  }
  catch (error) {
    console.log(error?.message)
  }
}

main()