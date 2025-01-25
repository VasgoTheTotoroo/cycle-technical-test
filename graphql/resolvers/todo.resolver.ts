import { checkUserExist } from "helpers/user.helper.js";
import { Clap } from "models/clap.js";
import { Todo } from "models/todo.js";
import { User } from "models/user.js";
import { getTodo } from "services/todo.service.js";

export const todoResolver = {
  Query: {
    getAllTodos: () => {
      return Todo.findAll();
    },
    getTodo: (_: undefined, args: { id: number }) => {
      return getTodo(args.id);
    },
  },
  Mutation: {
    createTodo: async (
      _: undefined,
      args: { name: string; userId: number },
    ) => {
      const userId = args.userId;
      await checkUserExist(userId);
      return Todo.create({ name: args.name, createdByUserId: userId });
    },
  },
  Todo: {
    claps: (parent: Todo) => {
      return Clap.findAll({ where: { todoId: parent.id } });
    },
    user: (parent: Todo) => {
      return User.findByPk(parent.createdByUserId);
    },
  },
};
