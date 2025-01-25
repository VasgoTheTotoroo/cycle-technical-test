import { Clap } from "models/clap.js";
import { Todo } from "models/todo.js";
import { User } from "models/user.js";

export const userResolver = {
  User: {
    todos: (parent: User) => {
      return Todo.findAll({ where: { createdByUserId: parent.id } });
    },
    claps: (parent: User) => {
      return Clap.findAll({ where: { userId: parent.id } });
    },
  },
};
