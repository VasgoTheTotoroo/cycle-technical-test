import { sequelize } from "models/index.js";
import { DataTypes, Model } from "sequelize";
import { User } from "./user.js";
import { Todo } from "./todo.js";

export class Clap extends Model {
  declare public id: number;
  declare public userId: number;
  declare public todoId: number;
  declare public clapsNb: number;
  declare public created_at: Date;
  declare public updated_at: Date;
  declare public deleted_at: Date | null;
}

Clap.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    todoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clapsNb: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
    underscored: true,
    tableName: "clap",
    modelName: "clap",
  },
);

Todo.hasMany(Clap, {
  foreignKey: { name: "todoId", allowNull: false },
});
Clap.belongsTo(Todo);

User.hasMany(Clap, {
  foreignKey: { name: "userId", allowNull: false },
});
Clap.belongsTo(User);
