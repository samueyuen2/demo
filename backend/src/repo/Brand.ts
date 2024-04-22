import { sequelize } from '../utilities/database';
import { DataTypes, Model, Optional } from 'sequelize';

interface BrandAttributes {
  id: string;
  name: string;
  location: string;
};

interface BrandCreationAttributes extends Optional<BrandAttributes, "id"> { }

class Brand extends Model<BrandAttributes, BrandCreationAttributes> implements BrandAttributes {
  id: string;
  name: string;
  location: string;

  // Timestamps automatically created by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Brand.init(
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
    location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "brands",
  }
);

export { Brand, BrandAttributes };