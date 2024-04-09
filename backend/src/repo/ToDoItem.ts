import { sequelize } from '../utilities/database';
import { DataTypes, Model, Optional } from 'sequelize';

interface ToDoItemAttributes {
  id: string;
  details: string;
};

interface ToDoItemCreationAttributes extends Optional<ToDoItemAttributes, "id"> { }

class ToDoItem extends Model<ToDoItemAttributes, ToDoItemCreationAttributes> implements ToDoItemAttributes {
  id: string;
  details: string;

  // Timestamps automatically created by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ToDoItem.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "ToDoItems",
  }
);

export { ToDoItem, ToDoItemAttributes };