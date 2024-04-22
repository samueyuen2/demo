import { sequelize } from '../utilities/database';
import { DataTypes, Model, Optional } from 'sequelize';
import { Brand } from './Brand';
import { Retailer } from './Retailer';

interface OrderAttributes {
  id: string;
  brandid: string;
  retailerid: string;
  date: Date;
  price: number;
  packages: number;
};

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> { }

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  id: string;
  brandid: string;
  retailerid: string;
  date: Date;
  price: number;
  packages: number;

  public readonly brand?: Brand;
  public readonly retailer?: Retailer;

  // Timestamps automatically created by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    brandid: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    retailerid: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    packages: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "orders",
  }
);

export { Order, OrderAttributes };