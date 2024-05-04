import { sequelize } from '../utilities/database';
import { DataTypes, Model, Optional } from 'sequelize';

interface ManufacturerAttributes {
  id: string;
  name: string;
};

interface ManufacturerCreationAttributes extends Optional<ManufacturerAttributes, "id"> { }

class Manufacturer extends Model<ManufacturerAttributes, ManufacturerCreationAttributes> implements ManufacturerAttributes {
  id: string;
  name: string;

  // Timestamps automatically created by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Manufacturer.init(
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
    tableName: "manufacturers",
  }
);

export { Manufacturer, ManufacturerAttributes };