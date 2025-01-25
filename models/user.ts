import { sequelize } from "models/index.js";
import { DataTypes, Model } from "sequelize";
import { Todo } from "./todo.js";
import { Clap } from "./clap.js";

export class User extends Model {
  declare public id: number;
  declare public todos?: Todo[];
  declare public claps?: Clap[];
  declare public created_at: Date;
  declare public updated_at: Date;
  declare public deleted_at: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
    underscored: true,
    tableName: "user",
    modelName: "user",
  },
);
