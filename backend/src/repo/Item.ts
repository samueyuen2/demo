import { sequelize } from '../utilities/database';
import { DataTypes, Model, Optional } from 'sequelize';
import { Brand } from './Brand';
import { Retailer } from './Retailer';
import { Category } from './Category';
import { Manufacturer } from './Manufacturer';

interface ItemAttributes {
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
};

interface ItemCreationAttributes extends Optional<ItemAttributes, "id"> { }

class Item extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
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

    public readonly retailer?: Retailer;
    public readonly category?: Category;
    public readonly manufacturer?: Manufacturer;
    public readonly brand?: Brand;

    // Timestamps automatically created by Sequelize
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Item.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        retailerid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        ean: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        categoryid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        manufacturerid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        brandid: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        producttitle: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        onpromotion: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        promotiondesc: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        baseprice: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        shelfprice: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        promotedprice: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "items",
    }
);

export { Item, ItemAttributes };