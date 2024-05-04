import { sequelize } from '../utilities/database';
import { DataTypes, Model, Optional } from 'sequelize';
import { Brand } from './Brand';

interface ManufacturerBrandAttributes {
  id: string;
  manufacturerid: string;
  brandid: string;
};

interface ManufacturerCreationAttributes extends Optional<ManufacturerBrandAttributes, "id"> { }

class ManufacturerBrand extends Model<ManufacturerBrandAttributes, ManufacturerCreationAttributes> implements ManufacturerBrandAttributes {
  id: string;
  manufacturerid: string;
  brandid: string;

  public readonly brand?: Brand;

  // Timestamps automatically created by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ManufacturerBrand.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    manufacturerid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    brandid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "manufacturer_brand",
  }
);

export { ManufacturerBrand, ManufacturerBrandAttributes };