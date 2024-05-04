import { sequelize } from '../utilities/database';
import { DataTypes, Model, Optional } from 'sequelize';

interface CategoryAttributes {
  id: string;
  name: string;
};

interface CategoryCreationAttributes extends Optional<CategoryAttributes, "id"> { }

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  id: string;
  name: string;

  // Timestamps automatically created by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
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
    tableName: "categories",
  }
);

export { Category, CategoryAttributes };