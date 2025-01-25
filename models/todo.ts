import { sequelize } from "models/index.js";
import { DataTypes, Model } from "sequelize";
import { User } from "./user.js";
import { Clap } from "./clap.js";

export class Todo extends Model {
  declare public id: number;
  declare public name: string;
  declare public createdByUserId: number;
  declare public claps?: Clap[];
  declare public created_at: Date;
  declare public updated_at: Date;
  declare public deleted_at: Date | null;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdByUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
    underscored: true,
    tableName: "todo",
    modelName: "todo",
  },
);

User.hasMany(Todo, {
  foreignKey: { name: "createdByUserId", allowNull: false },
});
Todo.belongsTo(User, {
  foreignKey: { name: "createdByUserId", allowNull: false },
});
