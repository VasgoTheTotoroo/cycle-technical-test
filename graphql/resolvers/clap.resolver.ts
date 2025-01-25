import { getTodo } from "services/todo.service.js";
import { checkUserExist } from "helpers/user.helper.js";
import { Clap } from "models/clap.js";
import { User } from "models/user.js";

export const clapResolver = {
  Query: {
    getClaps: async (_: undefined, args: { todoId: number }) => {
      const todo = await getTodo(args.todoId);
      return Clap.findAll({ where: { todoId: todo.id } });
    },
    getClapsNb: async (_: undefined, args: { todoId: number }) => {
      const todo = await getTodo(args.todoId, {
        include: { model: Clap, required: false },
      });
      const total = todo.claps
        ?.map((clap) => clap.clapsNb)
        .reduce((acc, current) => acc + current, 0);
      return total ?? 0;
    },
  },
  Mutation: {
    clapTodo: async (
      _: undefined,
      args: { userId: number; todoId: number },
    ) => {
      const userId = args.userId;
      const todoId = args.todoId;
      await checkUserExist(userId);
      const todo = await getTodo(todoId);
      if (todo.createdByUserId === userId) {
        throw new Error(`You can't clap one of your own Todo!`);
      }
      const clap = await Clap.findOne({ where: { todoId, userId } });
      if (!clap) {
        return Clap.create({ userId, todoId });
      }
      await Clap.update(
        { clapsNb: clap.clapsNb + 1 },
        { where: { id: clap.id } },
      );
      return Clap.findByPk(clap.id);
    },
  },
  Clap: {
    todo: (parent: Clap) => {
      return getTodo(parent.todoId);
    },
    user: (parent: Clap) => {
      return User.findByPk(parent.userId);
    },
  },
};
