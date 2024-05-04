import { sequelize } from '../utilities/database';
import { DataTypes, Model, Optional } from 'sequelize';

interface RetailerAttributes {
  id: string;
  name: string;
};

interface RetailerCreationAttributes extends Optional<RetailerAttributes, "id"> { }

class Retailer extends Model<RetailerAttributes, RetailerCreationAttributes> implements RetailerAttributes {
  id: string;
  name: string;

  // Timestamps automatically created by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Retailer.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "retailers",
  }
);

export { Retailer, RetailerAttributes };